# Fix: "Tidak ada izin yang tersedia" - App Role Issue

## Problem
Saat generate token, di step "Assign permissions" muncul:
```
❌ Tidak ada izin yang tersedia
Tetapkan peran aplikasi ke pengguna sistem atau pilih aplikasi lain untuk melanjutkan.
```

## Root Cause
App sudah di-assign ke System User, tapi **belum punya role yang tepat**.

---

## Solusi 1: Assign App Role via Business Settings

### Step 1: Buka Business Settings → Apps

1. **Buka**: https://business.facebook.com/settings/apps
2. **Cari App "crm"** di list
3. **Klik App "crm"**

### Step 2: Assign System User ke App

Di halaman App settings:

1. **Cari section "System Users"** atau **"People"**
2. **Klik "Add People"** atau **"Add System Users"**
3. **Pilih System User "crm_wa"**
4. **Pilih Role**: **"Developer"** atau **"Admin"**
5. **Save**

### Step 3: Verify

Kembali ke System User page:
- Business Settings → System Users → crm_wa
- Tab "Assigned Assets" → Section "Apps"
- Seharusnya sekarang muncul: **crm (Developer)** atau **crm (Admin)**

### Step 4: Generate Token Lagi

Sekarang coba generate token lagi:
1. Scroll ke "Generate New Token"
2. Pilih App "crm"
3. Permissions seharusnya muncul sekarang

---

## Solusi 2: Assign via App Dashboard

### Step 1: Buka Meta Developer Console

1. **Buka**: https://developers.facebook.com/apps
2. **Pilih App "crm"**

### Step 2: Add System User

1. **Sidebar**: **Roles** → **Roles**
2. **Klik "Add System Users"**
3. **Pilih System User "crm_wa"**
4. **Pilih Role**: **"Developer"** atau **"Administrator"**
5. **Save**

### Step 3: Generate Token Lagi

Kembali ke Business Settings dan coba generate token lagi.

---

## Solusi 3: Generate Token dari App Dashboard (Alternative)

Jika cara di atas masih ribet, gunakan cara ini untuk dapat token cepat:

### Via Meta Developer Console

1. **Buka**: https://developers.facebook.com/apps
2. **Pilih App "crm"** (ID: 015883354071830)
3. **Sidebar**: **WhatsApp** → **Getting Started**
4. **Section "Temporary access token"**
5. **Klik "Generate"** atau refresh icon
6. **Copy token** (expire 24 jam - untuk testing dulu)

### Update .env

```env
WABA_ACCESS_TOKEN="token_dari_app_dashboard"
```

### Test

```bash
npm run check:meta
```

Jika berhasil, ini bisa dipakai untuk testing dulu. Nanti setup permanent token setelah role issue beres.

---

## Solusi 4: Via Graph API Explorer (Quick Test)

Untuk testing cepat:

1. **Buka**: https://developers.facebook.com/tools/explorer
2. **Dropdown "Meta App"**: Pilih **"crm"**
3. **Klik "Generate Access Token"**
4. **Login dan authorize**
5. **Klik "Permissions" tab**
6. **Search dan add**:
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
7. **Klik "Generate Access Token" lagi**
8. **Copy token** (expire 1-24 jam)

---

## Verification

Setelah dapat token (dari cara manapun), test:

```bash
# Update .env dengan token baru
npm run check:meta
```

Expected:
```
✅ Access token is VALID
   App ID: 015883354071830
   App Name: crm
✅ Phone number is VALID
```

---

## Summary

**Problem**: App tidak punya role untuk System User

**Quick Fix** (untuk testing):
1. Buka: https://developers.facebook.com/apps
2. Pilih App "crm"
3. WhatsApp → Getting Started
4. Generate temporary token
5. Update .env
6. Test: `npm run check:meta`

**Permanent Fix**:
1. Business Settings → Apps → crm
2. Add System User "crm_wa" dengan role "Developer"
3. Generate token dari System User page
4. Token ini permanent

---

## Next Steps

Setelah dapat token yang valid:

1. ✅ Problem 1 (Token) - SOLVED
2. 🔄 Problem 2 (Webhook) - Next

Lanjut setup webhook untuk terima pesan dari customer.
