import pgPromise from "pg-promise";
const pgp = pgPromise({});

export const db = pgp({
  user: "postgres",
  password: "kim2myarms",
  host: "localhost",
  port: 5432,
  database: "website",
});