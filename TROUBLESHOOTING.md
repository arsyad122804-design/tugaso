# Troubleshooting Guide - WhatsApp CRM

## Problem 1: Access Token Terus Expire

### Penyebab
Anda menggunakan **temporary access token** dari Graph API Explorer yang expire dalam 1-24 jam.

### Solusi: Gunakan System User Access Token (Permanent)

#### Langkah-langkah:

1. **Buka Meta Business Suite**
   - URL: https://business.facebook.com/settings
   - Pilih Business Account Anda

2. **Buat System User**
   - Sidebar: **Users** → **System Users**
   - Klik **Add** button
   - Nama: "WhatsApp CRM Bot" (atau nama lain)
   - Role: **Admin**
   - Klik **Create System User**

3. **Assign WhatsApp Business Account**
   - Klik System User yang baru dibuat
   - Tab **Assigned Assets**
   - Klik **Add Assets** → **Apps**
   - Pilih App Anda → Klik **Add**
   - Klik **Add Assets** → **WhatsApp Accounts**
   - Pilih WhatsApp Business Account → **Full control**

4. **Generate Permanent Token**
   - Masih di halaman System User
   - Klik **Generate New Token**
   - Pilih App Anda
   - Permissions yang diperlukan:
     - ✅ `whatsapp_business_messaging`
     - ✅ `whatsapp_business_management`
   - Klik **Generate Token**
   - **COPY TOKEN INI** - tidak akan ditampilkan lagi!

5. **Update .env File**
   ```env
   WABA_ACCESS_TOKEN="YOUR_NEW_PERMANENT_TOKEN_HERE"
   ```

6. **Restart Development Server**
   ```bash
   npm run dev
   ```

### Verifikasi Token
```bash
# Test token dengan curl
curl -X GET "https://graph.facebook.com/v21.0/me?access_token=YOUR_TOKEN"
```

---

## Problem 2: Pesan dari Customer Tidak Masuk

### Diagnosis Checklist

#### 1. Cek Webhook Configuration di Meta

**Buka Meta Developer Console:**
- URL: https://developers.facebook.com/apps
- Pilih App Anda
- Sidebar: **WhatsApp** → **Configuration**

**Verify Webhook Settings:**
- ✅ Callback URL terdaftar
- ✅ Verify Token match dengan `.env`
- ✅ Status: **Verified** (centang hijau)
- ✅ Webhook Fields subscribed:
  - `messages`
  - `message_status` (optional)

#### 2. Cek Webhook URL Accessibility

**Jika Development (localhost):**

Meta tidak bisa akses `localhost`. Gunakan **ngrok**:

```bash
# Install ngrok
# Download: https://ngrok.com/download

# Jalankan ngrok
ngrok http 3000

# Output akan seperti:
# Forwarding: https://abc123.ngrok.io -> http://localhost:3000
```

**Daftarkan URL ngrok ke Meta:**
- Callback URL: `https://abc123.ngrok.io/api/webhook/whatsapp`
- Verify Token: `whatsapp_crm_webhook_secret_2024`

**Jika Production:**
- Pastikan domain bisa diakses dari internet
- Pastikan HTTPS aktif (Meta require HTTPS)
- Pastikan tidak ada firewall blocking

#### 3. Test Webhook Verification

```bash
# Test GET request (verification)
curl "http://localhost:3000/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=whatsapp_crm_webhook_secret_2024&hub.challenge=test123"

# Expected response: test123
```

#### 4. Test Webhook POST (Simulate Message)

```bash
# Gunakan test-webhook.js yang sudah ada
node test-webhook.js
```

#### 5. Cek Logs

**Terminal logs:**
```bash
npm run dev
# Kirim pesan dari WhatsApp
# Lihat console output
```

**Expected logs:**
```
📥 Webhook received: { entry: [...] }
📨 Processing messages: 1
✅ Message saved: wamid.xxx
```

**Jika tidak ada logs:**
- Webhook tidak sampai ke server
- Cek ngrok/domain accessibility
- Cek Meta webhook configuration

#### 6. Cek Database

```bash
# Masuk ke Prisma Studio
npx prisma studio

# Atau query langsung
```

Cek table `contacts` dan `messages` apakah ada data baru.

---

## Common Issues & Solutions

### Issue: "Webhook verification failed"
**Solusi:**
- Pastikan `WABA_WEBHOOK_VERIFY_TOKEN` di `.env` match dengan yang di Meta
- Restart server setelah update `.env`

### Issue: "Invalid access token"
**Solusi:**
- Generate System User token baru (lihat Problem 1)
- Pastikan token punya permission yang benar

### Issue: "Message sent but not saved to database"
**Solusi:**
- Cek console logs untuk error
- Cek Prisma connection ke database
- Cek apakah label "qualified lead" sudah ada di database

### Issue: "Webhook returns 500 error"
**Solusi:**
- Cek server logs untuk error detail
- Pastikan database connection aktif
- Cek apakah semua environment variables terisi

---

## Testing Workflow

### 1. Test Send Message (App → WhatsApp)
```bash
node test-send-message.js
```

### 2. Test Receive Message (WhatsApp → App)
1. Kirim pesan dari nomor WhatsApp ke nomor bisnis
2. Cek terminal logs
3. Cek database di Prisma Studio
4. Cek halaman Messages di browser

### 3. Test Webhook Locally
```bash
# Terminal 1: Run dev server
npm run dev

# Terminal 2: Run ngrok
ngrok http 3000

# Terminal 3: Test webhook
node test-webhook.js
```

---

## Debug Commands

### Check Database Connection
```bash
npx prisma db pull
```

### Reset Database (CAUTION: Deletes all data)
```bash
npx prisma db push --force-reset
npm run db:seed
```

### View Database
```bash
npx prisma studio
```

### Check Logs
```bash
# Development
npm run dev

# Production (if deployed)
# Check your hosting platform logs
```

---

## Need More Help?

Jika masih ada masalah, kumpulkan informasi berikut:

1. **Screenshot Meta Webhook Configuration**
2. **Console logs** saat kirim pesan dari WhatsApp
3. **Error messages** (jika ada)
4. **Webhook URL** yang digunakan
5. **Test results** dari `test-webhook.js`

Dengan informasi ini, troubleshooting akan lebih mudah.
