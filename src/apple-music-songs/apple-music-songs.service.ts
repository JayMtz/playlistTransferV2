import { Injectable } from '@nestjs/common';
import { createPool } from 'mysql2/promise';

@Injectable()
export class AppleMusicSongsService {
    private pool = createPool({
        host: 'localhost',
        user: 'root',
        password: '1194',
        database: 'Users',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        port: 3306, // Add port number for MySQL
      });
    async getAppleMusicId(id){
        const connect = await this.pool.getConnection();
        const query = 'SELECT appleMusicId FROM users WHERE email = ?';
        const [result] = await connect.query(query, id);
        return result[0].appleMusicId;


    }
    


    async addAppleMusicSongs(appleMusicId, songs: { appleMusicSongName: string; appleMusicSongArtist: string }[]): Promise<any> {
    const connect = await this.pool.getConnection();
    const results = [];
    for (const song of songs) {
      const { appleMusicSongName, appleMusicSongArtist } = song;
      try {
        const query = 'INSERT INTO appleMusicSongs (appleMusicId, appleMusicSongName, appleMusicSongArtist) VALUES (?, ?, ?)';
        console.log(`...adding ${appleMusicSongArtist} - ${appleMusicSongName} to database..`)
        const [result] = await connect.query(query, [appleMusicId, appleMusicSongName, appleMusicSongArtist]);
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
}



// async addSpotifySongs(spotifyId, songs: { spotifySongName: string; spotifySongArtist: string }[]): Promise<any> {
//     const connect = await this.pool.getConnection();
//     const results = [];
//     for (const song of songs) {
//       const { spotifySongName, spotifySongArtist } = song;
//       try {
//         const query = 'INSERT INTO spotifySongs (spotifyId, spotifySongName, spotifySongArtist) VALUES (?, ?, ?)';
//         const [result] = await connect.query(query, [spotifyId, spotifySongName, spotifySongArtist]);
//         results.push(result);
//       } catch (error) {
//         if (error.code === 'ER_DUP_ENTRY') {
//           console.error('Duplicate entry:', song);
//         } else {
//           console.error('Error:', error.message);
//         }
//       }
//     }
//     connect.release();
//     return results;
// }
