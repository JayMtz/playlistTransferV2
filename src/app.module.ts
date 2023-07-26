import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SpotifySongsModule } from './spotify-songs/spotify-songs.module';
import { AppleMusicSongsModule } from './apple-music-songs/apple-music-songs.module';

@Module({
  imports: [UsersModule, SpotifySongsModule, AppleMusicSongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
