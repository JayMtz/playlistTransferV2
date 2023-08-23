import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SpotifySongsService } from './spotify-songs.service';

@Controller('spotifySongs')
export class SpotifySongsController {
  constructor(private readonly SpotifySongsService: SpotifySongsService) {}

  @Post('addSpotifySongs/:id')
  async addSongData( @Param('id') id: string, @Body() songs: any[]): Promise<any> {
    const spotifyId = await this.SpotifySongsService.getSpotifyId(id);
    const results = await this.SpotifySongsService.addSpotifySongs(spotifyId, songs);
    return { message: 'Successfully added songs to the database.', results };
  }

  //delete songs by specific email
  @Delete('deleteSpotifySongs/:id')
  async deleteSongData(@Param('id') id: string){
    const spotifyId = await this.SpotifySongsService.getSpotifyId(id);
    return this.SpotifySongsService.deleteSpotifySongs(spotifyId);
  }

  //get list of all songs by email 
  @Get('getSpotifySongs/:id')
  async getSpotifySongs(@Param('id') id: string){
    const spotifyId = await this.SpotifySongsService.getSpotifyId(id);
    return this.SpotifySongsService.getSpotifySongs(spotifyId);
    
  }

}
