import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { SpotifyWebApiService } from 'src/spotify-web-api/spotify-web-api.service';
import { SpotifySongsService } from 'src/spotify-songs/spotify-songs.service';



@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService,
                private readonly spotifyWebApi: SpotifyWebApiService,
                private readonly spotifySongsService: SpotifySongsService
                ) {}
                
    //User Accounts are tracked by a Email based ID

    @Post('createuser/:id')
    //creates a new user account 
    createUser(@Param('id') id: string) {
        console.log("The users Controller accepted id " + id);
        return this.userService.createUser(id);
    }

    @Post (`:email/createSpotifyPlaylist`)
    //creates Spotify Playlist for a user
    async createSpotifyPlaylist( @Body() spotifyAuthToken: any, @Param('email') email: string ){
        const authToken = spotifyAuthToken.token;
        const spotifyId = await this.spotifySongsService.getSpotifyId(email)
        return this.spotifyWebApi.createPlaylist(authToken, spotifyId)

    }

    @Put(':id/addSpotifyId')
    //Adds a Spotify Id to a User account 
    async addSpotifyIdtoUser(@Body() spotifyAuthToken: any, @Param('id') email: string){
        const authToken = spotifyAuthToken.token
        const spotifyId = await this.spotifyWebApi.getSpotifyId(authToken)
        return this.userService.addSpotifyIdToUser(spotifyId, email)
    }

    @Put(':id/addAppleMusicId/:appleMusicId')
    addAppleMusicIdToUser(@Param('appleMusicId') appleMusicId: string, @Param('id') id: string){
        console.log('performing put addAppleMusicId with apple music id ' + appleMusicId + ' and email ' + id);
        return this.userService.addAppleMusicIdToUser(appleMusicId, id);
    }
    
    @Get('returnAllUsers')
    getAllUsers(){
        console.log('all users returned')
        return this.userService.returnAllUsers();
    }
    @Delete('/:id')
    deleteAllUsers(@Param('id') id: string){
        console.log('user ' + id + ' is removed')
        return this.userService.deleteUser(id);
    }
    
}
