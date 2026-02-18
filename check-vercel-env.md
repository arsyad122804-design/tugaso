# Checklist Environment Variables Vercel

## Yang Harus Ada di Vercel Dashboard

Buka: https://vercel.com/dashboard → pilih project `crm-wa` → Settings → Environment Variables

### ✅ Checklist

- [ ] `WABA_WEBHOOK_VERIFY_TOKEN` = `whatsapp_crm_webhook_secret_2024`
- [ ] `WABA_ACCESS_TOKEN` = `EAAT8jTrSjuEBQjlr4WpKrZB0q64bBT6Ls3DSIHFmwMQFT55zezdb265Nhx8ZA5BTi2DFeoAnrDMZCSZAdTzyfqXdbriZBQbI604YGtEHRlMJwZACZAffJ8YKBbbRxk4dJLs1DELUIpsbfC6Ov88SW32VUXLb37hZC4Y6nLahv9ZAdZANYH625vfotafZCyR9seSIAZDZD`
- [ ] `WABA_PHONE_NUMBER_ID` = `988128274384219`
- [ ] `DATABASE_URL` = `postgresql://postgres.xlvohdfwyhifaqqpstzo:MvUwnpo5VNXcWMdt@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?pgbouncer=true&prepared_statements=false`
- [ ] `DIRECT_URL` = `postgresql://postgres.xlvohdfwyhifaqqpstzo:MvUwnpo5VNXcWMdt@aws-1-ap-south-1.pooler.supabase.com:5432/postgres`
- [ ] `SESSION_SECRET` = `BuDdWixAEzuUjjgEErQSzFjlS7TmZWXDCiJzbGr2CMA=`
- [ ] `NODE_ENV` = `production`

### Setelah Menambahkan/Update Environment Variables

1. Klik "Save"
2. Klik "Redeploy" (atau deploy ulang dari Git)
3. Tunggu sampai deployment selesai (biasanya 1-2 menit)

### Test Setelah Redeploy

```bash
node test-webhook-vercel.js
```

Harus muncul: ✅ WEBHOOK VERIFICATION BERHASIL!

## Konfigurasi Meta (PENTING!)

Setelah environment variables di-set dan app di-redeploy:

1. Buka: https://developers.facebook.com/apps/
2. Pilih app WhatsApp
3. Sidebar: WhatsApp > Configuration
4. Bagian Webhook, klik "Edit"

**Masukkan HANYA ini:**

```
Callback URL: https://crm-wa.vercel.app/api/webhook/whatsapp
Verify token: whatsapp_crm_webhook_secret_2024
```

**JANGAN masukkan parameter tambahan di URL!**

❌ SALAH:
```
https://crm-wa.vercel.app/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=...
```

✅ BENAR:
```
https://crm-wa.vercel.app/api/webhook/whatsapp
```

5. Klik "Verify and Save"
6. Jika berhasil, akan muncul centang hijau ✅
7. Subscribe ke "messages" event

## Jika Masih Error

### Error: "URL callback tidak dapat divalidasi"

Kemungkinan:
1. Environment variable `WABA_WEBHOOK_VERIFY_TOKEN` belum ada di Vercel
2. App belum di-redeploy setelah tambah environment variable

Solusi:
1. Cek lagi environment variables di Vercel
2. Redeploy app
3. Tunggu deployment selesai
4. Test lagi dengan `node test-webhook-vercel.js`

### Error: "Token verifikasi tidak dapat divalidasi"

Kemungkinan:
1. Token di Meta tidak sama dengan token di Vercel
2. Typo saat input token

Solusi:
1. Copy token dari `.env`: `whatsapp_crm_webhook_secret_2024`
2. Paste langsung ke Meta (jangan ketik manual)
3. Verify and Save

### Test Script Gagal

Kemungkinan:
1. App belum di-deploy ke Vercel
2. URL Vercel salah
3. Environment variables belum di-set

Solusi:
1. Cek apakah `https://crm-wa.vercel.app` bisa dibuka
2. Cek environment variables di Vercel dashboard
3. Redeploy app

## Quick Fix Commands

```bash
# Test webhook verification
node test-webhook-vercel.js

# Deploy ke Vercel (jika ada perubahan)
vercel --prod

# Atau push ke Git (jika auto-deploy enabled)
git add .
git commit -m "fix: update webhook config"
git push
```

## Kontak Support

Jika masih error setelah ikuti semua langkah:

1. Screenshot error di Meta
2. Screenshot environment variables di Vercel (hide sensitive values)
3. Copy hasil dari `node test-webhook-vercel.js`
4. Share untuk troubleshooting lebih lanjut
