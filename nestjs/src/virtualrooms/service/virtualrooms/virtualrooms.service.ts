import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VirtualRoom } from 'src/entity/virtualroom.entity';
import { CreateVirtualRoomParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class VirtualroomsService {
    constructor(
        @InjectRepository(VirtualRoom) private virtualroomRepository: Repository<VirtualRoom>,
    ) { }

    async createVirtualRoom(vroomDetails: CreateVirtualRoomParams) { //função para criar uma sala virtual no banco de dados (cadastro)
        const existingVRoom = await this.virtualroomRepository.findOne({ where: { virtual_room_link: vroomDetails.virtual_room_link } });
        if (existingVRoom) {
            throw new Error('Esta sala ja existe'); //caso o link exista ele joga um erro com a mensagem. (precisa ter um catch na rota para a aplicação não cair)
        } else {
            return this.virtualroomRepository.save(this.virtualroomRepository.create(vroomDetails));
        }
    }
}
