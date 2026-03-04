# 📈 Setup Stock API Real-Time

## ✅ Yang Sudah Dibuat:

### 1. **Stock API Library** (`lib/stock-api.ts`)
Fungsi untuk fetch data saham real-time dari Yahoo Finance API:
- `fetchStockPrice()` - Ambil harga 1 saham
- `fetchMultipleStocks()` - Ambil harga multiple saham sekaligus
- `fetchIHSG()` - Ambil data Indeks Harga Saham Gabungan
- `fetchStockNews()` - Ambil berita saham terbaru

### 2. **Dashboard Real-Time** (`app/dashboard/page-realtime.tsx`)
Dashboard dengan data yang update otomatis setiap 60 detik

## 🚀 Cara Menggunakan:

### Opsi 1: Ganti Dashboard Existing

Rename file dashboard:
```bash
# Backup dashboard lama
mv app/dashboard/page.tsx app/dashboard/page-old.tsx

# Gunakan dashboard real-time
mv app/dashboard/page-realtime.tsx app/dashboard/page.tsx
```

### Opsi 2: Test Dulu di Route Baru

Buat route baru untuk testing:
```bash
# Dashboard real-time bisa diakses di /dashboard-realtime
mkdir app/dashboard-realtime
mv app/dashboard/page-realtime.tsx app/dashboard-realtime/page.tsx
```

## 📊 Fitur Real-Time:

### ✅ **Auto Update Setiap 60 Detik**
- Harga saham update otomatis
- IHSG update otomatis
- Berita update otomatis

### ✅ **Data yang Di-fetch:**
- **Harga Saham**: ACES, BRIS, KAEF, LABS
- **IHSG**: Indeks pasar
- **Berita**: Dari CNBC Indonesia

### ✅ **Perhitungan Otomatis:**
- Market Value (harga real-time × lot)
- Unrealized P/L (profit/loss belum terealisasi)
- Total Portfolio Value

## 🔧 Kustomisasi:

### Ubah Saham yang Di-track:

Edit di `app/dashboard/page.tsx`:

```typescript
const portfolioData = [
  {
    no: 1,
    stock: 'BBCA-Bank BCA Tbk',
    symbol: 'BBCA',  // Ganti dengan kode saham Anda
    lotBalance: 100,  // Jumlah lot yang Anda punya
    avgPrice: 9850,   // Harga beli rata-rata
  },
  // Tambah saham lain...
]
```

### Ubah Interval Update:

```typescript
export const revalidate = 30 // Ganti 60 jadi 30 untuk update setiap 30 detik
```

## 🌐 API yang Digunakan:

### 1. **Yahoo Finance API** (FREE)
- Endpoint: `https://query1.finance.yahoo.com`
- Data: Harga saham real-time
- Format: `SYMBOL.JK` (contoh: BBCA.JK)
- Rate Limit: Unlimited (tapi jangan spam)

### 2. **RSS2JSON API** (FREE)
- Endpoint: `https://api.rss2json.com`
- Data: Berita dari RSS feed
- Source: CNBC Indonesia
- Rate Limit: 10,000 requests/day

## ⚠️ Catatan Penting:

### **Delay Data:**
- Yahoo Finance API punya delay ~15 menit untuk data gratis
- Untuk data real-time tanpa delay, perlu API berbayar

### **Alternatif API (Jika Yahoo Finance Tidak Work):**

1. **Alpha Vantage** (Free tier: 5 calls/minute)
   ```
   https://www.alphavantage.co/
   ```

2. **Finnhub** (Free tier: 60 calls/minute)
   ```
   https://finnhub.io/
   ```

3. **IEX Cloud** (Free tier: 50,000 calls/month)
   ```
   https://iexcloud.io/
   ```

## 🔐 Jika Butuh API Key:

Tambahkan di `.env`:
```env
STOCK_API_KEY=your_api_key_here
```

Lalu gunakan di `lib/stock-api.ts`:
```typescript
const apiKey = process.env.STOCK_API_KEY
```

## 🧪 Testing:

1. **Jalankan dev server:**
   ```bash
   npm run dev
   ```

2. **Buka dashboard:**
   ```
   http://localhost:3000/dashboard
   ```

3. **Cek console untuk error:**
   - Buka DevTools (F12)
   - Lihat tab Console
   - Lihat tab Network untuk API calls

## 📱 Next Steps:

### **Untuk Production:**

1. **Simpan Portfolio di Database**
   - Buat tabel `portfolios` di Prisma
   - Setiap user punya portfolio sendiri

2. **Add/Edit/Delete Saham**
   - Form untuk tambah saham baru
   - Form untuk update jumlah lot
   - Button untuk hapus saham

3. **Notifikasi Real-Time**
   - WebSocket untuk push notification
   - Alert jika harga naik/turun X%

4. **Historical Data**
   - Simpan history harga
   - Chart dengan data historis

Mau saya buatkan fitur-fitur di atas? 🚀
