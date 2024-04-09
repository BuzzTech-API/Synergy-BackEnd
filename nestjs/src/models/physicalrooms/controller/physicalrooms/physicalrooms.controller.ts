import { Controller, Get } from '@nestjs/common';
import { PhysicalroomsService } from '../../service/physicalrooms/physicalrooms.service';

@Controller('physicalrooms')
export class PhysicalroomsController {
  constructor(private physicalroomsService: PhysicalroomsService) {}

  @Get()
  async getPhysicalrooms() {
    const reservations = await this.physicalroomsService.getPhysicalrooms();
    return reservations;
  }
}
