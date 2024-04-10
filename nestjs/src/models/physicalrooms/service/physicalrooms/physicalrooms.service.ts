/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicalRooms } from 'src/entities/physicalrooms.enity';
import { Repository } from 'typeorm';

@Injectable()
export class PhysicalroomsService {
  constructor(
    @InjectRepository(PhysicalRooms)
    private physicalroomsRepository: Repository<PhysicalRooms>,
  ) {}

  
  async getPhysicalroomById(id: number){
    const metadata = this.physicalroomsRepository.metadata // pega as informações da entidade
    const relations = metadata.relations.map(relation => relation.propertyName) // pega o nome de todas as relações
    const physicalroom = await this.physicalroomsRepository.findOne({ 
        where: { physical_room_id: id },
        relations: relations,
    })
    if(!physicalroom){
        throw new Error('Sala não existe')
    } 
    return physicalroom
  }


  async getPhysicalroomReservationsById(id: number){
    const metadata = this.physicalroomsRepository.metadata // pega as informações da entidade
    const relations = metadata.relations.map(relation => relation.propertyName) // pega o nome de todas as relações
    const physicalroom = await this.physicalroomsRepository.findOne({ 
        where: { physical_room_id: id },
        relations: relations,
    })

    if(!physicalroom){
        throw new Error('Sala não existe')
    } 
    return physicalroom.reservation
  }
  


  
  getPhysicalrooms() {
    return this.physicalroomsRepository.find();
  }
}
