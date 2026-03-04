// Script untuk encode password untuk connection string
const password = process.argv[2]

if (!password) {
  console.log('Usage: node scripts/encode-password.js YOUR_PASSWORD')
  console.log('Example: node scripts/encode-password.js MyPass123!')
  process.exit(1)
}

const encoded = encodeURIComponent(password)

console.log('\n========================================')
console.log('Password Encoding Result')
console.log('========================================')
console.log('\nOriginal password:', password)
console.log('Encoded password:', encoded)
console.log('\n========================================')
console.log('Copy encoded password ke .env Anda')
console.log('========================================\n')
