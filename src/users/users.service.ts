import { Injectable } from '@nestjs/common';
import { OkPacket, createPool } from 'mysql2/promise';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class UsersService {
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

  async createUser(id): Promise<any> {
    const connection = await this.pool.getConnection();
    const [result] = await connection.query(
      `INSERT INTO users (email, spotifyId, appleMusicId) VALUES (?, NULL, NULL)`,
      [id],
    );
    connection.release();
    return { message: "created user from User service with the username of " + id };
  }

  async addSpotifyId(spotifyId, email): Promise<any> {
    const connect = await this.pool.getConnection();
    const query1 = 'UPDATE users SET spotifyId = ? WHERE email = ?';
    const [result] = await connect.query(query1, [spotifyId, email]);
    connect.release(); // Release the database connection
    return [result];
  }

  async addAppleMusicId(appleMusicId, id): Promise<any> {
    const connect = await this.pool.getConnection();
    const query = 'UPDATE users SET AppleMusicId = ? WHERE EMAIL = ?';
    const [result] = await connect.query(query, [appleMusicId, id]);
    connect.release();
    return result;
  }

  async returnAllUsers(): Promise <any>{
    const connect = await this.pool.getConnection();
    const query = 'SELECT * FROM users';
    const [result] = await connect.query(query);
    connect.release();
    return result;

  }
  async deleteUser(id): Promise<any>{
    const connect = await this.pool.getConnection();
    const query = 'DELETE FROM users WHERE email = ?';
    const [result] = await connect.query(query, [id]);
    connect.release;
    return result;
  }
}


