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

  getPhysicalrooms() {
    return this.physicalroomsRepository.find();
  }
}
