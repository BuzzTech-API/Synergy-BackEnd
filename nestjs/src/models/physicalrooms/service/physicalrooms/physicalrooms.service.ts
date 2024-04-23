/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhysicalroomParams } from 'src/common/utils/types';
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
      const physicalRooms = this.physicalroomsRepository.find()
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
}
