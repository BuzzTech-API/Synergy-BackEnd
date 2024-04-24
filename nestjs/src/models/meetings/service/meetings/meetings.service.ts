import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateMeetingParams, CreateParticipateParams, CreatePresenceParams } from 'src/common/utils/types'
import { Guests } from 'src/entities/guests.entity'
import { Meetings } from 'src/entities/meetings.entity'
import { Participate } from 'src/entities/participate.entity'
import { Presence } from 'src/entities/presence.entity'
import { Reservations } from 'src/entities/reservations.entity'
import { Users } from 'src/entities/users.entity'
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
    @InjectRepository(Reservations)
    private reservationsRepository: Repository<Reservations>,
  ) { }


  async createMeetings(meetingDetails: CreateMeetingParams) {
    try {
      const newMeeting = this.meetingsRepository.create(meetingDetails)
      const reservation = await this.reservationsRepository.findOne({
        where: { reserve_id: meetingDetails.reserve_id },
      }) // Pega o objeto reserva direto do banco

      if (!reservation) {
        throw new NotFoundException("Reserva não encontrada")
      }

      newMeeting.reservations = reservation // Coloca o objeto reserva dentro do campo da tabela de reuniões

      return this.meetingsRepository.save(newMeeting)
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

  async createParticipateMeetings(participateDetails: CreateParticipateParams) {
    try {
      const { meeting_id, users_list } = participateDetails
      const meeting = await this.meetingsRepository.findOne({ where: { meeting_id: meeting_id } })

      // Validações de dados
      if (!meeting) {
        throw new NotFoundException('A reunião fornecida não existe.')
      }

      const errors = []
      const userValidationPromises = users_list.map(async (user_id) => {
        const user = await this.usersRepository.findOne({ where: { user_id: user_id } })
        if (!user) {
          errors.push(`O usuario com ID ${user_id} não existe na tabela usuarios.`)
        }
        const participate = await this.participateRepository.findOne({ where: { meeting_id: meeting_id, user_id: user_id } })
        if (participate) {
          errors.push(`Já existe uma relação entre a reunião e o usuario com o ID ${user_id}.`)
        }
      })

      // Espera todas as validações dos usuários serem concluídas
      await Promise.all(userValidationPromises)

      // Se houver erros, lança uma exceção com os erros acumulados
      if (errors.length > 0) {
        throw new BadRequestException(errors.join('\n'))
      }

      // Cria uma nova participação para cada usuário na reunião
      const participatePromises = users_list.map(async (user_id) => {
        const participate = { meeting_id: meeting_id, user_id: user_id, user_status: "" }
        return this.participateRepository.save(this.participateRepository.create(participate))
      })

      return Promise.all(participatePromises)
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async createPresenceMeetings(presenceDetails: CreatePresenceParams) {
    try {
      const { meeting_id, guests_list } = presenceDetails
      const meeting = await this.meetingsRepository.findOne({ where: { meeting_id: meeting_id } })

      // Validações de dados
      if (!meeting) {
        throw new NotFoundException('A reunião fornecida não existe.')
      }

      const errors = []
      const guestValidationPromises = guests_list.map(async (guest_id) => {
        const guest = await this.guestsRepository.findOne({ where: { guest_id: guest_id } })
        if (!guest) {
          errors.push(`O convidado com ID ${guest_id} não existe na tabela convidados.`)
        }
        const presence = await this.presenceRepository.findOne({ where: { meeting_id: meeting_id, guest_id: guest_id } })
        if (presence) {
          errors.push(`Já existe uma relação entre a reunião e o convidado com o ID ${guest_id}.`)
        }
      })

      // Espera todas as validações dos usuários serem concluídas
      await Promise.all(guestValidationPromises)

      // Se houver erros, lança uma exceção com os erros acumulados
      if (errors.length > 0) {
        throw new BadRequestException(errors.join('\n'))
      }

      // Cria uma nova participação para cada usuário na reunião
      const presencePromises = guests_list.map(async (guest_id) => {
        const presence = { meeting_id: meeting_id, guest_id: guest_id, guest_status: "" }
        return this.presenceRepository.save(this.presenceRepository.create(presence))

      })
      return Promise.all(presencePromises)

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
