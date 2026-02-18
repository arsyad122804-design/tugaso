# Setup Cloudflare Tunnel Permanent (Custom Domain)

## Problem
URL Cloudflare Tunnel gratis (trycloudflare.com) berubah setiap restart, jadi harus update webhook URL di Meta terus.

## Solusi: Setup Cloudflare Tunnel dengan Domain Sendiri

Dengan cara ini, URL tidak akan berubah.

---

## Prerequisites

1. **Domain sendiri** (bisa beli di Namecheap, GoDaddy, atau gratis di Freenom)
2. **Cloudflare account** (gratis)
3. **cloudflared** sudah terinstall

---

## Step 1: Add Domain ke Cloudflare

### 1.1 Signup Cloudflare

1. **Buka**: https://dash.cloudflare.com/sign-up
2. **Signup** dengan email
3. **Verify email**

### 1.2 Add Domain

1. **Dashboard Cloudflare** → **Add a Site**
2. **Masukkan domain** Anda (misal: `yourdomain.com`)
3. **Pilih plan**: **Free** (gratis)
4. **Continue**

### 1.3 Update Nameservers

Cloudflare akan kasih 2 nameservers:
```
ns1.cloudflare.com
ns2.cloudflare.com
```

**Update di domain registrar** Anda:
1. Login ke domain registrar (Namecheap, GoDaddy, dll)
2. Cari **DNS Settings** atau **Nameservers**
3. **Change nameservers** ke Cloudflare nameservers
4. **Save**

**Wait**: 5 menit - 24 jam untuk propagasi

---

## Step 2: Create Cloudflare Tunnel

### 2.1 Login cloudflared

```bash
cloudflared tunnel login
```

Browser akan terbuka, pilih domain Anda.

### 2.2 Create Tunnel

```bash
cloudflared tunnel create whatsapp-crm
```

Output:
```
Tunnel credentials written to: C:\Users\user\.cloudflared\<TUNNEL-ID>.json
Created tunnel whatsapp-crm with id <TUNNEL-ID>
```

**Save TUNNEL-ID** ini.

### 2.3 Create Config File

Buat file `config.yml` di folder `.cloudflared`:

**Windows**: `C:\Users\user\.cloudflared\config.yml`

```yaml
tunnel: <TUNNEL-ID>
credentials-file: C:\Users\user\.cloudflared\<TUNNEL-ID>.json

ingress:
  - hostname: crm.yourdomain.com
    service: http://localhost:3000
  - service: http_status:404
```

**Ganti**:
- `<TUNNEL-ID>` dengan tunnel ID Anda
- `crm.yourdomain.com` dengan subdomain yang Anda mau

### 2.4 Route DNS

```bash
cloudflared tunnel route dns whatsapp-crm crm.yourdomain.com
```

Output:
```
Created CNAME record for crm.yourdomain.com
```

---

## Step 3: Run Tunnel

### 3.1 Start Tunnel

```bash
cloudflared tunnel run whatsapp-crm
```

Output:
```
INF Starting tunnel tunnelID=<TUNNEL-ID>
INF Connection registered connIndex=0
INF Connection registered connIndex=1
```

**Keep terminal open** - tunnel harus running terus.

### 3.2 Test URL

```bash
curl "https://crm.yourdomain.com/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=whatsapp_crm_webhook_secret_2024&hub.challenge=test"
```

Expected: `test`

---

## Step 4: Update Webhook di Meta

1. **Meta Developer Console** → App → WhatsApp → Configuration
2. **Edit Webhook**:
   - **URL Callback**: `https://crm.yourdomain.com/api/webhook/whatsapp`
   - **Verifikasi token**: `whatsapp_crm_webhook_secret_2024`
3. **Verify and Save**

✅ URL ini **tidak akan berubah** lagi!

---

## Step 5: Run as Service (Optional)

Agar tunnel auto-start saat boot:

### Windows Service

```bash
cloudflared service install
```

Tunnel akan running sebagai Windows service.

**Start service**:
```bash
net start cloudflared
```

**Stop service**:
```bash
net stop cloudflared
```

---

## Alternative: ngrok dengan Custom Domain

Jika tidak punya domain, pakai ngrok dengan static domain (paid $8/month):

### ngrok Static Domain

1. **Signup**: https://dashboard.ngrok.com/signup
2. **Upgrade** ke paid plan ($8/month)
3. **Get static domain**: `your-app.ngrok.io`
4. **Run**:
   ```bash
   ngrok http --domain=your-app.ngrok.io 3000
   ```

URL tidak akan berubah.

---

## Alternative: Deploy ke Hosting (Recommended untuk Production)

Deploy app ke hosting dengan HTTPS:

### Option A: Vercel (Free)

1. **Push code** ke GitHub
2. **Import** ke Vercel: https://vercel.com/new
3. **Add environment variables** dari `.env`
4. **Deploy**
5. **Get URL**: `https://your-app.vercel.app`

### Option B: Railway (Free Tier)

1. **Push code** ke GitHub
2. **New Project** di Railway: https://railway.app
3. **Connect GitHub repo**
4. **Add environment variables**
5. **Deploy**
6. **Get URL**: `https://your-app.up.railway.app`

### Option C: Render (Free)

1. **Push code** ke GitHub
2. **New Web Service**: https://render.com
3. **Connect repo**
4. **Add environment variables**
5. **Deploy**
6. **Get URL**: `https://your-app.onrender.com`

---

## Summary

**Development** (URL berubah terus):
- ❌ `trycloudflare.com` - URL berubah setiap restart
- ✅ Cloudflare Tunnel + Custom Domain - URL permanent
- ✅ ngrok static domain ($8/month) - URL permanent

**Production** (Recommended):
- ✅ Vercel (free, auto HTTPS)
- ✅ Railway (free tier, auto HTTPS)
- ✅ Render (free, auto HTTPS)

Untuk development, setup Cloudflare Tunnel dengan custom domain adalah solusi terbaik (gratis + permanent URL).

Untuk production, deploy ke Vercel/Railway/Render lebih mudah dan reliable.
