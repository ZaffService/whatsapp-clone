const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// Configuration CORS
server.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Middleware pour parser le JSON
server.use(jsonServer.bodyParser)

// Middleware personnalisé pour les messages
server.use((req, res, next) => {
    // Log des requêtes pour debug
    console.log(`${req.method} ${req.path}`, req.query)
  
    // Ajouter un ID automatique pour les nouveaux messages
    if (req.method === 'POST' && req.path === '/api/messages') {
      req.body.id = Date.now()
      req.body.timestamp = new Date().toISOString()
      req.body.status = 'sent'
    }
  
    next()
})

// Servir les fichiers statiques
server.use(jsonServer.defaults.static(path.join(__dirname, 'dist')))

// Routes API
server.use('/api', router)

// Fallback pour SPA
server.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'))
    }
})

const PORT = process.env.PORT || 10000

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📊 API: http://localhost:${PORT}/api`)
    console.log(`🌐 App: http://localhost:${PORT}`)
    console.log(`📋 Available routes:`)
    console.log(`   GET /api/users`)
    console.log(`   GET /api/messages`)
    console.log(`   POST /api/messages`)
    console.log(`   GET /api/chats`)
})
