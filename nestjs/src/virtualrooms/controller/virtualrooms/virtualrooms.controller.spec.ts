import { Test, TestingModule } from '@nestjs/testing';
import { VirtualroomsController } from './virtualrooms.controller';

describe('VirtualroomsController', () => {
  let controller: VirtualroomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VirtualroomsController],
    }).compile();

    controller = module.get<VirtualroomsController>(VirtualroomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
