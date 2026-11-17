import { createPool, type Pool } from "mysql2/promise";

declare global {
  var webzaMysqlPool: Pool | undefined;
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getMysqlPool(): Pool {
  if (globalThis.webzaMysqlPool) {
    return globalThis.webzaMysqlPool;
  }

  const port = Number(process.env.MYSQL_PORT ?? "3306");
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("MYSQL_PORT must be a valid TCP port.");
  }

  globalThis.webzaMysqlPool = createPool({
    host: requiredEnv("MYSQL_HOST"),
    port,
    user: requiredEnv("MYSQL_USER"),
    password: requiredEnv("MYSQL_PASSWORD"),
    database: requiredEnv("MYSQL_DATABASE"),
    charset: "utf8mb4",
    timezone: "Z",
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
  });

  return globalThis.webzaMysqlPool;
}
