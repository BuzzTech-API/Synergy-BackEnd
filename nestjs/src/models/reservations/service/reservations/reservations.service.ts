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

  createReservation(reservationsDetails: CreateReservationsParams) {
    const newReservations = this.reservationsRepository.create({
      ...reservationsDetails,
      reserve_date: new Date(),
    });
    return this.reservationsRepository.save(newReservations);
  }
}
