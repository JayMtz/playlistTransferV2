import { Test, TestingModule } from '@nestjs/testing';
import { AppleMusicSongsController } from './apple-music-songs.controller';

describe('AppleMusicSongsController', () => {
  let controller: AppleMusicSongsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppleMusicSongsController],
    }).compile();

    controller = module.get<AppleMusicSongsController>(AppleMusicSongsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
