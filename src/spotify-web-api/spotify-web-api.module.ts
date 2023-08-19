import { Module } from '@nestjs/common';
import { SpotifyWebApiController } from './spotify-web-api.controller';
import { SpotifySongsModule } from 'src/spotify-songs/spotify-songs.module';
import { SpotifySongsController } from 'src/spotify-songs/spotify-songs.controller';
import { SpotifySongsService } from 'src/spotify-songs/spotify-songs.service';
import { SpotifyWebApiService } from './spotify-web-api.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [SpotifySongsModule, HttpModule],
  controllers: [SpotifyWebApiController],
  providers: [SpotifySongsService, SpotifyWebApiService]
})
export class SpotifyWebApiModule {}
// @Module({
//   imports: [UsersModule, SpotifySongsModule, AppleMusicSongsModule, SpotifyWebApiModule],
//   controllers: [AppController],
//   providers: [AppService],
// })