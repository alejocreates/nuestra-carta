import type { Config } from "drizzle-kit";

process.loadEnvFile(".env.local");

export default {
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schema: ["lib/auth-schema.ts"],
} satisfies Config;
