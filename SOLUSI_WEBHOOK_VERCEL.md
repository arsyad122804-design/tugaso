# ✅ SOLUSI: Webhook Error di Vercel

## Masalah yang Sudah Diperbaiki

Saya sudah membuat file `app/api/webhook/route.ts` sehingga URL webhook kembali seperti semula:

**URL Lama (yang berhasil)**: `https://crm-wa.vercel.app/api/webhook`  
**URL Baru (yang error)**: `https://crm-wa.vercel.app/api/webhook/whatsapp`

Sekarang kedua URL akan berfungsi, tapi gunakan yang lama karena sudah terbukti berhasil.

## Langkah-Langkah Fix

### 1. Deploy Perubahan ke Vercel

Karena saya sudah membuat file `app/api/webhook/route.ts`, Anda perlu deploy ke Vercel:

```bash
# Commit perubahan
git add .
git commit -m "fix: restore webhook route to /api/webhook"
git push
```

Atau jika pakai Vercel CLI:

```bash
vercel --prod
```

Tunggu sampai deployment selesai (1-2 menit).

### 2. Test Webhook (Opsional)

Setelah deployment selesai, test webhook:

```bash
node test-webhook-vercel.js
```

Harus muncul: ✅ WEBHOOK VERIFICATION BERHASIL!

### 3. Konfigurasi di Meta Developer Console

1. Buka: https://developers.facebook.com/apps/
2. Pilih app WhatsApp Anda
3. Sidebar kiri: **WhatsApp** > **Configuration**
4. Scroll ke bagian **Webhook**
5. Klik tombol **"Edit"**

**Masukkan konfigurasi ini:**

```
Callback URL: https://crm-wa.vercel.app/api/webhook
Verify token: whatsapp_crm_webhook_secret_2024
```

**PENTING**: 
- Jangan tambahkan parameter apapun di URL
- Jangan pakai `/whatsapp` di akhir URL
- Copy-paste token dari sini agar tidak typo

6. Klik **"Verify and Save"**
7. Jika berhasil, akan muncul **centang hijau ✅**

### 4. Subscribe ke Messages Event

Setelah webhook terverifikasi:

1. Scroll ke bawah ke bagian **"Webhook fields"**
2. Klik **"Manage"** atau **"Subscribe"**
3. Centang **"messages"**
4. Klik **"Save"**

### 5. Test dengan Kirim Pesan

1. Buka WhatsApp di HP
2. Kirim pesan ke nomor WhatsApp Business Anda
3. Buka dashboard: https://crm-wa.vercel.app/dashboard/messages
4. Pesan harus muncul di sana

## Kenapa Sekarang Berhasil?

Sebelumnya route webhook ada di:
- `app/api/webhook/whatsapp/route.ts` → URL: `/api/webhook/whatsapp`

Tapi Meta sudah dikonfigurasi dengan URL lama:
- `/api/webhook`

Sekarang saya sudah membuat:
- `app/api/webhook/route.ts` → URL: `/api/webhook` ✅

Jadi URL yang dikonfigurasi di Meta akan match dengan route yang ada.

## Checklist Environment Variables di Vercel

Pastikan environment variables ini sudah ada di Vercel Dashboard:

- [ ] `WABA_WEBHOOK_VERIFY_TOKEN` = `whatsapp_crm_webhook_secret_2024`
- [ ] `WABA_ACCESS_TOKEN` = (token dari Meta)
- [ ] `WABA_PHONE_NUMBER_ID` = `988128274384219`
- [ ] `DATABASE_URL` = (connection string Supabase)
- [ ] `DIRECT_URL` = (direct connection string Supabase)
- [ ] `SESSION_SECRET` = (secret key)
- [ ] `NODE_ENV` = `production`

Jika ada yang kurang, tambahkan dan **Redeploy**.

## Troubleshooting

### Masih Error "URL callback tidak dapat divalidasi"

**Kemungkinan**:
1. App belum di-deploy ke Vercel setelah perubahan
2. Environment variable `WABA_WEBHOOK_VERIFY_TOKEN` belum ada di Vercel

**Solusi**:
1. Push ke Git dan tunggu auto-deploy selesai
2. Atau jalankan `vercel --prod`
3. Cek environment variables di Vercel Dashboard
4. Test dengan `node test-webhook-vercel.js`

### Error "Token verifikasi tidak dapat divalidasi"

**Kemungkinan**:
Token di Meta tidak sama dengan token di Vercel

**Solusi**:
1. Copy token dari sini: `whatsapp_crm_webhook_secret_2024`
2. Paste langsung ke Meta (jangan ketik manual)
3. Verify and Save

### Webhook Terverifikasi tapi Tidak Menerima Pesan

**Kemungkinan**:
Belum subscribe ke "messages" event

**Solusi**:
1. Buka Meta Developer Console
2. WhatsApp > Configuration > Webhook
3. Scroll ke "Webhook fields"
4. Klik "Manage"
5. Centang "messages"
6. Save

### Pesan Tidak Muncul di Dashboard

**Kemungkinan**:
1. Database connection error
2. Prisma schema belum di-sync

**Solusi**:
```bash
# Sync database schema
npx prisma db push

# Seed default data
npx prisma db seed
```

## Verifikasi Berhasil

Jika semua berhasil:

1. ✅ Deployment ke Vercel selesai tanpa error
2. ✅ Test script menunjukkan "WEBHOOK VERIFICATION BERHASIL"
3. ✅ Meta menunjukkan centang hijau di webhook configuration
4. ✅ Kirim pesan dari WhatsApp, muncul di dashboard
5. ✅ Tidak ada error di Vercel logs

## File yang Dibuat/Diubah

1. ✅ `app/api/webhook/route.ts` - Route webhook baru di path lama
2. ✅ `test-webhook-vercel.js` - Script test webhook (sudah diupdate)
3. ✅ `SOLUSI_WEBHOOK_VERCEL.md` - Panduan ini

## Catatan Penting

- Route lama (`/api/webhook`) dan baru (`/api/webhook/whatsapp`) sekarang sama-sama berfungsi
- Gunakan route lama karena sudah terbukti berhasil dengan Cloudflare Tunnel
- Jangan ubah URL di Meta lagi setelah berhasil terverifikasi
- Token harus sama persis antara Meta dan Vercel (case-sensitive)

## Next Steps

Setelah webhook berhasil:

1. Test kirim berbagai jenis pesan (text, image, video, document)
2. Test reply dari dashboard
3. Monitor logs di Vercel untuk memastikan tidak ada error
4. Setup monitoring/alerting jika perlu

## Support

Jika masih ada masalah:

1. Screenshot error di Meta
2. Screenshot environment variables di Vercel (hide sensitive values)
3. Copy hasil dari `node test-webhook-vercel.js`
4. Check Vercel deployment logs
