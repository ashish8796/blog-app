import postgres from "postgres";
import {
  endpointId,
  pgDatabase,
  pgHost,
  pgPassword,
  pgUser,
} from "./server.config.js";
import createTables from "./models/sql.js";

const sql = postgres({
  host: pgHost,
  database: pgDatabase,
  username: pgUser,
  password: pgPassword,
  ssl: "require",
  connection: {
    options: `project=${endpointId}`,
  },
});

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

export async function connectToDb() {
  console.log("Connecting to database.");
  await getPgVersion();
  console.log("Connected to database.");

  await createTables();
}

export default sql;
