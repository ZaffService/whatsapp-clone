const { execSync } = require('child_process')
const fs = require('fs')

console.log('🚀 Starting deployment process...')

try {
  // Build du projet
  console.log('📦 Building project...')
  execSync('npm run build', { stdio: 'inherit' })

  // Vérifier que le build existe
  if (!fs.existsSync('dist')) {
    throw new Error('Build directory not found!')
  }

  console.log('✅ Build completed successfully!')
  console.log('🌐 Ready for deployment to Render')
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message)
  process.exit(1)
}