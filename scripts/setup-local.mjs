import { existsSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { execFileSync } from "node:child_process";
import bcrypt from "bcryptjs";

// Mavjud sozlamalar qayta ishga tushirganda saqlanadi.
if (!existsSync(".env")) {
  const hash = bcrypt.hashSync("BlogLocal2026!", 10).replace(/\$/g, "\\$");
  writeFileSync(".env", [
    'DATABASE_URL="file:./dev.db"',
    `AUTH_SECRET="${randomBytes(32).toString("hex")}"`,
    'ADMIN_EMAIL="admin@local.test"',
    `ADMIN_PASSWORD_HASH="${hash}"`,
    'SITE_URL="http://localhost:3000"',
    'AUTO_TRANSLATE="0"',
    "",
  ].join("\n"));
  console.log("Lokal admin: admin@local.test / BlogLocal2026!");
}

function npm(args) {
  if (process.platform === "win32") {
    execFileSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", `npm.cmd ${args.join(" ")}`], { stdio: "inherit" });
  } else {
    execFileSync("npm", args, { stdio: "inherit" });
  }
}

npm(["exec", "--", "prisma", "generate"]);
npm(["run", "db:push"]);
npm(["run", "db:seed"]);
console.log("Tayyor. npm.cmd run dev orqali saytni oching: http://localhost:3000");
