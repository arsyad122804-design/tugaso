# Debug: Webhook Tidak Menerima Pesan

## Checklist Diagnosis

### 1. Cek Webhook Configuration di Meta

**Buka**: https://developers.facebook.com/apps → App "crm" → WhatsApp → Configuration

**Verify**:
- [ ] Callback URL: `https://your-domain.com/api/webhook/whatsapp` ✅
- [ ] Verify Token: `whatsapp_crm_webhook_secret_2024` ✅
- [ ] Status: **Verified** (centang hijau) ✅
- [ ] Webhook Fields Subscribed:
  - [ ] `messages` ✅ (WAJIB)
  - [ ] `message_status` (Optional)

**Screenshot** halaman ini jika masih ada yang merah.

---

### 2. Cek Access Token Valid

```bash
npm run check:meta
```

Expected output:
```
✅ Access token is VALID
✅ Phone number is VALID
✅ Webhook is SUBSCRIBED
```

Jika ada yang ❌, fix dulu sebelum lanjut.

---

### 3. Test Webhook Verification (GET)

Test apakah Meta bisa akses webhook Anda:

```bash
curl "https://your-domain.com/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=whatsapp_crm_webhook_secret_2024&hub.challenge=test123"
```

Expected response: `test123`

Jika error:
- ❌ Connection timeout → Cloudflare tunnel tidak running
- ❌ 404 Not Found → URL salah
- ❌ 403 Forbidden → Verify token tidak match

---

### 4. Test Webhook POST (Simulate Message)

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

Jika gagal, cek error message.

---

### 5. Cek Server Logs

**Pastikan dev server running**:
```bash
npm run dev
```

**Kirim pesan dari WhatsApp** ke nomor bisnis.

**Cek terminal logs**:

**Expected logs** (jika webhook sampai):
```
📥 Webhook received: { entry: [...] }
📥 Request headers: { ... }
📨 Processing messages: 1
✅ Message saved: wamid.xxx
```

**Jika tidak ada logs sama sekali**:
- Webhook tidak sampai ke server
- Meta tidak kirim webhook
- Cloudflare tunnel issue

**Jika ada error logs**:
- Cek error message untuk detail

---

### 6. Cek Cloudflare Tunnel

**Verify tunnel running**:
```bash
# Cek status cloudflared
# Atau cek Cloudflare dashboard
```

**Test akses dari internet**:
```bash
curl https://your-domain.com/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=whatsapp_crm_webhook_secret_2024&hub.challenge=test
```

Should return: `test`

---

### 7. Cek Database

```bash
npm run db:studio
```

Buka: http://localhost:5555

**Cek tables**:
- `labels` → Harus ada 6 labels (qualified lead, dll)
- `contacts` → Ada contact dengan waId `6285175434869`?
- `messages` → Ada messages untuk contact tersebut?

**Jika labels kosong**:
```bash
npm run db:seed
```

---

### 8. Cek Nomor WhatsApp

**Verify nomor yang kirim pesan**:
- Format: `6285175434869` (tanpa +, tanpa spasi)
- Nomor ini harus kirim ke **nomor bisnis** yang terdaftar di WABA
- Bukan nomor pribadi, harus nomor bisnis

**Cek nomor bisnis**:
```bash
curl "https://graph.facebook.com/v21.0/988128274384219?access_token=YOUR_TOKEN"
```

Response akan show nomor bisnis Anda.

---

## Common Issues & Solutions

### Issue 1: Webhook Verified tapi Tidak Terima Pesan

**Kemungkinan**:

#### A. Webhook Field Tidak Di-subscribe

**Fix**:
1. Meta Developer Console → WhatsApp → Configuration
2. Scroll ke "Webhook fields"
3. **Subscribe to "messages"** ✅
4. Klik "Subscribe" atau "Save"

#### B. Phone Number Tidak Di-subscribe ke Webhook

**Fix**:
1. Meta Developer Console → WhatsApp → Configuration
2. Section "Webhook"
3. Cari "Phone numbers" atau "Manage"
4. **Pastikan nomor bisnis Anda ter-subscribe**

#### C. App Tidak Punya Permission

**Fix**:
1. Regenerate access token dengan permissions:
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
2. Update `.env`
3. Restart server

---

### Issue 2: Webhook Returns 500 Error

**Cek server logs** untuk error detail.

**Common errors**:

#### A. Database Connection Error

```
Error: Can't reach database server
```

**Fix**:
- Cek `DATABASE_URL` di `.env`
- Test connection: `npx prisma db pull`

#### B. Label "qualified lead" Tidak Ada

```
Error: No default label found
```

**Fix**:
```bash
npm run db:seed
```

#### C. Prisma Client Not Generated

```
Error: @prisma/client did not initialize yet
```

**Fix**:
```bash
npm run db:generate
npm run dev
```

---

### Issue 3: Pesan Masuk tapi Tidak Tersimpan

**Cek logs** untuk error saat save message.

**Possible causes**:
- Duplicate message (sudah ada di database)
- Contact creation failed
- Database constraint violation

**Fix**:
- Cek Prisma Studio untuk data yang ada
- Cek server logs untuk error detail

---

### Issue 4: Cloudflare Tunnel Issue

**Symptoms**:
- Webhook verification gagal
- Curl timeout
- Meta tidak bisa akses URL

**Fix**:

#### A. Tunnel Tidak Running

```bash
# Start cloudflared
cloudflared tunnel run your-tunnel-name
```

#### B. Tunnel Configuration Salah

Cek `config.yml`:
```yaml
tunnel: your-tunnel-id
credentials-file: /path/to/credentials.json

ingress:
  - hostname: your-domain.com
    service: http://localhost:3000
  - service: http_status:404
```

#### C. DNS Not Configured

- Buka Cloudflare Dashboard
- DNS → Cek CNAME record untuk your-domain.com
- Should point to tunnel

---

## Debug Commands

### 1. Check Meta Configuration
```bash
npm run check:meta
```

### 2. Test Webhook Locally
```bash
npm run test:webhook
```

### 3. Check Database
```bash
npm run db:studio
```

### 4. Check Server Logs
```bash
npm run dev
# Kirim pesan dari WhatsApp
# Lihat logs
```

### 5. Test Webhook URL
```bash
curl "https://your-domain.com/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=whatsapp_crm_webhook_secret_2024&hub.challenge=test"
```

### 6. Check Cloudflare Tunnel
```bash
cloudflared tunnel info your-tunnel-name
```

---

## Step-by-Step Debugging

### Step 1: Verify Webhook Configuration

```bash
# Test verification endpoint
curl "https://your-domain.com/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=whatsapp_crm_webhook_secret_2024&hub.challenge=test123"
```

Expected: `test123`

### Step 2: Check Meta Subscription

1. Buka: https://developers.facebook.com/apps
2. App "crm" → WhatsApp → Configuration
3. Screenshot section "Webhook" dan "Webhook fields"

### Step 3: Test with Script

```bash
npm run test:webhook
```

Check output for errors.

### Step 4: Send Real Message

1. **Start dev server** (Terminal 1):
   ```bash
   npm run dev
   ```

2. **Watch logs** (keep terminal visible)

3. **Send message** from WhatsApp to business number

4. **Check logs**:
   - Should see: `📥 Webhook received`
   - If nothing → Webhook not reaching server
   - If error → Check error message

### Step 5: Check Database

```bash
npm run db:studio
```

- Check `contacts` table
- Check `messages` table
- Should have new entries

### Step 6: Check App UI

1. Open: http://localhost:3000/dashboard/messages
2. Refresh page
3. Should see new contact and message

---

## Collect Debug Info

If still not working, collect this info:

### 1. Meta Configuration
- Screenshot: WhatsApp → Configuration → Webhook section
- Screenshot: WhatsApp → Configuration → Webhook fields section

### 2. Server Logs
```bash
npm run dev
# Send message from WhatsApp
# Copy all logs from terminal
```

### 3. Test Results
```bash
npm run check:meta
# Copy output

npm run test:webhook
# Copy output
```

### 4. Cloudflare Tunnel
- Tunnel URL: `https://your-domain.com`
- Tunnel status: Running/Stopped?

### 5. Database State
```bash
npm run db:studio
# Screenshot contacts table
# Screenshot messages table
# Screenshot labels table
```

With this info, we can pinpoint the exact issue.

---

## Quick Fix Checklist

Try these in order:

1. [ ] Restart dev server: `npm run dev`
2. [ ] Restart Cloudflare tunnel
3. [ ] Test webhook verification: `curl ...`
4. [ ] Check Meta webhook subscribed to "messages"
5. [ ] Regenerate access token
6. [ ] Run database seed: `npm run db:seed`
7. [ ] Test with script: `npm run test:webhook`
8. [ ] Send real message and check logs
9. [ ] Check database for new entries
10. [ ] Check app UI for new messages

If all checked and still not working, share debug info above.
