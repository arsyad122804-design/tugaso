# Setup ngrok untuk Webhook Development

## Kenapa Perlu ngrok?

Meta WhatsApp tidak bisa kirim webhook ke `localhost:3000` karena tidak bisa diakses dari internet.

ngrok membuat tunnel dari internet ke localhost Anda.

---

## Step 1: Install ngrok

### Download ngrok

1. **Buka**: https://ngrok.com/download
2. **Download** untuk Windows
3. **Extract** file zip ke folder (misal: `C:\ngrok`)

### (Optional) Signup untuk Free Account

1. **Signup**: https://dashboard.ngrok.com/signup
2. **Get authtoken**: https://dashboard.ngrok.com/get-started/your-authtoken
3. **Run** (di Command Prompt):
   ```cmd
   ngrok config add-authtoken YOUR_AUTHTOKEN
   ```

Ini optional, tapi dengan account:
- URL tidak berubah-ubah (lebih stabil)
- Bisa pakai custom domain (paid)

---

## Step 2: Run ngrok

### Start Development Server

**Terminal 1** (Command Prompt atau PowerShell):
```cmd
cd C:\path\to\your\project
npm run dev
```

Expected output:
```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

### Start ngrok

**Terminal 2** (Command Prompt baru):
```cmd
cd C:\ngrok
ngrok http 3000
```

Expected output:
```
ngrok

Session Status                online
Account                       your@email.com (Plan: Free)
Version                       3.x.x
Region                        Asia Pacific (ap)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123def456.ngrok-free.app -> http://localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

### Copy ngrok URL

Copy URL dari baris **"Forwarding"**:
```
https://abc123def456.ngrok-free.app
```

⚠️ **PENTING**: 
- Gunakan URL **HTTPS** (bukan HTTP)
- URL ini berubah setiap kali restart ngrok (kecuali pakai paid plan)
- Jangan close terminal ngrok selama development

---

## Step 3: Configure Webhook di Meta

### Buka Meta Developer Console

1. **URL**: https://developers.facebook.com/apps
2. **Pilih App "crm"**
3. **Sidebar**: WhatsApp → Configuration

### Edit Webhook

Di section **"Webhook"**:

1. **Callback URL**: 
   ```
   https://abc123def456.ngrok-free.app/api/webhook/whatsapp
   ```
   (Ganti `abc123def456.ngrok-free.app` dengan URL ngrok Anda)

2. **Verify Token**: 
   ```
   whatsapp_crm_webhook_secret_2024
   ```
   (Harus sama dengan `WABA_WEBHOOK_VERIFY_TOKEN` di `.env`)

3. **Klik "Verify and Save"**

### Expected Result

Jika berhasil:
- ✅ Status: **Verified** (centang hijau)
- ✅ Callback URL tersimpan

Jika gagal:
- ❌ Error: "The callback URL or verify token couldn't be validated"
- Cek terminal dev server untuk error logs

---

## Step 4: Subscribe to Webhook Fields

Masih di halaman Configuration, scroll ke bawah ke section **"Webhook fields"**:

**Subscribe to**:
- ✅ **messages** (WAJIB - untuk terima pesan)
- ✅ **message_status** (Optional - untuk status delivered/read)

**Klik "Subscribe"** atau **"Save"**

---

## Step 5: Test Webhook

### Test 1: Verification (GET)

Di browser atau curl:
```cmd
curl "https://abc123def456.ngrok-free.app/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=whatsapp_crm_webhook_secret_2024&hub.challenge=test123"
```

Expected response: `test123`

### Test 2: Incoming Message (POST)

**Terminal 3**:
```cmd
npm run test:webhook
```

Expected output:
```
✅ Verification PASSED
✅ Text Message RECEIVED
✅ Image Message RECEIVED
✅ Status Update RECEIVED
```

### Test 3: Real WhatsApp Message

1. **Kirim pesan** dari nomor WhatsApp ke nomor bisnis Anda
2. **Cek terminal dev server** (Terminal 1):
   ```
   📥 Webhook received: { entry: [...] }
   📨 Processing messages: 1
   ✅ Message saved: wamid.xxx
   ```
3. **Cek database**:
   ```cmd
   npm run db:studio
   ```
   Buka: http://localhost:5555
   - Table `contacts` → ada contact baru?
   - Table `messages` → ada message baru?

4. **Cek app**:
   - Buka: http://localhost:3000/dashboard/messages
   - Refresh page
   - Contact dan message harus muncul

---

## Troubleshooting

### Error: "The callback URL couldn't be validated"

**Cek**:
1. Dev server running? (`npm run dev`)
2. ngrok running? (Terminal 2)
3. URL benar? (harus HTTPS, ada `/api/webhook/whatsapp`)
4. Verify token match dengan `.env`?

**Test manual**:
```cmd
curl "https://your-ngrok-url.ngrok-free.app/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=whatsapp_crm_webhook_secret_2024&hub.challenge=test"
```

Should return: `test`

### Error: "ngrok not found"

**Solusi**:
```cmd
# Pastikan di folder ngrok
cd C:\ngrok

# Atau add ke PATH
# Windows: System Properties → Environment Variables → Path → Add C:\ngrok
```

### ngrok URL berubah terus

**Solusi**:
- Signup untuk free account: https://dashboard.ngrok.com/signup
- Get authtoken dan configure
- URL akan lebih stabil (tapi tetap berubah jika restart)
- Untuk permanent URL, perlu paid plan ($8/month)

### Webhook tidak terima pesan

**Cek**:
1. Webhook status: Verified? ✅
2. Subscribed to "messages"? ✅
3. ngrok masih running?
4. Dev server masih running?
5. Cek ngrok web interface: http://127.0.0.1:4040
   - Lihat incoming requests
   - Lihat response codes

---

## ngrok Web Interface

ngrok punya web interface untuk monitoring:

**Buka**: http://127.0.0.1:4040

Di sini Anda bisa lihat:
- Semua HTTP requests yang masuk
- Request headers
- Request body
- Response status
- Response body

Sangat berguna untuk debug webhook!

---

## Production Deployment

Setelah development selesai, deploy ke hosting dengan HTTPS:

**Options**:
- Vercel (free, auto HTTPS)
- Railway (free tier, auto HTTPS)
- Heroku (paid, auto HTTPS)
- VPS dengan SSL certificate

Setelah deploy, update webhook URL di Meta dengan production URL.

---

## Quick Commands

```cmd
# Terminal 1: Dev server
npm run dev

# Terminal 2: ngrok
cd C:\ngrok
ngrok http 3000

# Terminal 3: Test
npm run test:webhook
npm run db:studio
```

---

## Summary

1. ✅ Install ngrok
2. ✅ Run dev server: `npm run dev`
3. ✅ Run ngrok: `ngrok http 3000`
4. ✅ Copy ngrok URL
5. ✅ Configure webhook di Meta dengan ngrok URL
6. ✅ Subscribe to "messages" field
7. ✅ Test dengan kirim pesan dari WhatsApp

Setelah ini, pesan dari customer akan masuk ke app! 🎉
