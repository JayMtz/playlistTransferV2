import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { SpotifyWebApiService } from 'src/spotify-web-api/spotify-web-api.service';
import { SpotifySongsService } from 'src/spotify-songs/spotify-songs.service';
import { AppleMusicSongsService } from 'src/apple-music-songs/apple-music-songs.service';



@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService,
                private readonly spotifyWebApi: SpotifyWebApiService,
                private readonly spotifySongsService: SpotifySongsService,
                private readonly appleMusicSongsService: AppleMusicSongsService
                ) {}
                
    //User Accounts are tracked by a Email based ID

    @Post('createuser/:email')
    //creates a new user account 
    createUser(@Param('email') email: string) {
        return this.userService.createUser(email);
    }

    @Post (`:email/createSpotifyPlaylist`)
    //creates Spotify Playlist for a user
    async createSpotifyPlaylist( @Body() spotifyAuthToken: any, @Param('email') email: string ){
        const authToken = spotifyAuthToken.token;
        const spotifyId = await this.spotifySongsService.getSpotifyId(email)
        return this.spotifyWebApi.createPlaylist(authToken, spotifyId)

    }

   @Post(`:email/uploadSongsToSpotify`)
   //uploads songs to new spotify playlist for a user
    async uploadSongsToSpotify( @Body() spotifyAuthToken: any, @Param('email') email: string){
    const authToken = spotifyAuthToken.token
    const appleMusicId = await this.appleMusicSongsService.getAppleMusicId(email)
    const spotifyId = await this.spotifySongsService.getSpotifyId(email)
    const appleMusicsongs = await this.appleMusicSongsService.getAppleSongs(appleMusicId)
    const songUris =  await this.spotifyWebApi.getSongUris(appleMusicsongs, authToken)
    return songUris
   }


    
    @Put(':email/addSpotifyId')
    //Adds a Spotify Id to a User account 
    async addSpotifyIdtoUser(@Body() spotifyAuthToken: any, @Param('email') email: string){
        const authToken = spotifyAuthToken.token
        const spotifyId = await this.spotifyWebApi.getSpotifyId(authToken)
        return this.userService.addSpotifyIdToUser(spotifyId, email)
    }

    @Put(':email/addAppleMusicId/:appleMusicId')
    addAppleMusicIdToUser(@Param('appleMusicId') appleMusicId: string, @Param('email') email: string){
        return this.userService.addAppleMusicIdToUser(appleMusicId, email);
    }
    
    @Get('returnAllUsers')
    getAllUsers(){
        return this.userService.returnAllUsers();
    }
    @Delete('/:email')
    deleteAllUsers(@Param('email') email: string){
        return this.userService.deleteUser(email);
    }
    
}
