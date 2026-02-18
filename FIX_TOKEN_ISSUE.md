# Fix: System User Token - "Tidak ada izin yang tersedia"

## Problem
Saat generate token, muncul: **"Tidak ada izin yang tersedia"**

## Penyebab
App belum di-assign ke System User, jadi tidak ada permission yang bisa dipilih.

## Solusi Lengkap

### Step 1: Assign App ke System User

1. **Buka Meta Business Suite**
   - URL: https://business.facebook.com/settings/system-users
   - Pilih Business Account Anda

2. **Pilih System User** yang sudah dibuat
   - Klik nama System User (misal: "WhatsApp CRM Bot")

3. **Assign App**
   - Klik tab **"Assigned Assets"**
   - Klik tombol **"Add Assets"**
   - Pilih **"Apps"**
   - **Centang App Anda** (App yang terhubung dengan WhatsApp)
   - Klik **"Add"** atau **"Save Changes"**

4. **Assign WhatsApp Account** (jika belum)
   - Masih di tab "Assigned Assets"
   - Klik **"Add Assets"** lagi
   - Pilih **"WhatsApp Accounts"**
   - Centang WhatsApp Business Account Anda
   - Pilih **"Full control"** atau **"Manage WhatsApp Business Account"**
   - Klik **"Save Changes"**

### Step 2: Generate Token

Sekarang generate token lagi:

1. **Masih di halaman System User**
   - Scroll ke bawah ke section **"Generate New Token"**

2. **Klik "Generate New Token"**

3. **Pilih App Anda**
   - Dropdown "Select an app" → Pilih App Anda
   - Sekarang seharusnya muncul daftar permissions

4. **Pilih Permissions**
   - ✅ `whatsapp_business_messaging` (WAJIB - untuk kirim/terima pesan)
   - ✅ `whatsapp_business_management` (WAJIB - untuk manage account)
   - ✅ `business_management` (Optional - untuk manage business)

5. **Generate & Copy Token**
   - Klik **"Generate Token"**
   - **COPY TOKEN** - tidak akan ditampilkan lagi!
   - Token format: `EAAxxxxxxxxxxxxx...` (panjang ~200 karakter)

6. **Update .env**
   ```env
   WABA_ACCESS_TOKEN="EAAxxxxxxxxxxxxx..."
   ```

7. **Restart Server**
   ```bash
   npm run dev
   ```

### Step 3: Verify Token

Test token baru:

```bash
npm run check:meta
```

Expected output:
```
✅ Access token is VALID
   App ID: xxxxx
   App Name: Your App Name
```

---

## Alternative: Generate Token dari App Dashboard

Jika cara di atas masih tidak berhasil, coba cara ini:

### Method 2: Via App Dashboard

1. **Buka Meta Developer Console**
   - URL: https://developers.facebook.com/apps
   - Pilih App Anda

2. **WhatsApp → Getting Started**
   - Sidebar: **WhatsApp** → **Getting Started**

3. **Temporary Token** (untuk testing)
   - Ada section "Temporary access token"
   - Klik **"Generate"**
   - Copy token (expire 24 jam)

4. **Permanent Token** (recommended)
   - Scroll ke bawah ke section **"Permanent tokens"**
   - Atau buka: **WhatsApp** → **Configuration**
   - Klik **"Create System User"** atau link ke Business Settings

---

## Method 3: Manual via Graph API Explorer (Temporary)

Jika butuh token cepat untuk testing:

1. **Buka Graph API Explorer**
   - URL: https://developers.facebook.com/tools/explorer

2. **Select App**
   - Dropdown "Meta App" → Pilih App Anda

3. **Get Token**
   - Klik "Generate Access Token"
   - Login dan authorize

4. **Add Permissions**
   - Klik "Permissions" tab
   - Search dan add:
     - `whatsapp_business_messaging`
     - `whatsapp_business_management`
   - Klik "Generate Access Token" lagi

5. **Copy Token**
   - Token ini expire dalam 1-24 jam
   - Hanya untuk testing!

---

## Verification Checklist

Setelah dapat token baru, verify:

### 1. Test Token Validity
```bash
curl "https://graph.facebook.com/v21.0/me?access_token=YOUR_TOKEN"
```

Expected response:
```json
{
  "id": "123456789",
  "name": "Your App Name"
}
```

### 2. Test Phone Number Access
```bash
curl "https://graph.facebook.com/v21.0/988128274384219?access_token=YOUR_TOKEN"
```

Expected response:
```json
{
  "id": "988128274384219",
  "display_phone_number": "+62 xxx",
  "verified_name": "Your Business Name"
}
```

### 3. Run Check Script
```bash
npm run check:meta
```

All checks should pass:
```
✅ Access token is VALID
✅ Phone number is VALID
✅ Webhook is SUBSCRIBED
```

---

## Common Issues

### Issue 1: "Tidak ada izin yang tersedia"
**Solusi**: App belum di-assign ke System User
- Assign App dulu (Step 1 di atas)
- Baru generate token

### Issue 2: "Invalid OAuth access token"
**Solusi**: Token salah atau expire
- Generate token baru
- Pastikan copy full token (panjang ~200 karakter)
- Pastikan tidak ada spasi atau newline

### Issue 3: "Permissions not granted"
**Solusi**: Token tidak punya permission yang cukup
- Generate ulang dengan permission:
  - `whatsapp_business_messaging`
  - `whatsapp_business_management`

### Issue 4: Token masih expire
**Solusi**: Pastikan pakai System User token, bukan:
- ❌ User Access Token (expire 1-2 jam)
- ❌ Temporary token dari Graph Explorer (expire 24 jam)
- ✅ System User Access Token (permanent)

---

## Quick Test

Setelah update token, test langsung:

```bash
# 1. Check configuration
npm run check:meta

# 2. Test send message
npm run test:send

# 3. Test webhook
npm run test:webhook
```

---

## Screenshot Checklist

Untuk memastikan setup benar, cek:

### Di Business Settings → System Users:
- ✅ System User ada
- ✅ Role: Admin
- ✅ Assigned Assets:
  - ✅ Apps: Your App (dengan nama app Anda)
  - ✅ WhatsApp Accounts: Your WABA (Full control)

### Di Generate Token:
- ✅ Dropdown "Select an app" → App Anda muncul
- ✅ Permissions list muncul (tidak kosong)
- ✅ Bisa centang `whatsapp_business_messaging`
- ✅ Bisa centang `whatsapp_business_management`

---

## Need Help?

Jika masih stuck, screenshot ini:

1. **Business Settings → System Users** → Assigned Assets tab
2. **Generate Token** page (yang muncul "Tidak ada izin")
3. **Meta Developer Console** → Your App → Dashboard

Dengan screenshot ini bisa troubleshoot lebih detail.
