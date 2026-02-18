// Check Meta WhatsApp Business API Configuration
// This script helps verify your WABA setup

require('dotenv').config()

const PHONE_NUMBER_ID = process.env.WABA_PHONE_NUMBER_ID
const ACCESS_TOKEN = process.env.WABA_ACCESS_TOKEN

console.log('🔍 Meta WABA Configuration Checker\n')
console.log('─'.repeat(60))

// Check environment variables
function checkEnvVars() {
  console.log('\n1️⃣ Checking Environment Variables...\n')
  
  const vars = {
    'WABA_PHONE_NUMBER_ID': PHONE_NUMBER_ID,
    'WABA_ACCESS_TOKEN': ACCESS_TOKEN,
    'WABA_WEBHOOK_VERIFY_TOKEN': process.env.WABA_WEBHOOK_VERIFY_TOKEN,
  }
  
  let allPresent = true
  
  for (const [key, value] of Object.entries(vars)) {
    if (value) {
      const masked = key === 'WABA_ACCESS_TOKEN' 
        ? value.substring(0, 20) + '...' + value.substring(value.length - 10)
        : value
      console.log(`✅ ${key}: ${masked}`)
    } else {
      console.log(`❌ ${key}: NOT SET`)
      allPresent = false
    }
  }
  
  return allPresent
}

// Check access token validity
async function checkAccessToken() {
  console.log('\n2️⃣ Checking Access Token Validity...\n')
  
  if (!ACCESS_TOKEN) {
    console.log('❌ Access token not set')
    return false
  }
  
  try {
    const response = await fetch(`https://graph.facebook.com/v21.0/me?access_token=${ACCESS_TOKEN}`)
    const data = await response.json()
    
    if (response.ok && data.id) {
      console.log('✅ Access token is VALID')
      console.log('   App ID:', data.id)
      console.log('   App Name:', data.name || 'N/A')
      return true
    } else {
      console.log('❌ Access token is INVALID')
      console.log('   Error:', data.error?.message || 'Unknown error')
      console.log('\n💡 Solution: Generate a new System User token')
      console.log('   See TROUBLESHOOTING.md for instructions')
      return false
    }
  } catch (error) {
    console.log('❌ Error checking token:', error.message)
    return false
  }
}

// Check phone number configuration
async function checkPhoneNumber() {
  console.log('\n3️⃣ Checking Phone Number Configuration...\n')
  
  if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
    console.log('❌ Missing phone number ID or access token')
    return false
  }
  
  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}?access_token=${ACCESS_TOKEN}`
    )
    const data = await response.json()
    
    if (response.ok && data.id) {
      console.log('✅ Phone number is VALID')
      console.log('   Phone Number ID:', data.id)
      console.log('   Display Number:', data.display_phone_number || 'N/A')
      console.log('   Verified Name:', data.verified_name || 'N/A')
      console.log('   Quality Rating:', data.quality_rating || 'N/A')
      return true
    } else {
      console.log('❌ Phone number is INVALID')
      console.log('   Error:', data.error?.message || 'Unknown error')
      return false
    }
  } catch (error) {
    console.log('❌ Error checking phone number:', error.message)
    return false
  }
}

// Check webhook subscription
async function checkWebhookSubscription() {
  console.log('\n4️⃣ Checking Webhook Subscription...\n')
  
  if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
    console.log('❌ Missing phone number ID or access token')
    return false
  }
  
  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/subscribed_apps?access_token=${ACCESS_TOKEN}`
    )
    const data = await response.json()
    
    if (response.ok && data.data) {
      if (data.data.length > 0) {
        console.log('✅ Webhook is SUBSCRIBED')
        data.data.forEach(app => {
          console.log('   App ID:', app.id)
          console.log('   Subscribed Fields:', app.subscribed_fields?.join(', ') || 'N/A')
        })
        return true
      } else {
        console.log('⚠️  No webhook subscription found')
        console.log('\n💡 Action needed:')
        console.log('   1. Go to Meta Developer Console')
        console.log('   2. WhatsApp → Configuration')
        console.log('   3. Add webhook URL and verify')
        return false
      }
    } else {
      console.log('❌ Error checking webhook subscription')
      console.log('   Error:', data.error?.message || 'Unknown error')
      return false
    }
  } catch (error) {
    console.log('❌ Error checking webhook:', error.message)
    return false
  }
}

// Test sending a message
async function testSendMessage() {
  console.log('\n5️⃣ Testing Send Message API...\n')
  
  console.log('⚠️  Skipping actual send test to avoid charges')
  console.log('   To test manually, use: node test-send-message.js')
  
  return true
}

// Main function
async function runChecks() {
  console.log('🚀 Starting configuration checks...\n')
  
  const results = {
    envVars: checkEnvVars(),
    accessToken: await checkAccessToken(),
    phoneNumber: await checkPhoneNumber(),
    webhook: await checkWebhookSubscription(),
    sendMessage: await testSendMessage()
  }
  
  console.log('\n' + '─'.repeat(60))
  console.log('📊 Configuration Check Summary:')
  console.log('─'.repeat(60))
  console.log('Environment Variables:', results.envVars ? '✅ PASS' : '❌ FAIL')
  console.log('Access Token:', results.accessToken ? '✅ PASS' : '❌ FAIL')
  console.log('Phone Number:', results.phoneNumber ? '✅ PASS' : '❌ FAIL')
  console.log('Webhook Subscription:', results.webhook ? '✅ PASS' : '⚠️  WARNING')
  
  const criticalChecks = [results.envVars, results.accessToken, results.phoneNumber]
  const allCriticalPass = criticalChecks.every(r => r)
  
  console.log('\n' + '─'.repeat(60))
  
  if (allCriticalPass && results.webhook) {
    console.log('🎉 All checks passed! Your WABA is configured correctly.')
    console.log('\n📝 Next steps:')
    console.log('1. Test webhook locally: node debug-webhook.js')
    console.log('2. Test with ngrok if needed')
    console.log('3. Send a real message from WhatsApp to test')
  } else if (allCriticalPass && !results.webhook) {
    console.log('⚠️  Basic config is OK, but webhook needs setup.')
    console.log('\n📝 Next steps:')
    console.log('1. Setup ngrok: ngrok http 3000')
    console.log('2. Register webhook URL in Meta Developer Console')
    console.log('3. Verify webhook with your verify token')
    console.log('4. Subscribe to "messages" field')
  } else {
    console.log('❌ Some critical checks failed.')
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Check .env file has all required values')
    console.log('2. Generate new System User token (see TROUBLESHOOTING.md)')
    console.log('3. Verify phone number ID is correct')
    console.log('4. Check Meta Developer Console for errors')
  }
  
  console.log('\n📚 For detailed help, see: TROUBLESHOOTING.md')
  console.log('─'.repeat(60))
}

// Run all checks
runChecks().catch(console.error)
