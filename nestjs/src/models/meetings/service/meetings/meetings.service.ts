import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateMeetingParams, CreateParticipateParams, CreatePresenceParams } from 'src/common/utils/types'
import { Guests } from 'src/entities/guests.entity'
import { Meetings } from 'src/entities/meetings.entity'
import { Participate } from 'src/entities/participate.entity'
import { Presence } from 'src/entities/presence.entity'
import { Users } from 'src/entities/users.entity'
import { ReservationsService } from 'src/models/reservations/service/reservations/reservations.service'
import { Repository } from 'typeorm'

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meetings)
    private meetingsRepository: Repository<Meetings>,
    @InjectRepository(Participate)
    private participateRepository: Repository<Participate>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Guests)
    private guestsRepository: Repository<Guests>,
    @InjectRepository(Presence)
    private presenceRepository: Repository<Presence>,
    private reservationServices: ReservationsService,
  ) { }


  async createMeetings(meetingDetails: CreateMeetingParams) {
    const newMeeting = this.meetingsRepository.create(meetingDetails)
    const reservation = await this.reservationServices.getReservationById(meetingDetails.reserve_id) // Pega o objeto physical room pela rota
    newMeeting.reservations = reservation // Coloca o objeto physical room dentro do campo da tabela de reservas

    return this.meetingsRepository.save(newMeeting)
  }

  async createParticipateMeetings(participateDetails: CreateParticipateParams) {
    const { meeting_id, users_list } = participateDetails
    const meeting = await this.meetingsRepository.findOne({ where: { meeting_id: meeting_id } })

    // Validações de dados
    if (!meeting) {
      throw new Error('A reunião fornecida não existe.')
    }
    const errors = []

    const userValidationPromises = users_list.map(async (user_id) => {
      const user = await this.usersRepository.findOne({ where: { user_id: user_id } })
      if (!user) {
        errors.push('O usuario fornecido não existe na tabela usuarios.')
      }
      const participate = await this.participateRepository.findOne({ where: { meeting_id: meeting_id, user_id: user_id } })
      if (participate) {
        errors.push('Já existe uma relação entre a reunião e o usuario fornecidos.')
      }
    })

    // Espera todas as validações dos usuários serem concluídas
    await Promise.all(userValidationPromises)

    // Se houver erros, lança uma exceção com os erros acumulados
    if (errors.length > 0) {
      throw new Error(errors.join('\n'))
    }

    // Cria uma nova participação para cada usuário na reunião
    const participatePromises = users_list.map(async (user_id) => {
      const participate = { meeting_id: meeting_id, user_id: user_id, user_status: "" }
      return this.participateRepository.save(this.participateRepository.create(participate))

    })
    return Promise.all(participatePromises)
  }

  async createPresenceMeetings(presenceDetails: CreatePresenceParams) {
    const { meeting_id, guests_list } = presenceDetails
    const meeting = await this.meetingsRepository.findOne({ where: { meeting_id: meeting_id } })

    // Validações de dados
    if (!meeting) {
      throw new Error('A reunião fornecida não existe.')
    }
    const errors = []

    const guestValidationPromises = guests_list.map(async (guest_id) => {
      const guest = await this.guestsRepository.findOne({ where: { guest_id: guest_id } })
      if (!guest) {
        errors.push('O convidado fornecido não existe na tabela convidados.')
      }
      const presence = await this.presenceRepository.findOne({ where: { meeting_id: meeting_id, guest_id: guest_id } })
      if (presence) {
        errors.push('Já existe uma relação entre a reunião e o convidado fornecidos.')
      }
    })

    // Espera todas as validações dos usuários serem concluídas
    await Promise.all(guestValidationPromises)

    // Se houver erros, lança uma exceção com os erros acumulados
    if (errors.length > 0) {
      throw new Error(errors.join('\n'))
    }

    // Cria uma nova participação para cada usuário na reunião
    const presencePromises = guests_list.map(async (guest_id) => {
      const presence = { meeting_id: meeting_id, guest_id: guest_id, guest_status: "" }
      return this.presenceRepository.save(this.presenceRepository.create(presence))

    })
    return Promise.all(presencePromises)
  }
}
