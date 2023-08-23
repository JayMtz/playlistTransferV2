import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppleMusicSongsService } from './apple-music-songs.service';

@Controller('appleMusicSongs')
export class AppleMusicSongsController {
    constructor(private readonly AppleMusicSongsService: AppleMusicSongsService) {}

    @Post('addAppleSongs/:id')
    async addSongData( @Param('id') id: string, @Body() songs: any[]): Promise <any>{
        const appleMusicId = await this.AppleMusicSongsService.getAppleMusicId(id);
        return this.AppleMusicSongsService.addAppleMusicSongs(appleMusicId, songs);
    }

    @Delete('deleteAppleSongs/:id')
    async deleteSongs(@Param('id') id: string): Promise <any>{
        const appleMusicId = await this.AppleMusicSongsService.getAppleMusicId(id)
        return this.AppleMusicSongsService.deleteAppleSongs(appleMusicId);
    }

    @Get('getAppleSongs/:id')
    async getAppleSongs(@Param('id') id: string): Promise <any>{
        const appleMusicId = await this.AppleMusicSongsService.getAppleMusicId(id);
        return this.AppleMusicSongsService.getAppleSongs(appleMusicId);

    }
}


