import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();
const pgp = pgPromise({});

export const db = pgp({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DB,
});