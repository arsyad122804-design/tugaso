# Setup Database Perusahaan

## Role yang Tersedia

Sistem ini memiliki 4 role untuk perusahaan:

1. **CEO** - Chief Executive Officer (Direktur Utama)
2. **MANAGER** - Manager
3. **SEKRETARIS** - Sekretaris
4. **BENDAHARA** - Bendahara

## Langkah Setup Database

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Pastikan file `.env` sudah terisi dengan benar (copy dari `.env.example`):

```env
DATABASE_URL='postgresql://...'
DIRECT_URL='postgresql://...'
NEXT_PUBLIC_SUPABASE_URL='https://...'
NEXT_PUBLIC_SUPABASE_ANON_KEY='...'
SUPABASE_SERVICE_ROLE_KEY='...'
SESSION_SECRET='your-secret-key'
REGISTRATION_TOKEN='your-registration-token'
```

### 3. Generate Prisma Client

```bash
npm run db:generate
```

### 4. Push Schema ke Database

```bash
npm run db:push
```

### 5. Seed Data (Buat Akun Default)

```bash
npm run db:seed
```

Atau jika ingin reset database dan seed ulang:

```bash
npm run db:reset
```

## Akun Default yang Dibuat

Setelah menjalankan seed, akan ada 4 akun:

### 1. CEO
- **Email**: `ceo@perusahaan.com`
- **Password**: `password123`
- **Role**: CEO

### 2. Manager
- **Email**: `manager@perusahaan.com`
- **Password**: `password123`
- **Role**: MANAGER

### 3. Sekretaris
- **Email**: `sekretaris@perusahaan.com`
- **Password**: `password123`
- **Role**: SEKRETARIS

### 4. Bendahara
- **Email**: `bendahara@perusahaan.com`
- **Password**: `password123`
- **Role**: BENDAHARA

## Cara Login

1. Jalankan aplikasi: `npm run dev`
2. Buka browser: `http://localhost:3000/login`
3. Login dengan salah satu akun di atas

## Troubleshooting

### Error: "tsx not found"

Install tsx secara global atau lokal:

```bash
npm install -D tsx
```

### Error: "bcryptjs not found"

Install bcryptjs:

```bash
npm install bcryptjs
npm install -D @types/bcryptjs
```

### Database Connection Error

Pastikan:
1. Supabase project sudah aktif
2. DATABASE_URL dan DIRECT_URL sudah benar
3. IP address Anda sudah di-whitelist di Supabase (atau set ke 0.0.0.0/0 untuk development)

## Prisma Studio

Untuk melihat data di database secara visual:

```bash
npm run db:studio
```

Akan membuka Prisma Studio di browser pada `http://localhost:5555`
