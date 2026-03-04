# Dashboard Perusahaan - Next.js

Template dashboard untuk sistem manajemen perusahaan dengan 4 role berbeda.

## 🏢 Role Perusahaan

Sistem ini memiliki 4 role untuk struktur organisasi perusahaan:

| Role | Deskripsi | Email Default |
|------|-----------|---------------|
| **CEO** | Chief Executive Officer (Direktur Utama) | ceo@perusahaan.com |
| **MANAGER** | Manager | manager@perusahaan.com |
| **SEKRETARIS** | Sekretaris | sekretaris@perusahaan.com |
| **BENDAHARA** | Bendahara | bendahara@perusahaan.com |

**Password default untuk semua akun**: `password123`

## 🚀 Quick Setup

### Cara Cepat (Windows)

Jalankan script otomatis:

```bash
scripts\setup-database.bat
```

Script ini akan:
1. Install dependencies
2. Generate Prisma Client
3. Push schema ke database
4. Seed data dengan 4 akun default

### Cara Manual

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment variables**
   
   Copy `.env.example` ke `.env` dan isi dengan credentials Supabase Anda:
   ```env
   DATABASE_URL='postgresql://...'
   DIRECT_URL='postgresql://...'
   NEXT_PUBLIC_SUPABASE_URL='https://...'
   NEXT_PUBLIC_SUPABASE_ANON_KEY='...'
   SUPABASE_SERVICE_ROLE_KEY='...'
   SESSION_SECRET='your-secret-key'
   REGISTRATION_TOKEN='your-registration-token'
   ```

3. **Generate Prisma Client**
   ```bash
   npm run db:generate
   ```

4. **Push schema ke database**
   ```bash
   npm run db:push
   ```

5. **Seed database dengan akun default**
   ```bash
   npm run db:seed
   ```

6. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```

7. **Buka browser**
   ```
   http://localhost:3000/login
   ```

## 📋 Akun Default

Setelah setup, Anda bisa login dengan akun berikut:

### CEO
- Email: `ceo@perusahaan.com`
- Password: `password123`
- Role: CEO

### Manager
- Email: `manager@perusahaan.com`
- Password: `password123`
- Role: MANAGER

### Sekretaris
- Email: `sekretaris@perusahaan.com`
- Password: `password123`
- Role: SEKRETARIS

### Bendahara
- Email: `bendahara@perusahaan.com`
- Password: `password123`
- Role: BENDAHARA

## 🛠️ Commands

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm run start` | Jalankan production server |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema ke database |
| `npm run db:seed` | Seed database dengan data default |
| `npm run db:reset` | Reset database dan seed ulang |
| `npm run db:studio` | Buka Prisma Studio |

## 🎨 Features

- ✅ Authentication dengan 4 role perusahaan
- ✅ Protected dashboard routes
- ✅ Session management dengan JWT
- ✅ User profile management
- ✅ Upload foto profil ke Supabase Storage
- ✅ Responsive design
- ✅ Tema Ramadhan di halaman login

## 🗄️ Database Schema

```prisma
enum Role {
  CEO
  MANAGER
  SEKRETARIS
  BENDAHARA
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(MANAGER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  profile   Profile?
}

model Profile {
  id         String   @id @default(uuid())
  userId     String   @unique
  fotoProfil String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  user       User     @relation(...)
}
```

## 📚 Dokumentasi Lengkap

- [DATABASE_SETUP.md](DATABASE_SETUP.md) - Panduan setup database lengkap
- [docs/](docs/) - Dokumentasi lainnya

## 🔧 Troubleshooting

### Error: "tsx not found"
```bash
npm install -D tsx
```

### Error: Database connection failed
Pastikan:
1. Supabase project sudah aktif
2. DATABASE_URL dan DIRECT_URL sudah benar
3. IP address sudah di-whitelist di Supabase

### Ingin reset database?
```bash
npm run db:reset
```

## 📝 Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Prisma ORM
- Supabase (PostgreSQL + Storage)
- Tailwind CSS
- shadcn/ui
- bcryptjs
- jose (JWT)

## 🌙 Special Features

Halaman login memiliki tema Ramadhan dengan:
- Bulan sabit yang bercahaya
- Bintang berkelap-kelip
- Masjid dengan lampu-lampu
- Partikel cahaya interaktif
- Custom cursor dengan efek trail

---

**Dibuat untuk sistem manajemen perusahaan** 🏢
