import dotenv from 'dotenv';
import { IEnv } from '../types/env.types';
dotenv.config();

declare var process: {
  env: any;
};

export const {
  PORT,
  DB_URI,
  NODE_ENV,
  API_KEY,
  BCRYPT_SALT,
  JWT_SECRET,
  PG_USERNAME,
  PG_DB,
  PG_PASSWORD,
  PG_HOST,
  PG_TYPE,
  PG_PORT,
}: IEnv = process.env;
