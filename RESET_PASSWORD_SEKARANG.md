# 🚨 FIX ERROR DATABASE - IKUTI LANGKAH INI!

## Error yang Anda Alami:
```
Authentication failed against database server, 
the provided database credentials for `postgres` are not valid.
```

**Artinya:** Password `Fikliarsyad` di file `.env` Anda SALAH!

---

## ✅ SOLUSI - Ikuti Step by Step:

### STEP 1: Buka Supabase Dashboard

Klik link ini (akan langsung ke halaman Database settings):
```
https://supabase.com/dashboard/project/nekydwvltxrlbmpftbjt/settings/database
```

Atau manual:
1. Buka https://supabase.com/dashboard
2. Login
3. Pilih project `nekydwvltxrlbmpftbjt`
4. Klik **Settings** (ikon gear ⚙️)
5. Klik **Database**

---

### STEP 2: Reset Password Database

Di halaman Database settings:

1. **Scroll ke bawah** sampai menemukan bagian **"Database password"**

2. Klik tombol **"Reset database password"** (tombol merah)

3. Akan muncul popup, masukkan password BARU:
   - Contoh: `MyNewPassword123!`
   - Atau: `Supabase2024!`
   - Atau password apapun yang Anda mau (minimal 8 karakter)

4. Klik **"Reset password"**

5. **PENTING: CATAT PASSWORD INI!** 
   - Tulis di notepad
   - Screenshot
   - Anda tidak bisa melihatnya lagi setelah ini!

---

### STEP 3: Update File .env

Buka file `.env` di project Anda, lalu:

**Ganti baris ini:**
```env
DATABASE_URL='postgresql://postgres.nekydwvltxrlbmpftbjt:Fikliarsyad@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&prepared_statements=false&connection_limit=5&pool_timeout=10'
DIRECT_URL='postgresql://postgres.nekydwvltxrlbmpftbjt:Fikliarsyad@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres'
```

**Menjadi (ganti PASSWORD_BARU dengan password yang baru Anda buat):**
```env
DATABASE_URL='postgresql://postgres.nekydwvltxrlbmpftbjt:PASSWORD_BARU@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&prepared_statements=false&connection_limit=5&pool_timeout=10'
DIRECT_URL='postgresql://postgres.nekydwvltxrlbmpftbjt:PASSWORD_BARU@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres'
```

**Contoh jika password baru Anda adalah `MyNewPassword123!`:**
```env
DATABASE_URL='postgresql://postgres.nekydwvltxrlbmpftbjt:MyNewPassword123!@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&prepared_statements=false&connection_limit=5&pool_timeout=10'
DIRECT_URL='postgresql://postgres.nekydwvltxrlbmpftbjt:MyNewPassword123!@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres'
```

**SAVE FILE .env!**

---

### STEP 4: Dapatkan SERVICE_ROLE_KEY

Masih di Supabase Dashboard:

1. Klik **Settings** > **API**
   
   Atau klik link ini:
   ```
   https://supabase.com/dashboard/project/nekydwvltxrlbmpftbjt/settings/api
   ```

2. Scroll ke bawah ke bagian **"Project API keys"**

3. Cari yang namanya **"service_role"** (bukan anon!)

4. Klik icon **"Copy"** atau **"Reveal"** untuk melihat key

5. Copy key tersebut (panjang, dimulai dengan `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

6. Paste ke file `.env` Anda di baris:
   ```env
   SUPABASE_SERVICE_ROLE_KEY='PASTE_DISINI'
   ```

**SAVE FILE .env!**

---

### STEP 5: Test Koneksi

Buka terminal/command prompt, jalankan:

```bash
npm run db:test
```

**Jika berhasil, Anda akan melihat:**
```
✅ Database connection successful!
✅ Credentials are correct!
```

**Jika masih error:**
- Pastikan password sudah benar
- Pastikan tidak ada spasi di awal/akhir password
- Pastikan password sama di DATABASE_URL dan DIRECT_URL

---

### STEP 6: Setup Database

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

### STEP 7: Jalankan Aplikasi

```bash
npm run dev
```

Buka browser: http://localhost:3000/login

Login dengan:
- Email: `ceo@perusahaan.com`
- Password: `password123`

---

## 📋 Checklist:

- [ ] Sudah reset password database di Supabase
- [ ] Sudah catat password baru
- [ ] Sudah update DATABASE_URL di .env
- [ ] Sudah update DIRECT_URL di .env
- [ ] Sudah copy service_role key
- [ ] Sudah update SUPABASE_SERVICE_ROLE_KEY di .env
- [ ] Sudah save file .env
- [ ] Sudah test koneksi: `npm run db:test`
- [ ] Koneksi berhasil ✅
- [ ] Sudah jalankan: `npx prisma db push`
- [ ] Sudah jalankan: `npm run db:seed`

---

## 🆘 Masih Butuh Bantuan?

Jika masih error setelah mengikuti semua langkah:

1. Jalankan: `npm run db:test`
2. Screenshot error yang muncul
3. Pastikan file .env sudah di-save
4. Restart terminal/command prompt
5. Coba lagi

---

## 💡 Tips:

- **Password tidak boleh ada spasi**
- **Password tidak boleh ada tanda kurung [ ]**
- **Password harus sama** di DATABASE_URL dan DIRECT_URL
- **Port harus berbeda**: 6543 untuk DATABASE_URL, 5432 untuk DIRECT_URL
- **Service role key** berbeda dengan anon key (lebih panjang)

---

**Setelah selesai, Anda akan punya 4 akun:**
- CEO: ceo@perusahaan.com
- Manager: manager@perusahaan.com
- Sekretaris: sekretaris@perusahaan.com
- Bendahara: bendahara@perusahaan.com

**Password semua akun:** `password123`
