import { DataSource } from "typeorm"
import * as path from "path";

import * as dotenv from "dotenv";
dotenv.config();

export const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [path.resolve(__dirname, "./entities/*.{ts,js}")],
    logging: true,
    synchronize: true,
})