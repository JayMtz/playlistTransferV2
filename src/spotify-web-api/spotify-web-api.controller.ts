import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SpotifySongsService } from 'src/spotify-songs/spotify-songs.service';
import { SpotifyWebApiService } from './spotify-web-api.service';


@Controller('spotifyWebApi')
export class SpotifyWebApiController {
    constructor(
        private readonly spotifySongsService: SpotifySongsService,
        private readonly spotifyWebApiService: SpotifyWebApiService,
    ) {}
    
    @Get("/getSpotifyId")
    async getSpotifyID( @Body() spotifyAuthToken: any): Promise<any>{
        const authToken = spotifyAuthToken.token
        const spotifyId = await this.spotifyWebApiService.getSpotifyId(authToken)
    }

    @Post("/createPlaylist")
    async createPlaylist( @Body() spotifyAuthToken: any): Promise<any>{
        const authToken = spotifyAuthToken.token
        return {message: `creating playlist with auth token ${authToken}`}
    }

}
