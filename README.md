# Shaxsiy blog — lokal ishlab chiqish

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Prisma + SQLite.

## Ishga tushirish (Windows PowerShell)

Node.js o'rnatilgan bo'lishi kerak. Loyiha papkasida:

```powershell
npm.cmd install
npm.cmd run setup:local
npm.cmd run dev
```

Sayt: http://localhost:3000/uz
Admin: http://localhost:3000/admin

Birinchi lokal sozlashda admin: `admin@local.test`, parol: `BlogLocal2026!`.
Bu faqat lokal namuna hisobidir. Ommaviy deploydan oldin parol va AUTH_SECRET almashtiriladi.

`setup:local` mavjud bo'lmasa `.env` yaratadi, SQLite jadvallari va namuna kontentni tayyorlaydi.
Qayta bajarilganda mavjud sozlamalar va kontent saqlanadi. Baza: `prisma/dev.db`.
Terminalni ochiq qoldiring; serverni to'xtatish: Ctrl+C.

## Bo'limlar

Dizayn: shaxsiy raqamli daftar. Kompyuterda chap navigatsiya, telefonda gorizontal menyu; bitta asosiy maqola va ixcham yozuvlar ro'yxati. Binafsha ranglar tizimi, lokal Manrope Variable va light/dark rejimlar. Tafsilotlar: [design.md](design.md).

- Bosh sahifa va barcha maqolalar (sahifalash).
- Muallif haqida: avatar, CV, tajriba, ta'lim va ko'nikmalar.
- IT karyera va ixtiyoriy LeetCode statistikasi.
- Loyihalar va sertifikatlar, alohida batafsil sahifalar.
- Admin: maqolalar, portfolio va sozlamalar. Bo'lim qo'shish va tahrirlash sahifasi olib tashlangan.
- O'zbek, rus va ingliz tillari; light/dark rejim.

Private va Maxfiy sahifa funksiyalari, ularning admin boshqaruvi va baza modellari olib tashlangan.

## Lokal ma'lumotlar

Rasmlar va PDF fayllar `storage/uploads/` ga saqlanadi. Namuna rasmlar `public/demo/` ichida;
asosiy ko'rinish tashqi rasm va shrift xizmatlariga bog'liq emas.
`AUTO_TRANSLATE=0` avtomatik tarjimani o'chiradi. Tarjimalarni admin panelda qo'lda yozish mumkin.
Uni `1` ga almashtirsangiz, tarjima matnlari tashqi Google xizmatiga yuboriladi.
LeetCode faqat username sozlansa tashqi xizmatga ulanadi. Lokal ishlash uchun Neon, R2 va SMTP kerak emas.

## Tekshirish

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
npm.cmd run smoke
```

Smoke va brauzer testlari uchun server ishlab tursin. Brauzer testlari tizimdagi Microsoft Edge'dan foydalanadi:

```powershell
$env:ADMIN_EMAIL='admin@local.test'
$env:ADMIN_PASSWORD='BlogLocal2026!'
node --env-file=.env tests/e2e/admin.e2e.mjs
node --env-file=.env tests/e2e/layout.e2e.mjs
```

Baza zaxirasi: `npm.cmd run db:export` → `data/export.json`.
Keyinchalik Neon/Vercel'ga ko'chirish haqida: [DEPLOY.md](DEPLOY.md).
