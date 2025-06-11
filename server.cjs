const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')
const express = require('express')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Configuration CORS
server.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Servir les fichiers statiques du build
server.use(express.static(path.join(__dirname, 'dist')))

// Middlewares par défaut de JSON Server
server.use(middlewares)

// Routes API avec préfixe /api
server.use('/api', router)

// Servir l'application React pour toutes les autres routes
server.get('*', (req, res) => {
    // Si c'est une route API, laisser JSON Server gérer
    if (req.path.startsWith('/api')) {
      return router(req, res)
    }
    // Sinon, servir l'index.html
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 5001

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📱 Frontend: http://localhost:${PORT}`)
    console.log(`🔌 API: http://localhost:${PORT}/api`)
})
