# Vercel + Neon + Cloudflare R2

## Hozirgi tayyorgarlik

- Lokal SQLite baza va kontent saqlanadi; zaxira: `data/before-neon-export.json`.
- `scripts/prisma.mjs` DATABASE_URL ga qarab SQLite yoki PostgreSQL sxemasini tanlaydi.
- PostgreSQL sxemasi asosiy modeldan hosil qilinadi: `prisma/schema.postgres.generated.prisma`; gitga kirmaydi.
- `npm.cmd run setup:production` maxfiy sozlamalar uchun `.env.deploy.local` va yangi kuchli admin parolini tayyorlaydi.
- Admin kirishi: `data/production-access.txt`. Bu fayl ham, deploy env fayli ham GitHub/Vercel source uploadga kirmaydi.
- Next.js va sharp deploy oldidan xavfsizlik patchlariga yangilangan.

## Hisoblarga kirish

```powershell
npx.cmd vercel login
npx.cmd neonctl login
```

Har bir xizmatga brauzer orqali tasdiqlanadi. Hisob parollarini terminalga yoki chatga yozish talab qilinmaydi.

## Maxfiy sozlamalar

`.env.deploy.local` ichida:

- Neon: DATABASE_URL (pooled), DATABASE_URL_UNPOOLED (direct).
- Admin: ADMIN_EMAIL, ADMIN_PASSWORD_HASH, AUTH_SECRET.
- Sayt: SITE_URL (haqiqiy HTTPS manzil), AUTO_TRANSLATE.
- R2: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_PUBLIC_URL.

R2 tokeni faqat shu blog bucketiga Object Read & Write ruxsatiga ega bo'lsin. R2_PUBLIC_URL ommaviy bucket yoki media domeni manzili; S3 endpointi emas.

`.env.deploy.local` nomi Next.js tomonidan avtomatik yuklanmaydi: lokal sayt SQLite bilan ishlashda davom etadi.

## Bazani tayyorlash va kontentni ko'chirish

Avval lokal baza bilan eksport:

```powershell
npm.cmd run db:export -- data/before-neon-export.json
```

Keyin alohida production sozlamalari bilan PostgreSQL client va bo'sh Neon jadvallari:

```powershell
node --env-file=.env.deploy.local scripts/prisma.mjs generate
node --env-file=.env.deploy.local scripts/prisma.mjs db push
node --env-file=.env.deploy.local node_modules/tsx/dist/cli.mjs scripts/upload-local-images.ts --references data/before-neon-export.json
node --env-file=.env.deploy.local node_modules/tsx/dist/cli.mjs scripts/import-data.ts data/before-neon-export.json
```

Import bo'sh bazaga bajariladi. `--force` ishlatilmaydi. R2 migration faqat eksportdagi fayllarni yuklaydi; WebP va PDF qo'llanadi. Lokal `/uploads/...` manzillar importda R2_PUBLIC_URL ga almashtiriladi. `public/demo` rasmlari kod bilan joylanadi.

## Vercel

1. O'z hisobingizda loyiha yaratiladi yoki ulanadi.
2. Production environment variables `.env.deploy.local` dan xavfsiz kiritiladi. ADMIN_PASSWORD_HASH Vercel'da dollar belgilari oldidagi teskari slashlarsiz saqlanadi.
3. SITE_URL loyihaning haqiqiy manziliga moslanadi.
4. `npx.cmd vercel --prod` orqali joylanadi. Vercel buildi PostgreSQL clientni avtomatik yaratadi; SQLite fayli serverga ko'chirilmaydi.
5. Uch til, default uz/light, postlar, admin login va R2 upload tekshiriladi.

Vercel bepul `<loyiha>.vercel.app` subdomenini beradi. Alohida .com/.uz domen olinsa keyinchalik Project → Settings → Domains orqali ulanadi. DNS qiymatlari aynan Vercel panelidan olinadi.

## Lokal ishlashga qaytish

```powershell
node scripts/prisma.mjs generate
npm.cmd run dev
```

Asosiy `.env` SQLite manzilini saqlagani uchun bazani qayta yaratish yoki ma'lumotlarni o'chirish kerak emas.

## Muhim

- Vercel, Neon va R2 bepul tariflarida limitlar bor; tariflar har bir xizmat panelidan tekshiriladi.
- Lokal namunaviy admin paroli ommaviy saytga chiqarilmaydi.
- Mavjud begona repo yoki bazaga yozilmaydi; deploy o'z hisobingizdagi yangi resurslarga qilinadi.
