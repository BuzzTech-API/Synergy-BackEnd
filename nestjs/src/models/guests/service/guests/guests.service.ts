import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGuestParams } from 'src/common/utils/types';
import { Guests } from 'src/entities/guests.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuestsService {
    constructor(
        @InjectRepository(Guests)
        private guestsRepository: Repository<Guests>,
    ) {}

    createGuest(guestDetails: CreateGuestParams) {
        const newGuest = this.guestsRepository.create(guestDetails)
        console.log(newGuest)
        return this.guestsRepository.save(newGuest)
    }
}
