import { Module } from '@nestjs/common';
import { AppleMusicSongsController } from './apple-music-songs.controller';
import { AppleMusicSongsService } from './apple-music-songs.service';

@Module({
  controllers: [AppleMusicSongsController],
  providers: [AppleMusicSongsService]
})
export class AppleMusicSongsModule {}
