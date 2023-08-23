import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SpotifyWebApiService } from 'src/spotify-web-api/spotify-web-api.service';
import { SpotifySongsService } from 'src/spotify-songs/spotify-songs.service';
import { AppleMusicSongsService } from 'src/apple-music-songs/apple-music-songs.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, SpotifyWebApiService, SpotifySongsService, AppleMusicSongsService]
})
export class UsersModule {}
