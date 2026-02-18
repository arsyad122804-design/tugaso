# Cara Cek & Fix App Assignment ke System User

## Problem Anda Sekarang

Saat generate token muncul:
```
❌ "Tidak ada izin yang tersedia"
❌ "Tetapkan peran aplikasi ke pengguna sistem atau pilih aplikasi lain"
```

Ini artinya: **App belum di-assign ke System User**

---

## Solusi: Assign App ke System User

### Visual Guide:

```
Business Settings
└── System Users
    └── [Your System User]
        └── Assigned Assets  ← KLIK TAB INI
            ├── Apps  ← HARUS ADA APP ANDA DI SINI
            └── WhatsApp Accounts  ← SUDAH ADA ✅
```

### Step-by-Step:

#### 1. Buka Business Settings
- URL: https://business.facebook.com/settings/system-users
- Login dengan akun yang punya akses Business Manager

#### 2. Pilih System User
- Klik nama System User yang sudah Anda buat
- Misal: "WhatsApp CRM Bot"

#### 3. Cek Tab "Assigned Assets"
- Klik tab **"Assigned Assets"** (atau "Aset yang Diterapkan")
- Lihat section **"Apps"**

**Jika Apps KOSONG** → Ini masalahnya!

#### 4. Add App
- Klik tombol **"Add Assets"** (atau "Tambahkan Aset")
- Pilih **"Apps"**
- Akan muncul list Apps yang tersedia
- **Centang App Anda** (App yang terhubung dengan WhatsApp Business API)
- Klik **"Add"** atau **"Save Changes"**

#### 5. Verify App Sudah Ter-assign
Setelah add, di section "Apps" harus muncul:
```
✅ Apps
   └── [Your App Name]
       └── Role: Developer/Admin
```

#### 6. Generate Token Lagi
- Scroll ke bawah ke section **"Generate New Token"**
- Klik **"Generate New Token"**
- **Pilih App** dari dropdown
- Sekarang **permissions harus muncul**:
  - ✅ whatsapp_business_messaging
  - ✅ whatsapp_business_management
  - ✅ business_management (optional)

---

## Cara Tahu App Mana yang Harus Di-assign?

### Method 1: Cek dari WhatsApp Configuration

1. **Buka Meta Developer Console**
   - URL: https://developers.facebook.com/apps

2. **Lihat List Apps**
   - Cari App yang ada logo WhatsApp
   - Atau App yang Anda gunakan untuk setup WABA

3. **Buka App → Dashboard**
   - Catat **App ID** dan **App Name**
   - Ini App yang harus di-assign

### Method 2: Cek dari Phone Number ID

Anda punya `WABA_PHONE_NUMBER_ID="988128274384219"`

1. **Buka**: https://developers.facebook.com/apps
2. **Cek setiap App**:
   - Sidebar: **WhatsApp** → **Getting Started**
   - Lihat "Phone number ID"
   - Jika match dengan `988128274384219` → **Ini App yang benar**

### Method 3: Cek dari Business Settings

1. **Buka**: https://business.facebook.com/settings/whatsapp-business-accounts
2. **Pilih WhatsApp Business Account Anda**
3. **Lihat "Connected Apps"**
4. App yang muncul di sini → **Ini yang harus di-assign**

---

## Troubleshooting

### Problem: "Tidak ada Apps yang tersedia untuk ditambahkan"

**Penyebab**: App tidak terhubung dengan Business Manager

**Solusi**:

#### Option A: Add App ke Business Manager

1. **Buka Meta Developer Console**
   - URL: https://developers.facebook.com/apps
   - Pilih App Anda

2. **App Settings → Basic**
   - Scroll ke bawah ke **"Business Manager"**
   - Klik **"Add to Business Manager"**
   - Pilih Business Manager Anda
   - Save

3. **Kembali ke Business Settings**
   - Sekarang App harus muncul di list

#### Option B: Buat App Baru di Business Manager

1. **Buka Business Settings**
   - URL: https://business.facebook.com/settings/apps

2. **Klik "Add"**
   - Pilih **"Create a new app"**
   - Atau **"Add an existing app"**

3. **Setup WhatsApp**
   - Setelah App dibuat, add WhatsApp product
   - Connect dengan WhatsApp Business Account Anda

---

## Alternative: Generate Token dari App Dashboard

Jika assign App masih ribet, coba cara ini:

### Quick Method (Temporary Token):

1. **Buka**: https://developers.facebook.com/apps
2. **Pilih App Anda**
3. **WhatsApp → Getting Started**
4. **Section "Temporary access token"**
5. **Klik "Generate"**
6. **Copy token** (expire 24 jam)

Ini untuk testing dulu. Nanti bisa setup permanent token setelah App assignment beres.

---

## Verification

Setelah assign App, verify:

### 1. Cek Assigned Assets
```
Business Settings → System Users → [Your System User] → Assigned Assets

✅ Apps:
   └── [Your App Name]

✅ WhatsApp Accounts:
   └── [Your WABA] (Full control)
```

### 2. Generate Token Test
```
Generate New Token → Select App → [Your App Name]

✅ Permissions muncul:
   - whatsapp_business_messaging
   - whatsapp_business_management
```

### 3. Test Token
```bash
# Update .env dengan token baru
npm run check:meta
```

Expected:
```
✅ Access token is VALID
✅ Phone number is VALID
```

---

## Summary

**Root cause**: App belum di-assign ke System User

**Fix**:
1. Business Settings → System Users → [Your System User]
2. Tab "Assigned Assets" → Add Assets → Apps
3. Centang App Anda → Save
4. Generate token lagi → Permissions akan muncul

**Alternative**: Pakai temporary token dari App Dashboard untuk testing dulu

---

## Next Steps

Setelah dapat token yang benar:

```bash
# 1. Update .env
WABA_ACCESS_TOKEN="token_baru_disini"

# 2. Restart server
npm run dev

# 3. Test configuration
npm run check:meta

# 4. Test webhook
npm run test:webhook
```

Kalau masih stuck, screenshot halaman "Assigned Assets" dan saya bisa bantu lebih detail!
