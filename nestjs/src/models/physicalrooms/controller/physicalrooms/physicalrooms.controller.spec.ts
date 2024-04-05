import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalroomsController } from './physicalrooms.controller';

describe('PhysicalroomsController', () => {
  let controller: PhysicalroomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalroomsController],
    }).compile();

    controller = module.get<PhysicalroomsController>(PhysicalroomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
