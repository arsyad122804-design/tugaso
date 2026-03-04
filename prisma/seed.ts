import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Hash password yang sama untuk semua akun (password: "password123")
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Data akun perusahaan
  const users = [
    {
      email: 'ceo@perusahaan.com',
      password: hashedPassword,
      role: 'CEO',
      profile: {
        fotoProfil: null,
      }
    },
    {
      email: 'manager@perusahaan.com',
      password: hashedPassword,
      role: 'MANAGER',
      profile: {
        fotoProfil: null,
      }
    },
    {
      email: 'sekretaris@perusahaan.com',
      password: hashedPassword,
      role: 'SEKRETARIS',
      profile: {
        fotoProfil: null,
      }
    },
    {
      email: 'bendahara@perusahaan.com',
      password: hashedPassword,
      role: 'BENDAHARA',
      profile: {
        fotoProfil: null,
      }
    },
  ]

  // Create users dengan profile
  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        password: userData.password,
        role: userData.role as any,
        profile: {
          create: userData.profile
        }
      },
      include: {
        profile: true
      }
    })

    console.log(`✅ Created user: ${user.email} (${user.role})`)
  }

  console.log('🎉 Seed completed!')
  console.log('\n📋 Login credentials:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('CEO:')
  console.log('  Email: ceo@perusahaan.com')
  console.log('  Password: password123')
  console.log('\nManager:')
  console.log('  Email: manager@perusahaan.com')
  console.log('  Password: password123')
  console.log('\nSekretaris:')
  console.log('  Email: sekretaris@perusahaan.com')
  console.log('  Password: password123')
  console.log('\nBendahara:')
  console.log('  Email: bendahara@perusahaan.com')
  console.log('  Password: password123')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
