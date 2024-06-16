import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { CreateUserParams, UpdateUserParams } from 'src/common/utils/types';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}
  // metodos aqui
  // Ex:  getUsers(): User[] { return this.users; }

  async getUserById(id: number) {
    try {
      const metadata = this.userRepository.metadata; // pega as informações da entidade
      const relations = metadata.relations.map(
        (relation) => relation.propertyName,
      ); // pega o nome de todas as relações
      relations.push('participate.meetings');
      relations.push('participate.meetings.reservations');

      const user = await this.userRepository.findOne({
        where: { user_id: id },
        relations: relations,
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      } else
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_email: email },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      } else
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async getUsers() {
    try {
      const metadata = this.userRepository.metadata; // pega as informações da entidade
      const relations = metadata.relations.map(
        (relation) => relation.propertyName,
      ); // pega o nome de todas as relações
      relations.push('participate.meetings');
      relations.push('participate.meetings.reservations');

      const users = await this.userRepository.find({
        relations: relations,
      });
      if (!users) {
        throw new NotFoundException('Usuarios não encontrados');
      }

      const usersWithoutPassword = users.map((user) => {
        const { user_password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      return usersWithoutPassword;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      } else
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async createUser(userDetails: CreateUserParams) {
    //função para criar um usuario no banco de dados (cadastro)
    try {
      const existingUser = await this.userRepository.findOne({
        where: { user_email: userDetails.user_email },
      });
      if (existingUser) {
        throw new ConflictException('Email ja cadastrado'); //caso o email exista ele joga um erro com a mensagem
      }

      return this.userRepository.save(this.userRepository.create(userDetails));
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: error.message,
          },
          HttpStatus.CONFLICT,
        );
      } else
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  async deleteUser(user_id: number) {
    try {
      // Tenta encontrar a sala física no repositório pelo ID fornecido
      const user = await this.userRepository.findOne({
        where: { user_id: user_id },
      });

      // Se a sala não for encontrada, lança uma exceção informando que a sala não foi encontrada
      if (!user) {
        throw new NotFoundException('Usuario não encontrada');
      }

      // Marca a sala como inativa (delete logico)
      user.is_active = false;

      // Salva a sala atualizada no repositório e retorna o resultado
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      } else
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async updateUser(userDetails: UpdateUserParams) {
    const { user_id, user_email, user_password, user_name } = userDetails;
    try {
      // Tenta encontrar a usuário no repositório pelo ID fornecido
      const user = await this.userRepository.findOne({
        where: { user_id: user_id },
      });

      // Se o usuário não for encontrada, lança uma exceção informando que o usuário não foi encontrada
      if (!user) {
        throw new NotFoundException('Usuario não encontrada');
      }

      // Realiza a alteraçoão dos dados
      user.user_name = user_name;
      user.user_email = user_email;
      user.user_password = user_password;

      // Salva o usuário atualizada no repositório e retorna o resultado
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      } else
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async create_admin() {
    const existingUser = await this.userRepository.findOne({
      where: { user_email: 'adm@adm.com' },
    });
    if (!existingUser) {
      const newAdmin: CreateUserParams = this.userRepository.create({
        user_name: 'admin',
        user_password: 'admin',
        user_email: 'adm@adm.com',
        user_permission_level: 10,
        user_board: 'Administrador',
      });
      return this.userRepository.save(newAdmin);
    }
  }
}
