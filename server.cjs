const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')
const express = require('express')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// Configuration CORS
server.use(cors({
    origin: true,
    credentials: true
}))

// Servir les fichiers statiques du build
server.use(express.static(path.join(__dirname, 'dist')))

// API routes
server.use('/api', router)

// Fallback pour SPA - servir index.html pour toutes les routes non-API
server.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'))
    }
})

const PORT = process.env.PORT || 5001

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📊 API: http://localhost:${PORT}/api`)
    console.log(`🌐 App: http://localhost:${PORT}`)
})
