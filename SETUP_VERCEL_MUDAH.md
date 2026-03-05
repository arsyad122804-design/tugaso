# 🚀 Setup Vercel - Panduan Super Mudah

## ⚠️ PENTING: Aplikasi Error Karena Environment Variables Belum Diset!

Ikuti langkah ini untuk fix error:

---

## 📋 Langkah 1: Buka Vercel Dashboard

1. Buka browser, ketik: **https://vercel.com/dashboard**
2. Login dengan akun GitHub Anda
3. Cari dan klik project **tugaso**

---

## 📋 Langkah 2: Masuk ke Settings

1. Di halaman project tugaso, klik tab **Settings** (di menu atas)
2. Di sidebar kiri, klik **Environment Variables**

---

## 📋 Langkah 3: Tambahkan 9 Variables

Copy-paste satu per satu:

### 1️⃣ DATABASE_URL
```
Key: DATABASE_URL
Value: (Copy dari file .env lokal)
Environment: ✅ Production ✅ Preview ✅ Development
```
**Cara:** Buka file `.env` → Copy value `DATABASE_URL=...` → Paste ke Vercel

Klik **Save**

### 2️⃣ DIRECT_URL
```
Key: DIRECT_URL
Value: (Copy dari file .env lokal)
Environment: ✅ Production ✅ Preview ✅ Development
```
**Cara:** Buka file `.env` → Copy value `DIRECT_URL=...` → Paste ke Vercel

Klik **Save**

### 3️⃣ NEXT_PUBLIC_SUPABASE_URL
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: (Copy dari file .env lokal)
Environment: ✅ Production ✅ Preview ✅ Development
```
**Cara:** Buka file `.env` → Copy value `NEXT_PUBLIC_SUPABASE_URL=...` → Paste ke Vercel

Klik **Save**

### 4️⃣ NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: (Copy dari file .env lokal)
Environment: ✅ Production ✅ Preview ✅ Development
```
**Cara:** Buka file `.env` → Copy value `NEXT_PUBLIC_SUPABASE_ANON_KEY=...` → Paste ke Vercel

Klik **Save**

### 5️⃣ SUPABASE_SERVICE_ROLE_KEY
```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: (Copy dari file .env lokal)
Environment: ✅ Production ✅ Preview ✅ Development
```
**Cara:** Buka file `.env` → Copy value `SUPABASE_SERVICE_ROLE_KEY=...` → Paste ke Vercel

Klik **Save**

### 6️⃣ SESSION_SECRET
```
Key: SESSION_SECRET
Value: my-super-secret-key-change-this-in-production-12345
Environment: ✅ Production ✅ Preview ✅ Development
```
Klik **Save**

### 7️⃣ REGISTRATION_TOKEN
```
Key: REGISTRATION_TOKEN
Value: 36951f8e0fc96c82b86f01e82c4c347d
Environment: ✅ Production ✅ Preview ✅ Development
```
Klik **Save**

### 8️⃣ GROQ_API_KEY
```
Key: GROQ_API_KEY
Value: (Lihat file .env lokal Anda, copy value GROQ_API_KEY)
Environment: ✅ Production ✅ Preview ✅ Development
```
**PENTING:** Buka file `.env` di komputer Anda, copy value dari `GROQ_API_KEY=...` dan paste ke Vercel.

Klik **Save**

### 9️⃣ NODE_ENV
```
Key: NODE_ENV
Value: production
Environment: ✅ Production (HANYA INI SAJA)
```
Klik **Save**

---

## 📋 Langkah 4: Redeploy

1. Klik tab **Deployments** (di menu atas)
2. Cari deployment paling atas (yang terbaru)
3. Klik tombol **titik tiga (⋮)** di sebelah kanan
4. Pilih **Redeploy**
5. Klik **Redeploy** lagi untuk konfirmasi

---

## ⏳ Langkah 5: Tunggu Deploy Selesai

- Tunggu 2-3 menit
- Status akan berubah dari "Building" → "Ready"
- Setelah status "Ready", klik **Visit** untuk buka aplikasi

---

## ✅ Selesai!

Aplikasi sekarang sudah tidak error dan bisa diakses!

### Fitur yang Berfungsi:
- ✅ Login & Register
- ✅ Dashboard dengan data perusahaan
- ✅ Portfolio saham
- ✅ Saham real-time
- ✅ AI Assistant (chat dengan Groq)
- ✅ User Management (CEO & MANAGER)
- ✅ Profile dengan upload foto
- ✅ PWA (bisa diinstall sebagai aplikasi)

---

## 🆘 Troubleshooting

### Jika masih error setelah redeploy:
1. Cek apakah semua 9 environment variables sudah ditambahkan
2. Pastikan tidak ada typo di Key atau Value
3. Pastikan Environment sudah dicentang dengan benar
4. Coba redeploy sekali lagi

### Jika AI Assistant tidak berfungsi:
- Pastikan GROQ_API_KEY sudah ditambahkan dengan benar
- Value harus persis sama dengan yang di atas

### Jika database error:
- Pastikan DATABASE_URL dan DIRECT_URL sudah ditambahkan
- Pastikan tidak ada spasi di awal atau akhir value

---

## 📞 Butuh Bantuan?

Jika masih ada masalah, screenshot halaman error dan tanyakan!
