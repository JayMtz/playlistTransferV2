import { Body, Controller, Param, Post } from '@nestjs/common';
import { AppleMusicSongsService } from './apple-music-songs.service';

@Controller('appleMusicSongs')
export class AppleMusicSongsController {
    constructor(private readonly AppleMusicSongsService: AppleMusicSongsService) {}

    @Post('addAppleSongs/:id')
    async addSongData(
        @Param('id') id: string,
        @Body() songs: any[]): Promise <any>
    {
        const appleMusicId = await this.AppleMusicSongsService.getAppleMusicId(id);
        return this.AppleMusicSongsService.addAppleMusicSongs(appleMusicId, songs);
    }
}


