// Test Webhook Verification untuk Vercel
// Jalankan: node test-webhook-vercel.js

const VERCEL_URL = 'https://crm-wa.vercel.app'
const VERIFY_TOKEN = 'whatsapp_crm_webhook_secret_2024'

console.log('🔍 Testing WhatsApp Webhook di Vercel\n')
console.log('URL:', VERCEL_URL)
console.log('Verify Token:', VERIFY_TOKEN)
console.log('─'.repeat(60))

async function testWebhookVerification() {
  console.log('\n1️⃣ Testing Webhook Verification...\n')
  
  const challenge = 'test_challenge_' + Date.now()
  const url = `${VERCEL_URL}/api/webhook?hub.mode=subscribe&hub.verify_token=${VERIFY_TOKEN}&hub.challenge=${challenge}`
  
  console.log('Testing URL:')
  console.log(url)
  console.log()
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Meta-WhatsApp-Webhook-Test'
      }
    })
    
    const text = await response.text()
    
    console.log('Response Status:', response.status)
    console.log('Response Body:', text)
    console.log()
    
    if (response.status === 200 && text === challenge) {
      console.log('✅ WEBHOOK VERIFICATION BERHASIL!')
      console.log()
      console.log('📋 Gunakan konfigurasi ini di Meta:')
      console.log('─'.repeat(60))
      console.log('Callback URL:')
      console.log(`${VERCEL_URL}/api/webhook`)
      console.log()
      console.log('Verify Token:')
      console.log(VERIFY_TOKEN)
      console.log('─'.repeat(60))
      return true
    } else {
      console.log('❌ WEBHOOK VERIFICATION GAGAL!')
      console.log()
      console.log('Expected challenge:', challenge)
      console.log('Got response:', text)
      console.log()
      console.log('🔧 Troubleshooting:')
      console.log('1. Pastikan app sudah di-deploy ke Vercel')
      console.log('2. Cek environment variables di Vercel dashboard')
      console.log('3. Pastikan WABA_WEBHOOK_VERIFY_TOKEN sudah di-set')
      return false
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message)
    console.log()
    console.log('🔧 Troubleshooting:')
    console.log('1. Pastikan URL Vercel benar')
    console.log('2. Cek koneksi internet')
    console.log('3. Cek apakah app sudah di-deploy')
    return false
  }
}

async function testWebhookPost() {
  console.log('\n2️⃣ Testing Webhook POST (Simulate incoming message)...\n')
  
  const payload = {
    object: 'whatsapp_business_account',
    entry: [{
      id: 'WHATSAPP_BUSINESS_ACCOUNT_ID',
      changes: [{
        value: {
          messaging_product: 'whatsapp',
          metadata: {
            display_phone_number: '15550000000',
            phone_number_id: '988128274384219'
          },
          contacts: [{
            profile: {
              name: 'Test Customer'
            },
            wa_id: '6281234567890'
          }],
          messages: [{
            from: '6281234567890',
            id: 'wamid.test_' + Date.now(),
            timestamp: Math.floor(Date.now() / 1000).toString(),
            type: 'text',
            text: {
              body: 'Test message dari Vercel'
            }
          }]
        },
        field: 'messages'
      }]
    }]
  }
  
  try {
    const response = await fetch(`${VERCEL_URL}/api/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Meta-WhatsApp-Webhook'
      },
      body: JSON.stringify(payload)
    })
    
    const data = await response.json()
    
    console.log('Response Status:', response.status)
    console.log('Response Body:', JSON.stringify(data, null, 2))
    console.log()
    
    if (response.status === 200) {
      console.log('✅ WEBHOOK POST BERHASIL!')
      console.log('Message berhasil diterima dan diproses')
      return true
    } else {
      console.log('❌ WEBHOOK POST GAGAL!')
      return false
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message)
    return false
  }
}

async function runTests() {
  const verificationOk = await testWebhookVerification()
  
  if (verificationOk) {
    await testWebhookPost()
  }
  
  console.log('\n' + '─'.repeat(60))
  console.log('📝 Langkah selanjutnya:')
  console.log('─'.repeat(60))
  console.log('1. Buka Meta Developer Console')
  console.log('2. Pilih app WhatsApp Anda')
  console.log('3. Ke Configuration > Webhook')
  console.log('4. Klik "Edit" di Callback URL')
  console.log('5. Masukkan:')
  console.log(`   URL: ${VERCEL_URL}/api/webhook`)
  console.log(`   Token: ${VERIFY_TOKEN}`)
  console.log('6. Klik "Verify and Save"')
  console.log('7. Subscribe ke "messages" event')
  console.log('─'.repeat(60))
}

runTests()
