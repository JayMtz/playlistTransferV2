import { Test, TestingModule } from '@nestjs/testing';
import { SpotifySongsService } from './spotify-songs.service';

describe('SpotifySongsService', () => {
  let service: SpotifySongsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifySongsService],
    }).compile();

    service = module.get<SpotifySongsService>(SpotifySongsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
