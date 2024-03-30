import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: (process.env.DATABASE_URL!),
});

await client.connect();
const db = drizzle(client);

export default db;
