import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationsParams, User } from 'src/common/utils/types';
import { Reservations } from 'src/entities/reservations.entity';
import { Repository } from 'typeorm';
import { PhysicalRooms } from 'src/entities/physicalrooms.enity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservations)
    private reservationsRepository: Repository<Reservations>,
    @InjectRepository(PhysicalRooms)
    private physicalroomRepository: Repository<PhysicalRooms>,
  ) { }

  getReservation() {
    try {
      const reservations = this.reservationsRepository.find()

      if (!reservations) {
        throw new NotFoundException('Reservas não encontradas')
      }

      return reservations
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

  async createPhysicalRoomReservation(reservationsDetails: CreateReservationsParams, user: User) {
    try {
      const newReservations = this.reservationsRepository.create({
        ...reservationsDetails, 
        user
      })
      const physicalRoom = await this.physicalroomRepository.findOne({
        where: { physical_room_id: reservationsDetails.physical_room_id }
      }) // Pega o objeto physical room direto  do banco de dados
      if (!physicalRoom) {
        throw new NotFoundException('Sala não encontrada')
      }

      newReservations.physicalroom = physicalRoom // Coloca o objeto physical room dentro do campo da tabela de reservas

      return this.reservationsRepository.save(newReservations)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        }, HttpStatus.NOT_FOUND);
      }
      else
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        }, HttpStatus.BAD_REQUEST)
    }
  }

  async getReservationById(id: number) { // Pega a somente a reserva sem suas relações pelo id
    try {
      const reservation = await this.reservationsRepository.findOne({
        where: { reserve_id: id },
      })

      if (!reservation) {
        throw new NotFoundException('Sala não encontrada')
      }

      return reservation
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
