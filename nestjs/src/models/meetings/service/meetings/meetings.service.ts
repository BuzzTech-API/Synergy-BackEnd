import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMeetingParams } from 'src/common/utils/types';
import { Meetings } from 'src/entities/meetings.entity';
import { ReservationsService } from 'src/models/reservations/service/reservations/reservations.service';
import { Repository } from 'typeorm';

@Injectable()
export class MeetingsService {
    constructor(
        @InjectRepository(Meetings)
        private meetingsRepository: Repository<Meetings>,
        private reservationServices: ReservationsService,
      ) {}


      async createMeetings(meetingDetails: CreateMeetingParams) {
        const newMeeting = this.meetingsRepository.create(meetingDetails)
        const reservation = await this.reservationServices.getReservationById(meetingDetails.reserve_id) // Pega o objeto physical room pela rota
        newMeeting.reservations = reservation // Coloca o objeto physical room dentro do campo da tabela de reservas
        
        return this.meetingsRepository.save(newMeeting)
      }
}
