# Quick Fix Guide - WhatsApp CRM

## 🚨 Problem 1: Access Token Terus Expire

### ⚠️ PENTING: "Tidak ada izin yang tersedia" saat Generate Token?

Ini artinya **App belum di-assign ke System User**. Fix dulu:

#### Step 1: Assign App ke System User

1. **Buka**: https://business.facebook.com/settings/system-users
2. **Pilih System User** yang sudah dibuat
3. **Tab "Assigned Assets"** → Klik **"Add Assets"**
4. **Pilih "Apps"** → **Centang App Anda** → Save
5. **Verify**: Di section "Apps" harus muncul nama App Anda

#### Step 2: Generate Token

1. **Scroll ke "Generate New Token"**
2. **Pilih App** dari dropdown (sekarang harus muncul)
3. **Centang permissions**:
   - ✅ `whatsapp_business_messaging`
   - ✅ `whatsapp_business_management`
4. **Generate & Copy token**
5. **Update .env**:
   ```env
   WABA_ACCESS_TOKEN="paste_token_disini"
   ```
6. **Restart**: `npm run dev`

✅ Token ini permanent dan tidak akan expire!

📚 **Detail lengkap**: Lihat `FIX_TOKEN_ISSUE.md` dan `check-app-assignment.md`

---

## 🚨 Problem 2: Pesan dari Customer Tidak Masuk

### Diagnosis Cepat:

Jalankan script ini untuk cek konfigurasi:

```bash
npm run check:meta
```

### Kemungkinan Penyebab & Solusi:

#### A. Webhook Belum Terdaftar ❌

**Cek**: Buka https://developers.facebook.com/apps → Your App → WhatsApp → Configuration

**Harus ada**:
- ✅ Callback URL (misal: `https://yourdomain.com/api/webhook/whatsapp`)
- ✅ Verify Token: `whatsapp_crm_webhook_secret_2024`
- ✅ Status: Verified (centang hijau)
- ✅ Subscribed fields: `messages`

**Jika belum**: Daftar webhook URL Anda

---

#### B. Development di Localhost (Meta Tidak Bisa Akses) 🏠

**Problem**: Meta tidak bisa kirim webhook ke `localhost:3000`

**Solusi**: Gunakan ngrok

```bash
# Install ngrok
# Download: https://ngrok.com/download

# Jalankan
ngrok http 3000

# Output: https://abc123.ngrok.io
```

**Daftarkan URL ngrok**:
- Callback URL: `https://abc123.ngrok.io/api/webhook/whatsapp`
- Verify Token: `whatsapp_crm_webhook_secret_2024`

---

#### C. Webhook URL Salah 🔗

**Pastikan format benar**:
```
https://yourdomain.com/api/webhook/whatsapp
```

**BUKAN**:
- ❌ `http://` (harus HTTPS)
- ❌ `/webhook/whatsapp` (kurang `/api`)
- ❌ `localhost:3000` (tidak bisa diakses Meta)

---

#### D. Verify Token Tidak Match 🔑

**Cek .env**:
```env
WABA_WEBHOOK_VERIFY_TOKEN="whatsapp_crm_webhook_secret_2024"
```

**Harus sama** dengan yang di Meta Developer Console!

---

### Testing Workflow:

#### 1. Test Webhook Locally
```bash
# Terminal 1: Run server
npm run dev

# Terminal 2: Test webhook
npm run test:webhook
```

**Expected output**:
```
✅ Verification PASSED
✅ Text Message RECEIVED
✅ Image Message RECEIVED
✅ Status Update RECEIVED
```

#### 2. Test dengan Ngrok (Jika Development)
```bash
# Terminal 1: Run server
npm run dev

# Terminal 2: Run ngrok
ngrok http 3000

# Terminal 3: Update webhook URL di Meta dengan ngrok URL
# Kemudian kirim pesan dari WhatsApp
```

#### 3. Cek Database
```bash
npm run db:studio
```

Buka: http://localhost:5555

**Cek**:
- Table `contacts` → ada contact baru?
- Table `messages` → ada message baru?

---

## 🔍 Debug Checklist

Jalankan satu per satu:

```bash
# 1. Cek Meta configuration
npm run check:meta

# 2. Test webhook locally
npm run test:webhook

# 3. Cek database
npm run db:studio

# 4. Test send message
npm run test:send
```

---

## 📱 Test Real Message

### Dari WhatsApp → App (Incoming):

1. **Setup ngrok** (jika localhost):
   ```bash
   ngrok http 3000
   ```

2. **Daftarkan webhook** di Meta dengan URL ngrok

3. **Kirim pesan** dari nomor WhatsApp ke nomor bisnis Anda

4. **Cek logs** di terminal:
   ```
   📥 Webhook received: { entry: [...] }
   📨 Processing messages: 1
   ✅ Message saved: wamid.xxx
   ```

5. **Cek app**: http://localhost:3000/dashboard/messages

### Dari App → WhatsApp (Outgoing):

1. **Buka**: http://localhost:3000/dashboard/messages

2. **Pilih contact** atau buat baru

3. **Kirim pesan**

4. **Cek WhatsApp** di nomor target

---

## ⚠️ Common Errors

### Error: "Invalid access token"
```bash
# Generate token baru (lihat Problem 1)
# Update .env
# Restart server
npm run dev
```

### Error: "Webhook verification failed"
```bash
# Cek .env
WABA_WEBHOOK_VERIFY_TOKEN="whatsapp_crm_webhook_secret_2024"

# Harus sama dengan Meta Developer Console
# Restart server
```

### Error: "Message not saved to database"
```bash
# Cek database connection
npm run db:studio

# Cek apakah label "qualified lead" ada
# Jika tidak, run seed:
npm run db:seed
```

### Error: "Cannot reach webhook URL"
```bash
# Jika localhost, gunakan ngrok
ngrok http 3000

# Update webhook URL di Meta
```

---

## 🎯 Quick Commands

```bash
# Start development
npm run dev

# Check Meta config
npm run check:meta

# Test webhook
npm run test:webhook

# Test send message
npm run test:send

# Open database
npm run db:studio

# Reset database (CAUTION!)
npx prisma db push --force-reset
npm run db:seed
```

---

## 📞 Need Help?

Jika masih stuck, kumpulkan info ini:

1. Output dari: `npm run check:meta`
2. Output dari: `npm run test:webhook`
3. Screenshot Meta webhook configuration
4. Server logs saat kirim pesan dari WhatsApp
5. Error messages (jika ada)

Dengan info ini troubleshooting akan lebih mudah!

---

## 📚 Dokumentasi Lengkap

- **TROUBLESHOOTING.md** - Panduan lengkap troubleshooting
- **SETUP.md** - Setup awal project
- **WABA_SETUP.md** - Setup WhatsApp Business API
