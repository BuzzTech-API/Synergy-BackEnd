import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationsParams } from 'src/common/utils/types';
import { Reservations } from 'src/entities/reservations.entity';
import { Repository } from 'typeorm';
import { PhysicalroomsService } from 'src/models/physicalrooms/service/physicalrooms/physicalrooms.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservations)
    private reservationsRepository: Repository<Reservations>,
    private physicalroomService: PhysicalroomsService,
  ) {}

  getReservation() {
    return this.reservationsRepository.find()
  }

  async createPhysicalRoomReservation(reservationsDetails: CreateReservationsParams) {
    const newReservations = this.reservationsRepository.create(reservationsDetails)
    const physicalRoom = await this.physicalroomService.getPhysicalroomById(reservationsDetails.physical_room_id) // Pega o objeto physical room pela rota
    newReservations.physicalroom = physicalRoom // Coloca o objeto physical room dentro do campo da tabela de reservas
    
    return this.reservationsRepository.save(newReservations)
  }

  async getReservationById(id: number){ // Pega a somente a reserva sem suas relações pelo id
    const reservation = await this.reservationsRepository.findOne({ 
        where: { reserve_id: id },
    })
    if(!reservation){
        throw new Error('Sala não existe')
    } 
    return reservation
  }
}
