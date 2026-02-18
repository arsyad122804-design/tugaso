# Setup Checklist - WhatsApp CRM

Gunakan checklist ini untuk memastikan semua konfigurasi benar.

---

## ✅ Phase 1: Meta Business Manager Setup

### 1.1 Business Manager
- [ ] Punya akses ke Meta Business Manager
- [ ] Business Manager sudah verified
- [ ] WhatsApp Business Account sudah terdaftar

### 1.2 Meta Developer App
- [ ] App sudah dibuat di https://developers.facebook.com/apps
- [ ] WhatsApp product sudah ditambahkan ke App
- [ ] App sudah connected dengan WhatsApp Business Account
- [ ] Phone Number ID sudah didapat (format: `988128274384219`)

### 1.3 System User
- [ ] System User sudah dibuat di Business Settings
- [ ] Role: Admin
- [ ] **PENTING**: App sudah di-assign ke System User
  - Business Settings → System Users → [Your System User]
  - Tab "Assigned Assets" → Section "Apps" → **Harus ada App Anda**
- [ ] WhatsApp Account sudah di-assign (Full control)

### 1.4 Access Token
- [ ] Token sudah di-generate dari System User
- [ ] Permissions yang dipilih:
  - [ ] `whatsapp_business_messaging`
  - [ ] `whatsapp_business_management`
- [ ] Token sudah di-copy (panjang ~200 karakter)
- [ ] Token sudah di-paste ke `.env`

**Test token**:
```bash
curl "https://graph.facebook.com/v21.0/me?access_token=YOUR_TOKEN"
```
Expected: `{"id":"...","name":"Your App Name"}`

---

## ✅ Phase 2: Environment Variables

### 2.1 File .env
- [ ] File `.env` sudah dibuat (copy dari `.env.example`)
- [ ] Database URL sudah diisi
- [ ] WABA variables sudah diisi:

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# WhatsApp Business API
WABA_PHONE_NUMBER_ID="988128274384219"  ← Phone Number ID dari Meta
WABA_ACCESS_TOKEN="EAAxxxxx..."         ← System User Token (panjang)
WABA_WEBHOOK_VERIFY_TOKEN="whatsapp_crm_webhook_secret_2024"

# NextAuth
NEXTAUTH_SECRET="super_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

### 2.2 Verify Environment
```bash
npm run check:meta
```

Expected output:
```
✅ WABA_PHONE_NUMBER_ID: 988128274384219
✅ WABA_ACCESS_TOKEN: EAAxxxxx...
✅ WABA_WEBHOOK_VERIFY_TOKEN: whatsapp_crm_webhook_secret_2024
✅ Access token is VALID
✅ Phone number is VALID
```

---

## ✅ Phase 3: Database Setup

### 3.1 Prisma Setup
- [ ] Dependencies sudah di-install: `npm install`
- [ ] Prisma client sudah di-generate: `npm run db:generate`
- [ ] Database schema sudah di-push: `npm run db:push`
- [ ] Seed data sudah di-run: `npm run db:seed`

### 3.2 Verify Database
```bash
npm run db:studio
```

Buka: http://localhost:5555

Check tables:
- [ ] `users` - Ada minimal 1 user (admin@example.com)
- [ ] `labels` - Ada 6 labels (qualified lead, deal making, dll)
- [ ] `contacts` - Bisa kosong
- [ ] `messages` - Bisa kosong

---

## ✅ Phase 4: Webhook Setup

### 4.1 Development (Localhost)

**Karena Meta tidak bisa akses localhost, gunakan ngrok**:

- [ ] ngrok sudah di-install (https://ngrok.com/download)
- [ ] ngrok sudah di-run: `ngrok http 3000`
- [ ] ngrok URL sudah di-copy (misal: `https://abc123.ngrok.io`)

### 4.2 Meta Webhook Configuration

**Buka**: https://developers.facebook.com/apps → Your App → WhatsApp → Configuration

- [ ] Callback URL sudah diisi:
  - Development: `https://abc123.ngrok.io/api/webhook/whatsapp`
  - Production: `https://yourdomain.com/api/webhook/whatsapp`
- [ ] Verify token sudah diisi: `whatsapp_crm_webhook_secret_2024`
- [ ] Webhook sudah di-verify (klik "Verify and Save")
- [ ] Status: **Verified** (centang hijau)
- [ ] Webhook fields sudah di-subscribe:
  - [ ] `messages` ← WAJIB

### 4.3 Test Webhook

**Test verification**:
```bash
curl "http://localhost:3000/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=whatsapp_crm_webhook_secret_2024&hub.challenge=test123"
```
Expected: `test123`

**Test incoming message**:
```bash
npm run test:webhook
```
Expected:
```
✅ Verification PASSED
✅ Text Message RECEIVED
✅ Image Message RECEIVED
✅ Status Update RECEIVED
```

---

## ✅ Phase 5: Application Testing

### 5.1 Start Development Server
```bash
npm run dev
```

Expected:
```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

### 5.2 Test Authentication
- [ ] Buka: http://localhost:3000/login
- [ ] Login dengan: `admin@example.com` / `admin123`
- [ ] Redirect ke: http://localhost:3000/dashboard/messages
- [ ] Tidak ada error

### 5.3 Test Messages Page
- [ ] Buka: http://localhost:3000/dashboard/messages
- [ ] Sidebar kiri muncul (Contact list)
- [ ] Chat area muncul
- [ ] Bisa pilih contact (jika ada)
- [ ] Bisa ketik dan kirim pesan

### 5.4 Test Board Page
- [ ] Buka: http://localhost:3000/dashboard/board
- [ ] Kanban board muncul dengan 6 kolom
- [ ] Kolom sesuai labels (qualified lead, deal making, dll)
- [ ] Bisa drag & drop contact (jika ada)

---

## ✅ Phase 6: End-to-End Testing

### 6.1 Test Outgoing Message (App → WhatsApp)

**Cara 1: Via UI**
- [ ] Buka Messages page
- [ ] Pilih atau buat contact
- [ ] Ketik pesan
- [ ] Klik Send
- [ ] Cek WhatsApp di nomor target → Pesan masuk

**Cara 2: Via Script**
```bash
npm run test:send
```
- [ ] Script berhasil
- [ ] Pesan masuk ke WhatsApp target

### 6.2 Test Incoming Message (WhatsApp → App)

**Setup**:
1. [ ] Dev server running: `npm run dev`
2. [ ] ngrok running: `ngrok http 3000`
3. [ ] Webhook URL di Meta sudah pakai ngrok URL
4. [ ] Webhook status: Verified

**Test**:
1. [ ] Kirim pesan dari WhatsApp ke nomor bisnis
2. [ ] Cek terminal logs:
   ```
   📥 Webhook received: { entry: [...] }
   📨 Processing messages: 1
   ✅ Message saved: wamid.xxx
   ```
3. [ ] Cek database (Prisma Studio):
   - [ ] Contact baru muncul di table `contacts`
   - [ ] Message baru muncul di table `messages`
4. [ ] Refresh Messages page di browser
   - [ ] Contact baru muncul di sidebar
   - [ ] Pesan muncul di chat area

### 6.3 Test Label Assignment

**Via Messages Page**:
- [ ] Pilih contact
- [ ] Ubah label via dropdown
- [ ] Label berubah di UI
- [ ] Cek Board page → Contact pindah kolom

**Via Board Page**:
- [ ] Drag contact ke kolom lain
- [ ] Contact pindah kolom
- [ ] Cek Messages page → Label berubah

---

## ✅ Phase 7: Production Deployment (Optional)

### 7.1 Deploy Application
- [ ] Deploy ke hosting (Vercel/Railway/dll)
- [ ] Environment variables sudah di-set di hosting
- [ ] Database accessible dari hosting
- [ ] App bisa diakses via HTTPS

### 7.2 Update Webhook URL
- [ ] Buka Meta Developer Console
- [ ] Update Callback URL dengan production URL
- [ ] Verify webhook lagi
- [ ] Test incoming message dari WhatsApp

### 7.3 Production Testing
- [ ] Test login
- [ ] Test send message
- [ ] Test receive message
- [ ] Test drag & drop board

---

## 🔍 Troubleshooting Quick Links

Jika ada yang tidak checklist:

- **Token issue**: Lihat `FIX_TOKEN_ISSUE.md`
- **App assignment**: Lihat `check-app-assignment.md`
- **Webhook issue**: Lihat `TROUBLESHOOTING.md`
- **Quick fix**: Lihat `QUICK_FIX.md`

---

## 📊 Status Check Commands

```bash
# Check Meta configuration
npm run check:meta

# Test webhook
npm run test:webhook

# Test send message
npm run test:send

# Open database
npm run db:studio

# Start dev server
npm run dev
```

---

## ✅ All Done?

Jika semua checklist ✅, congratulations! 🎉

Your WhatsApp CRM is ready to use:
- 📱 Messages: http://localhost:3000/dashboard/messages
- 📊 Board: http://localhost:3000/dashboard/board

---

## 📝 Notes

- Simpan System User token dengan aman (tidak expire)
- Jangan commit `.env` ke git
- Backup database secara berkala
- Monitor webhook logs untuk debugging
