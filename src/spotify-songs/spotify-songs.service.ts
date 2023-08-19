import { Injectable } from '@nestjs/common';
import { createPool } from 'mysql2/promise';

@Injectable()
export class SpotifySongsService {
    private pool = createPool({
        host: 'localhost',
        user: 'root',
        password: '1194',
        database: 'playlistTransfer',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        port: 3306, // Add port number for MySQL
      });

    async getSpotifyId(id): Promise <string>{
       const connect = await this.pool.getConnection();
       const query = 'SELECT spotifyId FROM users WHERE email = ?';
       const [result] = await connect.query(query, [id]);
       connect.release();
       return result[0].spotifyId;
    }



    async addSpotifySongs(spotifyId, songs: { spotifySongName: string; spotifySongArtist: string }[]): Promise<any> {
        const connect = await this.pool.getConnection();
        const results = [];
        for (const song of songs) {
          const { spotifySongName, spotifySongArtist } = song;
          try {
            const query = 'INSERT INTO spotifySongs (spotifyId, spotifySongName, spotifySongArtist) VALUES (?, ?, ?)';
            const [result] = await connect.query(query, [spotifyId, spotifySongName, spotifySongArtist]);
            results.push(result);
          } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
              console.error('Duplicate entry:', song);
            } else {
              console.error('Error:', error.message);
            }
          }
        }
        connect.release();
        return results;
    }

    async deleteSpotifySongs(spotifyId): Promise <any>{
        const connect = await this.pool.getConnection();
        const query = 'DELETE FROM spotifySongs WHERE spotifyId = ?'
        const [result] = await connect.query(query, [spotifyId])
        connect.release();
        return result;
    }

    async getSpotifySongs(spotifyId): Promise <any>{
        const connect = await this.pool.getConnection();
        const query = `SELECT spotifySongName, spotifySongArtist FROM spotifySongs WHERE spotifyId = ?`;
        const [result] = await connect.query(query, [spotifyId]);
        connect.release();
        return result
    }
      
}
