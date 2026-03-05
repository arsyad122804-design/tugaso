# Generate PWA Icons

Untuk membuat aplikasi bisa diinstall, Anda perlu membuat icon PNG dengan ukuran:

## Cara 1: Menggunakan Online Tool
1. Buka https://realfavicongenerator.net/ atau https://www.pwabuilder.com/imageGenerator
2. Upload logo perusahaan atau gunakan icon.svg yang sudah ada
3. Generate icon dengan ukuran:
   - 192x192 pixels → simpan sebagai `public/icon-192.png`
   - 512x512 pixels → simpan sebagai `public/icon-512.png`

## Cara 2: Menggunakan Canva
1. Buka Canva.com
2. Buat design dengan ukuran 512x512 pixels
3. Tambahkan background biru (#3B82F6)
4. Tambahkan text "SR" atau logo perusahaan
5. Download sebagai PNG
6. Resize ke 192x192 untuk icon kecil

## Cara 3: Menggunakan Figma/Photoshop
1. Buat artboard 512x512 pixels
2. Background: #3B82F6 (biru)
3. Tambahkan logo atau text "SR" warna putih
4. Export sebagai PNG:
   - icon-512.png (512x512)
   - icon-192.png (192x192)

## Setelah Icon Dibuat:
1. Letakkan file di folder `public/`
2. Deploy ulang aplikasi
3. Buka di browser mobile
4. Akan muncul prompt "Install App" atau "Add to Home Screen"

## Test PWA:
1. Buka Chrome DevTools
2. Tab "Application" → "Manifest"
3. Pastikan semua icon terdeteksi
4. Tab "Service Workers" → pastikan SW aktif
