import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationsParams } from 'src/common/utils/types';
import { Reservations } from 'src/entities/reservations.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservations)
    private reservationsRepository: Repository<Reservations>,
  ) {}

  getReservation() {
    return this.reservationsRepository.find()
  }

  createPhysicalRoomReservation(reservationsDetails: CreateReservationsParams) {
    const newReservations = this.reservationsRepository.create(reservationsDetails)
    return this.reservationsRepository.save(newReservations)
  }
}
