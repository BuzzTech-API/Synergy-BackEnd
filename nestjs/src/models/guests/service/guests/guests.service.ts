import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGuestParams } from 'src/common/utils/types';
import { Guests } from 'src/entities/guests.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuestsService {
    constructor(
        @InjectRepository(Guests)
        private guestsRepository: Repository<Guests>,
    ) { }

    async createGuest(guestDetails: CreateGuestParams) {
        try {
            const existingGuest = await this.guestsRepository.findOne({ where: { guest_email: guestDetails.guest_email } })
            if (existingGuest) {
                throw new ConflictException('Email ja cadastrado') //caso o email exista ele joga um erro com a mensagem
            }

            return this.guestsRepository.save(this.guestsRepository.create(guestDetails))
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    error: error.message,
                }, HttpStatus.CONFLICT)
            }
            else
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: error.message,
                }, HttpStatus.BAD_REQUEST)
        }
    }
}
