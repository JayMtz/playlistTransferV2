import { Module } from '@nestjs/common';
import { SpotifySongsController } from './spotify-songs.controller';
import { SpotifySongsService } from './spotify-songs.service';

@Module({
  controllers: [SpotifySongsController],
  providers: [SpotifySongsService]
})
export class SpotifySongsModule {}
