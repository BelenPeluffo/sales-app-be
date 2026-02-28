import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const extension = isProduction ? 'js' : 'ts';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: [path.join(__dirname, `../modules/**/*.entity.${extension}`)],
  migrations: [path.join(__dirname, `./migrations/*.${extension}`)],
  logging: false,
  schema: process.env.DB_SCHEMA,
});
