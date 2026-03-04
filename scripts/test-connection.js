const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  console.log('🔍 Testing database connection...\n')
  
  try {
    // Test query
    await prisma.$queryRaw`SELECT 1 as test`
    
    console.log('✅ Database connection successful!')
    console.log('✅ Credentials are correct!')
    console.log('\n📊 Database info:')
    
    // Get database version
    const result = await prisma.$queryRaw`SELECT version()`
    console.log('   PostgreSQL version:', result[0].version.split(' ')[0], result[0].version.split(' ')[1])
    
    console.log('\n✨ You can now run:')
    console.log('   npx prisma db push')
    console.log('   npm run db:seed')
    
  } catch (error) {
    console.log('❌ Database connection failed!\n')
    
    if (error.code === 'P1000') {
      console.log('🔴 Error: Authentication failed')
      console.log('\n💡 Possible solutions:')
      console.log('   1. Check your password in DATABASE_URL')
      console.log('   2. Make sure password has no brackets [ ]')
      console.log('   3. Reset database password in Supabase Dashboard')
      console.log('   4. Check if DATABASE_URL format is correct')
      console.log('\n📝 Current DATABASE_URL format should be:')
      console.log('   postgresql://postgres.PROJECT_REF:PASSWORD@HOST:6543/postgres?...')
      
    } else if (error.code === 'P1001') {
      console.log('🔴 Error: Cannot reach database server')
      console.log('\n💡 Possible solutions:')
      console.log('   1. Check your internet connection')
      console.log('   2. Check if Supabase project is active')
      console.log('   3. Verify the host URL is correct')
      
    } else {
      console.log('🔴 Error:', error.message)
      console.log('\n💡 Error code:', error.code || 'Unknown')
    }
    
    console.log('\n📖 Read GET_SUPABASE_KEYS.md for detailed instructions')
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
