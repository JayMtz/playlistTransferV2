import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { error } from 'console';

@Injectable()
export class SpotifyWebApiService {

    async getSpotifyId(authToken){
        try{
            const response = await fetch ('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });
            if (!response.ok){
                console.log(`error reaching spotify web API`)
            }
            const data = await response.json();
            console.log(`response from Spotify..`)
            console.log(data)
            console.log(`your Spotify id is ${data.id}`)
            return data.id;
        }
        catch(error){
            throw new Error('Error fetching data from Spotify API');
        }


    }
    
}




