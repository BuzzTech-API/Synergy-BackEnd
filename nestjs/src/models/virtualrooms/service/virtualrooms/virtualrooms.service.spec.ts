import { Test, TestingModule } from '@nestjs/testing';
import { VirtualroomsService } from './virtualrooms.service';

describe('VirtualroomsService', () => {
  let service: VirtualroomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VirtualroomsService],
    }).compile();

    service = module.get<VirtualroomsService>(VirtualroomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
