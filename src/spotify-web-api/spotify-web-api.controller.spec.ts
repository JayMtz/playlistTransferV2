import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyWebApiController } from './spotify-web-api.controller';

import { SpotifySongsController } from './spotify-songs/spotify-songs.controller';

describe('SpotifyWebApiController', () => {
  let controller: SpotifyWebApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyWebApiController],
    }).compile();

    controller = module.get<SpotifyWebApiController>(SpotifyWebApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
