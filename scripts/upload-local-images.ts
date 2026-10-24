/**
 * storage/uploads/ dagi lokal rasmlarni R2 ga xuddi shu kalit bilan yuklaydi
 * (import-data.ts "/uploads/..." → R2_PUBLIC_URL ga almashtiradi, fayllar shu yerda bo'lishi kerak).
 *   npx tsx --env-file=.env scripts/upload-local-images.ts
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { AwsClient } from "aws4fetch";

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env;
if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET) throw new Error("R2_* o'zgaruvchilari kerak");

const client = new AwsClient({ accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY, service: "s3", region: "auto" });
const root = path.join(process.cwd(), "storage", "uploads");

(async () => {
  const referenceFlag = process.argv.indexOf("--references");
  let references: Set<string> | null = null;
  if (referenceFlag !== -1) {
    const referenceFile = process.argv[referenceFlag + 1];
    if (!referenceFile) throw new Error("--references dan keyin eksport fayli kerak");
    const json = await readFile(referenceFile, "utf8");
    references = new Set([...json.matchAll(/\/uploads\/([^"\\\s]+)/g)].map((m) => m[1]));
  }
  const files = (await readdir(root, { recursive: true, withFileTypes: true })).filter((f) => f.isFile() && /\.(webp|pdf)$/.test(f.name));
  let uploaded = 0;
  for (const f of files) {
    const full = path.join(f.parentPath, f.name);
    const key = path.relative(root, full).split(path.sep).join("/");
    if (references && !references.has(key)) continue;
    const contentType = f.name.endsWith(".pdf") ? "application/pdf" : "image/webp";
    const res = await client.fetch(`https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${R2_BUCKET}/${key}`, {
      method: "PUT",
      body: await readFile(full),
      headers: { "Content-Type": contentType, "Cache-Control": "public, max-age=31536000, immutable" },
    });
    console.log(`${res.ok ? "✔" : "✘"} ${key}${res.ok ? "" : ` HTTP ${res.status}`}`);
    if (!res.ok) throw new Error(`R2 upload failed: HTTP ${res.status}`);
    uploaded++;
  }
  console.log(`${uploaded} ta fayl yuklandi`);
})();
