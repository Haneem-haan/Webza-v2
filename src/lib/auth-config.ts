import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { getMysqlPool } from "@/lib/mysql";

export function createAuth() {
  const baseURL =
    process.env.BETTER_AUTH_URL ??
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined);
  const secret = process.env.BETTER_AUTH_SECRET;

  if (!baseURL) {
    throw new Error("BETTER_AUTH_URL must be set outside development.");
  }

  if (!secret || secret.length < 32) {
    throw new Error("BETTER_AUTH_SECRET must contain at least 32 characters.");
  }

  return betterAuth({
    appName: "Webza Admin",
    baseURL,
    secret,
    database: getMysqlPool(),
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 12,
      maxPasswordLength: 128,
    },
    plugins: [admin()],
  });
}
