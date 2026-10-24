import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import path from "node:path";
import bcrypt from "bcryptjs";

// Hosted environment variables take precedence over the local SQLite .env.
if (existsSync(".env")) process.loadEnvFile(".env");
const require = createRequire(import.meta.url);
const url = process.env.DATABASE_URL || "";
const postgres = /^postgres(?:ql)?:\/\//.test(url);
if (process.env.VERCEL && !postgres) {
  console.error("Vercel uchun Neon PostgreSQL DATABASE_URL sozlanishi kerak.");
  process.exit(1);
}
if (process.env.VERCEL) {
  const required = ["AUTH_SECRET", "ADMIN_EMAIL", "ADMIN_PASSWORD_HASH", "SITE_URL", "R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET", "R2_PUBLIC_URL"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    console.error(`Vercel sozlamalari yetishmaydi: ${missing.join(", ")}`);
    process.exit(1);
  }
  if (process.env.AUTH_SECRET.length < 32 || !process.env.SITE_URL.startsWith("https://")) {
    console.error("Production uchun 32+ belgili AUTH_SECRET va HTTPS SITE_URL kerak.");
    process.exit(1);
  }
  const hash = process.env.ADMIN_PASSWORD_HASH.replace(/\\\$/g, "$");
  if (bcrypt.compareSync("BlogLocal2026!", hash)) {
    console.error("Lokal namunaviy admin parolini production'da ishlatib bo'lmaydi.");
    process.exit(1);
  }
}

let schema = path.resolve("prisma/schema.prisma");
if (postgres) {
  const source = readFileSync(schema, "utf8");
  const datasource = [
    "datasource db {",
    '  provider = "postgresql"',
    '  url = env("DATABASE_URL")',
    ...(process.env.DATABASE_URL_UNPOOLED ? ['  directUrl = env("DATABASE_URL_UNPOOLED")'] : []),
    "}",
  ].join("\n");
  schema = path.resolve("prisma/schema.postgres.generated.prisma");
  writeFileSync(schema, source.replace(/datasource db\s*\{[^}]*\}/, datasource));
}

const args = process.argv.slice(2);
if (!args.length) args.push("generate");
const result = spawnSync(process.execPath, [require.resolve("prisma/build/index.js"), ...args, "--schema", schema], { stdio: "inherit", env: process.env });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
