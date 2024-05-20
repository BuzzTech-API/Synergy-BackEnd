/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhysicalroomParams, UpdatePhysicalroomParams } from 'src/common/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicalRooms } from 'src/entities/physicalrooms.enity';
import { Repository } from 'typeorm';

@Injectable()
export class PhysicalroomsService {
  constructor(
    @InjectRepository(PhysicalRooms)
    private physicalroomsRepository: Repository<PhysicalRooms>,
  ) { }

  createPhysicalroom(physicalroomDetails: CreatePhysicalroomParams) {
    try {
      const newPhysicalroom = this.physicalroomsRepository.create(physicalroomDetails)

      return this.physicalroomsRepository.save(newPhysicalroom)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST)
    }
  }


  async getPhysicalroomById(id: number) {
    try {
      const metadata = this.physicalroomsRepository.metadata // pega as informações da entidade
      const relations = metadata.relations.map(relation => relation.propertyName) // pega o nome de todas as relações

      const physicalroom = await this.physicalroomsRepository.findOne({
        where: { physical_room_id: id },
        relations: relations,
      })

      if (!physicalroom) {
        throw new NotFoundException('Sala não encontrada')
      }

      return physicalroom
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        }, HttpStatus.NOT_FOUND);
      }
      else
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async getPhysicalroomReservationsById(id: number) {
    try {
      const metadata = this.physicalroomsRepository.metadata // pega as informações da entidade
      const relations = metadata.relations.map(relation => relation.propertyName) // pega o nome de todas as relações

      const physicalroom = await this.physicalroomsRepository.findOne({
        where: { physical_room_id: id },
        relations: relations,
      })

      if (!physicalroom) {
        throw new NotFoundException('Sala não encontrada')
      }

      return physicalroom.reservation
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        }, HttpStatus.NOT_FOUND);
      }
      else
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  getPhysicalrooms() {
    try {
      const metadata = this.physicalroomsRepository.metadata // pega as informações da entidade
      const relations = metadata.relations.map(relation => relation.propertyName) // pega o nome de todas as relações


      const physicalRooms = this.physicalroomsRepository.find({
        relations: relations,
      })

      if (!physicalRooms) {
        throw new NotFoundException("Salas não encontradas")
      }

      return physicalRooms
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        }, HttpStatus.NOT_FOUND);
      }
      else
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deletePhysicalRoom(physical_room_id: number) {
    try {
      // Tenta encontrar a sala física no repositório pelo ID fornecido
      const physicalRoom = await this.physicalroomsRepository.findOne({ where: { physical_room_id: physical_room_id } })

      // Se a sala não for encontrada, lança uma exceção informando que a sala não foi encontrada
      if (!physicalRoom) {
        throw new NotFoundException("Sala não encontrada")
      }

      // Marca a sala como inativa (delete logico)
      physicalRoom.is_active = false

      // Salva a sala atualizada no repositório e retorna o resultado
      return await this.physicalroomsRepository.save(physicalRoom)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        }, HttpStatus.NOT_FOUND);
      }
      else
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updatePhysicalRoom(physicalroomDetails: UpdatePhysicalroomParams) {
    const {
      physical_room_id,
      physical_room_address,
      physical_room_name,
      physical_room_permission_level,
      physical_room_vacancies
    } = physicalroomDetails

    try {
      const physicalRoom = await this.physicalroomsRepository.findOne({ where: { physical_room_id: physical_room_id } })

      if (!physicalRoom) {
        throw new NotFoundException('O id da sala não existe.')
      }

      // Atualiza os campos da sala com os novos valores fornecidos
      physicalRoom.physical_room_address = physical_room_address
      physicalRoom.physical_room_name = physical_room_name
      physicalRoom.physical_room_permission_level = physical_room_permission_level
      physicalRoom.physical_room_vacancies = physical_room_vacancies

      // Salva a sala atualizada no repositório e retorna o resultado
      return await this.physicalroomsRepository.save(physicalRoom)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        )
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
