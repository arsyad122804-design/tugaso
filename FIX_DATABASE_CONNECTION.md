# 🔧 Fix Database Connection Error

## ❌ Error yang Terjadi:
```
P1000: Authentication failed against database server
```

## ✅ Solusi Langkah demi Langkah:

### Langkah 1: Dapatkan SERVICE_ROLE_KEY

1. Buka https://supabase.com/dashboard
2. Login dan pilih project `nekydwvltxrlbmpftbjt`
3. Klik **Settings** (⚙️) > **API**
4. Scroll ke bawah ke bagian **Project API keys**
5. Copy **service_role** key (yang panjang, bukan anon key)
6. Paste ke file `.env` Anda di baris `SUPABASE_SERVICE_ROLE_KEY`

### Langkah 2: Verifikasi Password Database

1. Di Supabase Dashboard, klik **Settings** > **Database**
2. Scroll ke **Connection string**
3. Pilih tab **URI**
4. Lihat connection string Anda
5. Pastikan password yang Anda gunakan benar

**Jika lupa password:**
- Klik **"Reset database password"**
- Buat password baru
- Update di file `.env` (ganti `Fikliarsyad` dengan password baru)

### Langkah 3: Update File .env

File `.env` Anda harus seperti ini (tanpa tanda kurung):

```env
DATABASE_URL='postgresql://postgres.nekydwvltxrlbmpftbjt:PASSWORD_ANDA@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&prepared_statements=false&connection_limit=5&pool_timeout=10'
DIRECT_URL='postgresql://postgres.nekydwvltxrlbmpftbjt:PASSWORD_ANDA@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres'

NEXT_PUBLIC_SUPABASE_URL='https://nekydwvltxrlbmpftbjt.supabase.co'
NEXT_PUBLIC_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5la3lkd3ZsdHhybGJtcGZ0Ymp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNzE4NTEsImV4cCI6MjA4NzY0Nzg1MX0.rnYsUPLtVpGfZUqycVfocdpKuuzWMQp1v9s00AT-5xc'
SUPABASE_SERVICE_ROLE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.PASTE_SERVICE_ROLE_KEY_DISINI'

NODE_ENV="development"
SESSION_SECRET="my-super-secret-key-change-this-12345"
REGISTRATION_TOKEN="36951f8e0fc96c82b86f01e82c4c347d"
```

**Penting:**
- Ganti `PASSWORD_ANDA` dengan password database yang benar
- Ganti `PASTE_SERVICE_ROLE_KEY_DISINI` dengan service_role key dari Supabase
- Jangan ada tanda kurung `[ ]` di password atau key

### Langkah 4: Test Koneksi

Setelah update `.env`, test koneksi:

```bash
npm run db:test
```

Jika berhasil, Anda akan melihat:
```
✅ Database connection successful!
✅ Credentials are correct!
```

Jika masih error, script akan memberitahu masalahnya.

### Langkah 5: Setup Database

Setelah koneksi berhasil:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

Atau gunakan script otomatis:

```bash
scripts\setup-database.bat
```

---

## 🆘 Masih Error?

### Error: Password salah
- Reset password di Supabase Dashboard
- Update di `.env` (DATABASE_URL dan DIRECT_URL)

### Error: Cannot reach database
- Cek koneksi internet
- Pastikan Supabase project aktif
- Cek apakah IP Anda di-whitelist (atau set 0.0.0.0/0 untuk development)

### Error: Service role key invalid
- Pastikan Anda copy **service_role** key, bukan anon key
- Pastikan tidak ada spasi atau karakter tambahan
- Pastikan tidak ada tanda kurung

---

## 📞 Butuh Bantuan?

Jalankan test koneksi untuk diagnostic:
```bash
npm run db:test
```

Script ini akan memberitahu masalah spesifik dan solusinya.
