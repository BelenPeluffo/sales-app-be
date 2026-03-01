import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as path from 'path';

const isProduction = !!process.env.DB_URL;

const dbCreds = isProduction
  ? { url: process.env.DB_URL, ssl: { rejectUnauthorized: false } }
  : {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl:
        process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    };

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...dbCreds,
  entities: [path.join(__dirname, '../modules/**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, './migrations/*.{ts,js}')],
  logging: false,
  schema: process.env.DB_SCHEMA,
});
