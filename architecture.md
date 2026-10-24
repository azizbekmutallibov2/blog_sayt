# Arxitektura — lokal blog

## Joriy holat

Next.js 15 App Router + React 19 + TypeScript; Tailwind CSS 4 va CSS animatsiyalar.
Ko'rinish: raqamli daftar uslubi, desktop chap navigatsiya va mobil gorizontal menyu, bitta asosiy maqola va ixcham ro'yxat. Profil yuklanish ekranisiz ochiladi. Lokal Manrope Variable. Dizayn qoidalari: design.md.
Prisma orqali SQLite (`prisma/dev.db`). Frontend va server amallari bitta Next.js loyihasida.

## Tuzilma

- `src/app/[locale]`: uch tilli ommaviy sahifalar; bosh sahifa, posts, blog (muallif haqida va maqolalar), it, projects, certificates, s/[slug].
- `src/app/admin`: login va himoyalangan boshqaruv paneli.
- `src/features`: ma'lumotlarni o'qish va server amallari.
- `src/components`: interfeys, blok-editor, kontent va sahifa komponentlari.
- `src/lib`: baza, admin autentifikatsiyasi, fayllar, tarjima va yordamchi funksiyalar.
- `src/i18n`: uz/ru/en lug'atlari.
- `prisma`: SQLite sxema va takror ishga tushirish mumkin bo'lgan seed.
- `storage/uploads`: lokal WebP va PDF fayllar, /uploads orqali beriladi.
- `public/demo`: lokal namuna rasmlar.

## Kontent

Section, Post, Page, Certificate, Project, ResumeEntry, SocialLink va Setting modellari.
Tarjima mavjud modellar uchun alohida Translation jadvallari bor.
Maqola bloklari JSON sifatida saqlanadi va Zod bilan tekshiriladi.
Private, kirish so'rovlari, maxfiy sahifalar va tashrif kuzatuvi olib tashlangan.

## Himoya va yangilash

Bitta admin .env dagi ADMIN_EMAIL va ADMIN_PASSWORD_HASH bilan kiradi.
JWT sessiya httpOnly cookie'da, server amallari requireAdmin() bilan himoyalanadi.
Yozishdan keyin revalidateSite() ommaviy sahifalar keshini yangilaydi.
Rate-limit bitta server xotirasida ishlaydi.

## Lokal muhit

setup:local faqat .env yo'q bo'lsa uni yaratadi, keyin Prisma generate/db push/seed bajaradi.
DATABASE_URL=file:./dev.db, AUTO_TRANSLATE=0; tashqi baza va shrift talab qilinmaydi.
R2 saqlash kodi keyinchalik deploy uchun saqlangan. Hozir fayllar diskka yoziladi.

## Kod yozish qoidalari

Formalar uchun ActionForm; murakkab tugmali vidjetlar uchun Field group.
Server yozish amallari requireAdmin() bilan boshlanadi va so'ng revalidateSite() chaqiriladi.
Til maydonlari title.uz/title.ru/title.en shaklida readLocalized() bilan o'qiladi.
