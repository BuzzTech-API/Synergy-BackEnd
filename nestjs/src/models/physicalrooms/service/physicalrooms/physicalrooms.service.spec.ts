import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalroomsService } from './physicalrooms.service';

describe('PhysicalroomsService', () => {
  let service: PhysicalroomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalroomsService],
    }).compile();

    service = module.get<PhysicalroomsService>(PhysicalroomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
