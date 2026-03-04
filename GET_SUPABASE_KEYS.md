# Cara Mendapatkan Supabase Keys

## 🔑 Langkah-langkah:

### 1. Buka Supabase Dashboard
- URL: https://supabase.com/dashboard
- Login dengan akun Anda

### 2. Pilih Project
- Pilih project: `nekydwvltxrlbmpftbjt`

### 3. Buka Settings > API
- Klik icon **Settings** (⚙️) di sidebar kiri
- Klik **API**

### 4. Copy Keys yang Diperlukan

Di halaman API, Anda akan melihat:

#### Project URL
```
https://nekydwvltxrlbmpftbjt.supabase.co
```
✅ Sudah benar di .env Anda

#### anon/public key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5la3lkd3ZsdHhybGJtcGZ0Ymp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNzE4NTEsImV4cCI6MjA4NzY0Nzg1MX0.rnYsUPLtVpGfZUqycVfocdpKuuzWMQp1v9s00AT-5xc
```
✅ Sudah benar di .env Anda

#### service_role key (SECRET!)
**INI YANG PERLU ANDA COPY!**

Akan terlihat seperti ini (contoh):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5la3lkd3ZsdHhybGJtcGZ0Ymp0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjA3MTg1MSwiZXhwIjoyMDg3NjQ3ODUxfQ.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

⚠️ **JANGAN SHARE KEY INI KE SIAPAPUN!**

### 5. Buka Settings > Database (Untuk Connection String)

- Klik **Database** di menu Settings
- Scroll ke bagian **Connection string**
- Pilih tab **URI**
- Copy connection string
- Ganti `[YOUR-PASSWORD]` dengan password database Anda

Connection string akan terlihat seperti:
```
postgresql://postgres.nekydwvltxrlbmpftbjt:[YOUR-PASSWORD]@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres
```

### 6. Jika Lupa Password Database

Jika password `Fikliarsyad` tidak benar:

1. Di halaman **Settings > Database**
2. Klik **"Reset database password"**
3. Masukkan password baru
4. Copy password baru tersebut
5. Update di connection string

---

## 📋 Checklist

Setelah mendapatkan semua keys, pastikan file `.env` Anda berisi:

- [ ] DATABASE_URL (dengan password yang benar)
- [ ] DIRECT_URL (port 5432, dengan password yang benar)
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY (yang baru Anda copy)
- [ ] SESSION_SECRET (string random)
- [ ] REGISTRATION_TOKEN (string random)

---

## 🚀 Setelah Update .env

Jalankan:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```
