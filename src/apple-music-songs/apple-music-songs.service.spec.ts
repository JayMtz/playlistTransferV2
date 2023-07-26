import { Test, TestingModule } from '@nestjs/testing';
import { AppleMusicSongsService } from './apple-music-songs.service';

describe('AppleMusicSongsService', () => {
  let service: AppleMusicSongsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppleMusicSongsService],
    }).compile();

    service = module.get<AppleMusicSongsService>(AppleMusicSongsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
