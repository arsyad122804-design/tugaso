# 🔧 Cara Fix Error "ERR_FAILED" di Vercel

## Masalah
Aplikasi menampilkan "This site can't be reached" atau "ERR_FAILED" karena **environment variables belum ditambahkan di Vercel**.

---

## ✅ Solusi: Tambahkan Environment Variables

### Langkah 1: Buka Vercel Dashboard
1. Buka: https://vercel.com/dashboard
2. Login dengan akun GitHub
3. Klik project **tugaso**

### Langkah 2: Buka Settings
1. Klik tab **Settings** (menu atas)
2. Klik **Environment Variables** (sidebar kiri)

### Langkah 3: Tambahkan Variables

**PENTING:** Buka file `.env` di komputer Anda, lalu copy-paste value dari sana ke Vercel.

#### Tambahkan 9 Variables Ini:

1. **DATABASE_URL**
   - Key: `DATABASE_URL`
   - Value: (Copy dari file .env Anda, baris `DATABASE_URL=...`)
   - Environment: ✅ Production ✅ Preview ✅ Development
   - Klik **Save**

2. **DIRECT_URL**
   - Key: `DIRECT_URL`
   - Value: (Copy dari file .env Anda, baris `DIRECT_URL=...`)
   - Environment: ✅ Production ✅ Preview ✅ Development
   - Klik **Save**

3. **NEXT_PUBLIC_SUPABASE_URL**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (Copy dari file .env Anda, baris `NEXT_PUBLIC_SUPABASE_URL=...`)
   - Environment: ✅ Production ✅ Preview ✅ Development
   - Klik **Save**

4. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (Copy dari file .env Anda, baris `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`)
   - Environment: ✅ Production ✅ Preview ✅ Development
   - Klik **Save**

5. **SUPABASE_SERVICE_ROLE_KEY**
   - Key: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: (Copy dari file .env Anda, baris `SUPABASE_SERVICE_ROLE_KEY=...`)
   - Environment: ✅ Production ✅ Preview ✅ Development
   - Klik **Save**

6. **SESSION_SECRET**
   - Key: `SESSION_SECRET`
   - Value: `my-super-secret-key-change-this-in-production-12345`
   - Environment: ✅ Production ✅ Preview ✅ Development
   - Klik **Save**

7. **REGISTRATION_TOKEN**
   - Key: `REGISTRATION_TOKEN`
   - Value: `36951f8e0fc96c82b86f01e82c4c347d`
   - Environment: ✅ Production ✅ Preview ✅ Development
   - Klik **Save**

8. **GROQ_API_KEY**
   - Key: `GROQ_API_KEY`
   - Value: (Copy dari file .env Anda, baris `GROQ_API_KEY=...`)
   - Environment: ✅ Production ✅ Preview ✅ Development
   - Klik **Save**

9. **NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`
   - Environment: ✅ Production (HANYA INI)
   - Klik **Save**

---

### Langkah 4: Redeploy

Setelah semua 9 variables ditambahkan:

1. Klik tab **Deployments**
2. Cari deployment terbaru (paling atas)
3. Klik **titik tiga (⋮)** di kanan
4. Pilih **Redeploy**
5. Klik **Redeploy** untuk konfirmasi

---

### Langkah 5: Tunggu & Test

1. Tunggu 2-3 menit sampai status "Ready"
2. Klik **Visit** untuk buka aplikasi
3. Aplikasi seharusnya sudah bisa diakses! ✅

---

## 📸 Screenshot Panduan

### Tampilan Environment Variables di Vercel:
```
Key                              Value                    Environment
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATABASE_URL                     postgresql://...         Production, Preview, Development
DIRECT_URL                       postgresql://...         Production, Preview, Development
NEXT_PUBLIC_SUPABASE_URL         https://...             Production, Preview, Development
NEXT_PUBLIC_SUPABASE_ANON_KEY    eyJhbGci...             Production, Preview, Development
SUPABASE_SERVICE_ROLE_KEY        eyJhbGci...             Production, Preview, Development
SESSION_SECRET                   my-super-secret...       Production, Preview, Development
REGISTRATION_TOKEN               36951f8e...              Production, Preview, Development
GROQ_API_KEY                     gsk_SN4w...              Production, Preview, Development
NODE_ENV                         production               Production
```

---

## ❓ FAQ

### Q: Kenapa harus manual tambahkan environment variables?
A: Karena file `.env` tidak di-push ke GitHub (untuk keamanan), jadi Vercel tidak tahu nilai-nilainya.

### Q: Apakah aman memasukkan API key di Vercel?
A: Ya, sangat aman. Environment variables di Vercel ter-enkripsi dan hanya bisa dilihat oleh pemilik project.

### Q: Berapa lama proses redeploy?
A: Biasanya 2-3 menit. Anda bisa lihat progress di tab Deployments.

### Q: Bagaimana cara cek apakah variables sudah benar?
A: Setelah redeploy selesai, buka aplikasi. Jika bisa login, berarti sudah benar.

---

## 🆘 Masih Error?

Jika setelah mengikuti langkah di atas masih error:

1. **Cek Build Logs:**
   - Tab Deployments → Klik deployment terbaru
   - Scroll ke bawah, lihat error message
   - Screenshot dan tanyakan

2. **Cek Environment Variables:**
   - Pastikan semua 9 variables sudah ditambahkan
   - Pastikan tidak ada typo di Key
   - Pastikan tidak ada spasi di awal/akhir Value

3. **Coba Redeploy Lagi:**
   - Kadang perlu redeploy 2x untuk apply changes

---

## ✅ Checklist

Sebelum redeploy, pastikan:
- ☐ Semua 9 environment variables sudah ditambahkan
- ☐ Environment sudah dicentang dengan benar
- ☐ Value di-copy dari file .env lokal (tidak ada typo)
- ☐ Sudah klik Save untuk setiap variable

Setelah checklist lengkap, redeploy dan aplikasi akan berfungsi! 🚀
