// Debug webhook - Check if webhook is receiving data
// Run this to test webhook verification and simulate incoming messages

const BASE_URL = process.env.WEBHOOK_URL || 'https://crm-wa.vercel.app'

console.log('🔍 WhatsApp Webhook Debugger\n')
console.log('Base URL:', BASE_URL)
console.log('─'.repeat(50))

// Test 1: Webhook Verification (GET)
async function testVerification() {
  console.log('\n1️⃣ Testing Webhook Verification (GET)...')
  
  const verifyToken = 'whatsapp_crm_webhook_secret_2024'
  const challenge = 'test_challenge_12345'
  const url = `${BASE_URL}/api/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=${verifyToken}&hub.challenge=${challenge}`

  console.log(url)
  
  try {
    const response = await fetch(url)
    const text = await response.text()
    
    if (response.ok && text === challenge) {
      console.log('✅ Verification PASSED')
      console.log('   Response:', text)
      return true
    } else {
      console.log('❌ Verification FAILED')
      console.log('   Expected:', challenge)
      console.log('   Got:', text)
      return false
    }
  } catch (error) {
    console.log('❌ Verification ERROR:', error.message)
    return false
  }
}

// Test 2: Incoming Text Message
async function testTextMessage() {
  console.log('\n2️⃣ Testing Text Message (POST)...')
  
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
            wa_id: '6285175434869'
          }],
          messages: [{
            from: '6285175434869',
            id: 'wamid.test_' + Date.now(),
            timestamp: Math.floor(Date.now() / 1000).toString(),
            type: 'text',
            text: {
              body: 'Halo, ini test message dari customer'
            }
          }]
        },
        field: 'messages'
      }]
    }]
  }
  
  try {
    const response = await fetch(`${BASE_URL}/api/webhook/whatsapp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ Text Message RECEIVED')
      console.log('   Response:', data)
      return true
    } else {
      console.log('❌ Text Message FAILED')
      console.log('   Status:', response.status)
      console.log('   Response:', data)
      return false
    }
  } catch (error) {
    console.log('❌ Text Message ERROR:', error.message)
    return false
  }
}

// Test 3: Incoming Image Message
async function testImageMessage() {
  console.log('\n3️⃣ Testing Image Message (POST)...')
  
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
            wa_id: '6285175434869'
          }],
          messages: [{
            from: '6285175434869',
            id: 'wamid.test_image_' + Date.now(),
            timestamp: Math.floor(Date.now() / 1000).toString(),
            type: 'image',
            image: {
              id: 'test_media_id_123',
              mime_type: 'image/jpeg',
              sha256: 'test_hash',
              caption: 'Test image caption'
            }
          }]
        },
        field: 'messages'
      }]
    }]
  }
  
  try {
    const response = await fetch(`${BASE_URL}/api/webhook/whatsapp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ Image Message RECEIVED')
      console.log('   Response:', data)
      return true
    } else {
      console.log('❌ Image Message FAILED')
      console.log('   Status:', response.status)
      console.log('   Response:', data)
      return false
    }
  } catch (error) {
    console.log('❌ Image Message ERROR:', error.message)
    return false
  }
}

// Test 4: Message Status Update
async function testStatusUpdate() {
  console.log('\n4️⃣ Testing Status Update (POST)...')
  
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
          statuses: [{
            id: 'wamid.test_123',
            status: 'delivered',
            timestamp: Math.floor(Date.now() / 1000).toString(),
            recipient_id: '6285175434869'
          }]
        },
        field: 'messages'
      }]
    }]
  }
  
  try {
    const response = await fetch(`${BASE_URL}/api/webhook/whatsapp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ Status Update RECEIVED')
      console.log('   Response:', data)
      return true
    } else {
      console.log('❌ Status Update FAILED')
      console.log('   Status:', response.status)
      console.log('   Response:', data)
      return false
    }
  } catch (error) {
    console.log('❌ Status Update ERROR:', error.message)
    return false
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n🚀 Starting webhook tests...\n')
  
  const results = {
    verification: await testVerification(),
    textMessage: await testTextMessage(),
    imageMessage: await testImageMessage(),
    statusUpdate: await testStatusUpdate()
  }
  
  console.log('\n' + '─'.repeat(50))
  console.log('📊 Test Results Summary:')
  console.log('─'.repeat(50))
  console.log('Verification:', results.verification ? '✅ PASS' : '❌ FAIL')
  console.log('Text Message:', results.textMessage ? '✅ PASS' : '❌ FAIL')
  console.log('Image Message:', results.imageMessage ? '✅ PASS' : '❌ FAIL')
  console.log('Status Update:', results.statusUpdate ? '✅ PASS' : '❌ FAIL')
  
  const passCount = Object.values(results).filter(r => r).length
  const totalCount = Object.keys(results).length
  
  console.log('\n' + '─'.repeat(50))
  console.log(`Total: ${passCount}/${totalCount} tests passed`)
  console.log('─'.repeat(50))
  
  if (passCount === totalCount) {
    console.log('\n🎉 All tests passed! Webhook is working correctly.')
    console.log('\n📝 Next steps:')
    console.log('1. Open Prisma Studio: npx prisma studio')
    console.log('2. Check contacts table for waId: 6285175434869')
    console.log('3. Check messages table for test messages')
    console.log('4. Open app: http://localhost:3000/dashboard/messages')
  } else {
    console.log('\n⚠️  Some tests failed. Check the errors above.')
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Make sure dev server is running: npm run dev')
    console.log('2. Check .env file has correct values')
    console.log('3. Check database connection')
    console.log('4. Check server logs for errors')
  }
}

// Run tests
runAllTests()
