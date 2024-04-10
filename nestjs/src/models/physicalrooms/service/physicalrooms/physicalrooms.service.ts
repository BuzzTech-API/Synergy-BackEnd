import { Injectable } from '@nestjs/common';
import { PhysicalRooms } from 'src/entities/physicalrooms.enity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhysicalroomParams } from 'src/common/utils/types';


@Injectable()
export class PhysicalroomsService {

    constructor(@InjectRepository(PhysicalRooms) private physicalroomRepository: Repository<PhysicalRooms>){}

    createPhysicalroom(physicalroomDetails: CreatePhysicalroomParams){
        const newPhysicalroom = this.physicalroomRepository.create(physicalroomDetails)
        return this.physicalroomRepository.save(newPhysicalroom)
    }
}
