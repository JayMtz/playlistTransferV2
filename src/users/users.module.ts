import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SpotifyWebApiService } from 'src/spotify-web-api/spotify-web-api.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, SpotifyWebApiService]
})
export class UsersModule {}
