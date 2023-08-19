import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class SpotifyWebApiService {

    async getSpotifyId(authToken) {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error reaching Spotify Web API');
            }

            const data = await response.json();
            console.log('Response from Spotify:');
            console.log(data);
            console.log(`Your Spotify id is ${data.id}`);
            return data.id;
        } catch (error) {
            throw new Error('Error fetching data from Spotify API (most likely bad auth token)');
        }
    }

    async createPlaylist(authToken, spotifyId) {
        const playlistName = 'Apple Music Songs';
        const playlistDescription = 'Your Songs from Apple Music';

        try {
            const response = await fetch(`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: playlistName,
                    description: playlistDescription,
                    public: true,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create playlist');
            }

            const playlistData = await response.json();
            return playlistData;
        } catch (error) {
            throw new Error('Bad auth token maybe?');
        }
    }
}
