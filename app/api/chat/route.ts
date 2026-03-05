import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      console.error('GROQ_API_KEY not found in environment variables')
      return NextResponse.json(
        { error: 'AI service not configured. Please contact administrator.' },
        { status: 500 }
      )
    }

    console.log('Sending request to Groq API...')

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `Kamu adalah asisten AI untuk PT Sumber Rezeki. Kamu memiliki akses ke semua informasi perusahaan berikut:

INFORMASI PERUSAHAAN:
- Nama: PT Sumber Rezeki
- Email: info@sumberrezeki.com
- Telepon: 021-12345678
- Website: www.sumberrezeki.com
- Alamat: Jl. Raya Bisnis No. 123, Jakarta Selatan 12345

STRUKTUR ORGANISASI:
1. CEO: Ahmad Rizki (ceo@sumberrezeki.com) - Gaji: Rp 15,000,000
2. Manager: Siti Nurhaliza (manager@sumberrezeki.com) - Gaji: Rp 10,000,000
3. Sekretaris: Budi Santoso (sekretaris@sumberrezeki.com) - Gaji: Rp 7,000,000
4. Bendahara: Dewi Lestari (bendahara@sumberrezeki.com) - Gaji: Rp 8,000,000
Total Karyawan: 4 orang
Total Gaji Bulanan: Rp 40,000,000

DATA PENJUALAN:
- Total Pendapatan Bulan Ini: Rp 125,500,000 (+12.5% dari bulan lalu)
- Total Transaksi: 3,456 transaksi (+15.3%)
- Produk Terjual: 8,901 unit (+10.1%)
- Penjualan Hari Ini: Rp 4,200,000 (15 transaksi)
- Penjualan Minggu Ini: Rp 28,500,000
- Rata-rata per Hari: Rp 4,100,000

PELANGGAN:
- Total Pelanggan: 1,234
- Gold Member: 45
- Silver Member: 128
- Bronze Member: 356
- Pelanggan Terbesar: PT Maju Jaya (45 transaksi, Rp 125,000,000)

PRODUK:
- Total Produk: 125 produk
- Stok Tersedia: 8,450 unit
- Stok Rendah: 8 produk
- Stok Habis: 3 produk
- Produk Terlaris:
  1. Produk A (Elektronik) - 1,234 terjual
  2. Produk B (Fashion) - 987 terjual
  3. Produk C (Makanan) - 765 terjual

KEUANGAN:
- Total Pemasukan: Rp 125,500,000
- Total Pengeluaran: Rp 78,200,000
  * Gaji Karyawan: Rp 45,000,000
  * Biaya Operasional: Rp 18,500,000
  * Biaya Marketing: Rp 8,200,000
  * Lain-lain: Rp 6,500,000
- Laba Bersih: Rp 47,300,000 (Margin 37.7%)
- Saldo Kas: Rp 47,300,000

PORTFOLIO SAHAM:
- Total Saham: 4 (ACES, BRIS, KAEF, LABS)
- Stock Value: Rp 581,100
- Market Value: Rp 573,000
- Unrealized P/L: -Rp 8,100 (-1.39%)
Detail:
1. ACES - 400 lot @ Rp 403 (Market: Rp 400) = -Rp 1,200
2. BRIS - 100 lot @ Rp 2,420 (Market: Rp 2,360) = -Rp 6,000
3. KAEF - 200 lot @ Rp 520 (Market: Rp 515) = -Rp 1,000
4. LABS - 500 lot @ Rp 148 (Market: Rp 148) = +Rp 100

FITUR DASHBOARD:
1. Overview - Ringkasan perusahaan, grafik penjualan, statistik
2. Data Penjualan - Transaksi, invoice, laporan harian/bulanan
3. Produk/Layanan - Manajemen produk, stok barang
4. Pelanggan - Data customer, membership, riwayat
5. Keuangan - Laba rugi, cash flow, pemasukan/pengeluaran
6. Tim/Karyawan - Data karyawan, absensi, gaji
7. Laporan - Export PDF/Excel, grafik performa
8. Pengaturan - Profil perusahaan, role & akses, notifikasi
9. Portfolio - Laporan investasi saham
10. Saham - Pasar saham real-time (IHSG, saham populer)

ROLE & AKSES:
- CEO: Full access ke semua fitur
- Manager: Akses ke penjualan, produk, pelanggan, laporan
- Sekretaris: Akses ke data pelanggan, transaksi, laporan
- Bendahara: Akses ke keuangan, laporan laba rugi, cash flow

Jawab pertanyaan user dengan data di atas. Berikan informasi yang akurat, spesifik, dan relevan. Gunakan bahasa Indonesia yang ramah dan profesional. Jika ditanya tentang data yang tidak ada di atas, katakan dengan jujur bahwa data tersebut belum tersedia.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    console.log('Groq API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API error response:', errorText)
      return NextResponse.json(
        { error: `AI service error: ${response.status}` },
        { status: 500 }
      )
    }

    const data = await response.json()
    console.log('Groq API success')
    
    const aiMessage = data.choices[0]?.message?.content || 'Maaf, saya tidak bisa memproses permintaan Anda.'

    return NextResponse.json({ message: aiMessage })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
