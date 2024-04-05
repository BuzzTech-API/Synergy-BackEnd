import { Test, TestingModule } from '@nestjs/testing';
import { ReservedController } from './reserved.controller';

describe('ReservedController', () => {
  let controller: ReservedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservedController],
    }).compile();

    controller = module.get<ReservedController>(ReservedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
