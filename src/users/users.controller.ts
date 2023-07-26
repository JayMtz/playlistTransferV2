import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    //userService: any;
    constructor(private readonly userService: UsersService) {}
    @Post('createuser/:id')
    createUser(@Param('id') id: string) {
        console.log("The users Controller accepted id " + id);
        return this.userService.createUser(id);
    }

    @Put(':id/addSpotifyId/:spotifyId')
    addSpotifyId(@Param('spotifyId') spotifyId: string, @Param('id') id: string){
        console.log('performing put addSpotifyID with spotify id: ' + spotifyId  +  ' and email: ' + id)
        return this.userService.addSpotifyId(spotifyId, id)

    }

    @Put(':id/addAppleMusicId/:appleMusicId')
    addAppleMusicId(@Param('appleMusicId') appleMusicId: string, @Param('id') id: string){
        console.log('performing put addAppleMusicId with apple music id ' + appleMusicId + ' and email ' + id);
        return this.userService.addAppleMusicId(appleMusicId, id);
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
