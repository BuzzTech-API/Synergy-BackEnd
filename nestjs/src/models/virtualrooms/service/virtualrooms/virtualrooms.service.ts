import {
    BadRequestException,
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VirtualRooms } from 'src/entities/virtualrooms.entity';
import { CreateVirtualRoomParams, UpdateVirtualroomParams } from 'src/common/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class VirtualroomsService {
    constructor(
        @InjectRepository(VirtualRooms)
        private virtualroomRepository: Repository<VirtualRooms>,
    ) { }

    async createVirtualRoom(vroomDetails: CreateVirtualRoomParams) {
        //função para criar uma sala virtual no banco de dados (cadastro)
        const existingVRoom = await this.virtualroomRepository.findOne({
            where: { virtual_room_link: vroomDetails.virtual_room_link },
        });
        if (existingVRoom) {
            throw new ConflictException(`Essa sala ja existe (Link já cadastrado)`); //caso o link exista ele joga um erro com a mensagem
        }
        try {
            return this.virtualroomRepository.save(
                this.virtualroomRepository.create(vroomDetails),
            );
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

    async getVirtualRooms() {
        try {
            const metadata = this.virtualroomRepository.metadata; // pega as informações da entidade
            const relations = metadata.relations.map(
                (relation) => relation.propertyName,
            ); // pega o nome de todas as relações

            const virtualRooms = await this.virtualroomRepository.find({
                relations: relations,
            });

            if (!virtualRooms) {
                throw new NotFoundException('Salas não encontrada');
            }

            return virtualRooms;
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

    //função deletar logicamente a sala virtual
    async deleteVirtualRoom(virtual_room_id: number) {
        try {
            // Tenta encontrar a sala física no repositório pelo ID fornecido
            const virtualRoom = await this.virtualroomRepository.findOne({ where: { virtual_room_id: virtual_room_id } })

            // Se a sala não for encontrada, lança uma exceção informando que a sala não foi encontrada
            if (!virtualRoom) {
                throw new NotFoundException("Sala não encontrada")
            }

            // Marca a sala como inativa (delete logico)
            virtualRoom.is_active = false

            // Salva a sala atualizada no repositório e retorna o resultado
            return await this.virtualroomRepository.save(virtualRoom)
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

    //função que faz o update da sala virtual
    async updateVirtualRoom(virtualroomDetails: UpdateVirtualroomParams) {
        const {
            virtual_room_id,
            virtual_room_name,
            virtual_room_link,
            virtual_room_permission_level,
        } = virtualroomDetails

        try {
            const virtualRoom = await this.virtualroomRepository.findOne({ where: { virtual_room_id: virtual_room_id } })

            if (!virtualRoom) {
                throw new NotFoundException('O id da sala não existe.')
            }

            // Atualiza os campos da sala com os novos valores fornecidos
            virtualRoom.virtual_room_link = virtual_room_link
            virtualRoom.virtual_room_name = virtual_room_name
            virtualRoom.virtual_room_permission_level = virtual_room_permission_level

            // Salva a sala atualizada no repositório e retorna o resultado
            return await this.virtualroomRepository.save(virtualRoom)
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
