import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";

const file = ".env.deploy.local";
// Next.js mahalliy buildi bo'sh production sozlamalarini avtomatik o'qimasin.
if (!existsSync(file) && existsSync(".env.production.local")) renameSync(".env.production.local", file);
let content = readFileSync(existsSync(file) ? file : ".env.production.example", "utf8");
const empty = (key) => new RegExp(`^${key}=""$`, "m");
if (empty("AUTH_SECRET").test(content)) content = content.replace(empty("AUTH_SECRET"), () => `AUTH_SECRET="${randomBytes(32).toString("hex")}"`);
if (empty("ADMIN_EMAIL").test(content)) content = content.replace(empty("ADMIN_EMAIL"), 'ADMIN_EMAIL="admin@local.test"');
if (empty("ADMIN_PASSWORD_HASH").test(content)) {
  const password = randomBytes(24).toString("base64url");
  const hash = bcrypt.hashSync(password, 12).replace(/\$/g, "\\$");
  content = content.replace(empty("ADMIN_PASSWORD_HASH"), () => `ADMIN_PASSWORD_HASH="${hash}"`);
  mkdirSync("data", { recursive: true });
  const email = content.match(/^ADMIN_EMAIL="([^"]+)"/m)?.[1];
  writeFileSync("data/production-access.txt", `Admin: ${email}\nParol: ${password}\n`, { mode: 0o600 });
}
writeFileSync(file, content, { mode: 0o600 });
console.log("Production sozlamalari: .env.deploy.local. Admin kirishi: data/production-access.txt. Maxfiy qiymatlar terminalga chiqarilmadi.");
