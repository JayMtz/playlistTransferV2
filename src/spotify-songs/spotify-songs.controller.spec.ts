import { Test, TestingModule } from '@nestjs/testing';
import { SpotifySongsController } from './spotify-songs.controller';

describe('SpotifySongsController', () => {
  let controller: SpotifySongsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotifySongsController],
    }).compile();

    controller = module.get<SpotifySongsController>(SpotifySongsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
