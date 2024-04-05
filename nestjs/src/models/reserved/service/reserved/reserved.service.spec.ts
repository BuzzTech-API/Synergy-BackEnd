import { Test, TestingModule } from '@nestjs/testing';
import { ReservedService } from './reserved.service';

describe('ReservedService', () => {
  let service: ReservedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservedService],
    }).compile();

    service = module.get<ReservedService>(ReservedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
