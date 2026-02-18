# Fix Webhook Error di Vercel

## Masalah
Webhook tidak bisa diverifikasi di Meta setelah ganti dari Cloudflare Tunnel ke Vercel.

Error: "URL callback atau token verifikasi tidak dapat divalidasi"

## Penyebab
1. URL webhook format salah di Meta
2. Environment variables belum di-set di Vercel
3. Token tidak match antara Meta dan Vercel

## Solusi Lengkap

### Step 1: Cek Environment Variables di Vercel

1. Buka Vercel Dashboard: https://vercel.com/dashboard
2. Pilih project `crm-wa`
3. Ke Settings > Environment Variables
4. Pastikan ada variable ini:

```
WABA_WEBHOOK_VERIFY_TOKEN=whatsapp_crm_webhook_secret_2024
WABA_ACCESS_TOKEN=EAAT8jTrSjuEBQjlr4WpKrZB0q64bBT6Ls3DSIHFmwMQFT55zezdb265Nhx8ZA5BTi2DFeoAnrDMZCSZAdTzyfqXdbriZBQbI604YGtEHRlMJwZACZAffJ8YKBbbRxk4dJLs1DELUIpsbfC6Ov88SW32VUXLb37hZC4Y6nLahv9ZAdZANYH625vfotafZCyR9seSIAZDZD
WABA_PHONE_NUMBER_ID=988128274384219
DATABASE_URL=postgresql://postgres.xlvohdfwyhifaqqpstzo:MvUwnpo5VNXcWMdt@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?pgbouncer=true&prepared_statements=false
DIRECT_URL=postgresql://postgres.xlvohdfwyhifaqqpstzo:MvUwnpo5VNXcWMdt@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
SESSION_SECRET=BuDdWixAEzuUjjgEErQSzFjlS7TmZWXDCiJzbGr2CMA=
NODE_ENV=production
```

5. Jika belum ada, tambahkan satu per satu
6. Setelah selesai, klik "Redeploy" untuk apply changes

### Step 2: Test Webhook dari Local

Jalankan test script:

```bash
node test-webhook-vercel.js
```

Jika berhasil, akan muncul:
```
✅ WEBHOOK VERIFICATION BERHASIL!
```

### Step 3: Konfigurasi di Meta Developer Console

1. Buka: https://developers.facebook.com/apps/
2. Pilih app WhatsApp Anda
3. Sidebar kiri: WhatsApp > Configuration
4. Scroll ke bagian "Webhook"
5. Klik tombol "Edit"

**PENTING: Gunakan URL yang BENAR**

❌ SALAH:
```
https://crm-wa.vercel.app/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=whatsapp_crm_webhook_secret_2024&hub.challenge.e...
```

✅ BENAR:
```
Callback URL: https://crm-wa.vercel.app/api/webhook/whatsapp
Verify Token: whatsapp_crm_webhook_secret_2024
```

6. Masukkan:
   - **Callback URL**: `https://crm-wa.vercel.app/api/webhook/whatsapp`
   - **Verify token**: `whatsapp_crm_webhook_secret_2024`

7. Klik "Verify and Save"

8. Jika berhasil, akan muncul centang hijau ✅

9. Scroll ke bawah, di bagian "Webhook fields"
10. Klik "Manage" atau "Subscribe"
11. Centang "messages"
12. Klik "Save"

### Step 4: Test dengan Kirim Pesan

1. Buka WhatsApp di HP
2. Kirim pesan ke nomor WhatsApp Business Anda
3. Buka Vercel Dashboard > Deployments > Latest > Functions
4. Cek logs untuk melihat webhook diterima

Atau buka app:
```
https://crm-wa.vercel.app/dashboard/messages
```

Pesan harus muncul di sana.

## Troubleshooting

### Error: "URL callback tidak dapat divalidasi"

**Penyebab**: Environment variable `WABA_WEBHOOK_VERIFY_TOKEN` tidak ada di Vercel

**Solusi**:
1. Buka Vercel Dashboard > Settings > Environment Variables
2. Tambahkan `WABA_WEBHOOK_VERIFY_TOKEN` dengan value `whatsapp_crm_webhook_secret_2024`
3. Redeploy app

### Error: "Token verifikasi tidak dapat divalidasi"

**Penyebab**: Token di Meta tidak sama dengan token di Vercel

**Solusi**:
1. Cek token di `.env`: `WABA_WEBHOOK_VERIFY_TOKEN`
2. Pastikan sama dengan token yang dimasukkan di Meta
3. Jika beda, update salah satunya agar sama

### Webhook tidak menerima pesan

**Penyebab**: Belum subscribe ke "messages" event

**Solusi**:
1. Buka Meta Developer Console
2. WhatsApp > Configuration > Webhook
3. Scroll ke "Webhook fields"
4. Klik "Manage"
5. Centang "messages"
6. Save

### Error 500 di webhook

**Penyebab**: Database connection error

**Solusi**:
1. Cek `DATABASE_URL` di Vercel environment variables
2. Pastikan Supabase database masih aktif
3. Test connection: `npx prisma db push`

## Verifikasi Berhasil

Jika semua berhasil:

1. ✅ Test script menunjukkan "WEBHOOK VERIFICATION BERHASIL"
2. ✅ Meta menunjukkan centang hijau di webhook configuration
3. ✅ Kirim pesan dari WhatsApp, muncul di dashboard
4. ✅ Tidak ada error di Vercel logs

## Catatan Penting

- **JANGAN** masukkan parameter `hub.mode`, `hub.verify_token`, `hub.challenge` di URL Meta
- Meta akan otomatis menambahkan parameter tersebut saat verifikasi
- URL di Meta harus bersih: `https://crm-wa.vercel.app/api/webhook/whatsapp`
- Token di Meta harus sama persis dengan `WABA_WEBHOOK_VERIFY_TOKEN` di Vercel

## Perbedaan Cloudflare Tunnel vs Vercel

| Aspek | Cloudflare Tunnel | Vercel |
|-------|------------------|--------|
| URL | Temporary (berubah tiap restart) | Permanent |
| Environment | Local dev server | Production server |
| Logs | Terminal lokal | Vercel dashboard |
| Database | Local atau remote | Remote (Supabase) |
| Restart | Manual | Otomatis |

Dengan Vercel, webhook akan lebih stabil karena:
- URL tidak berubah
- Server selalu online
- Auto-scaling
- Built-in monitoring
