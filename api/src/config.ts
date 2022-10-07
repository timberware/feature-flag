import * as dotenv from 'dotenv';

dotenv.config();

export const MONGO = {
  HOST: process.env.MONGO_HOST || 'localhost',
  USER: process.env.MONGO_USER,
  PASS: process.env.MONGO_PASS,
  DB: process.env.MONGO_DATABASE,
} as const;

export default () => ({
  PORT: parseInt(process.env.PORT || '', 10) || 3000,
  ...MONGO,
});
