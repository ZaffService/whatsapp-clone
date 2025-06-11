// Configuration d'environnement
const isDevelopment = import.meta.env.DEV
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://whatsapp-clone-1-i0na.onrender.com/api'
  : 'http://localhost:5001/api'

class APIClient {
  constructor() {
    this.baseURL = API_BASE_URL
    this.isOnline = true
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      console.log(`🔄 API Request: ${config.method || 'GET'} ${url}`)
      
      const response = await fetch(url, config)
      
      // Vérifier le type de contenu
      const contentType = response.headers.get('content-type')
      
      if (!response.ok) {
        // Si c'est une 404, l'endpoint n'existe peut-être pas
        if (response.status === 404) {
          console.warn(`⚠️ Endpoint non trouvé: ${endpoint}`)
          // Retourner des données par défaut selon l'endpoint
          return this.getDefaultData(endpoint)
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // Vérifier si c'est du JSON
      if (!contentType || !contentType.includes('application/json')) {
        console.warn(`⚠️ Réponse non-JSON reçue pour ${endpoint}`)
        return this.getDefaultData(endpoint)
      }

      const data = await response.json()
      console.log(`✅ API Response:`, data)
      this.isOnline = true
      
      return data
    } catch (error) {
      console.error(`❌ API Error [${config.method || 'GET'}] ${endpoint}:`, error.message)
      this.isOnline = false
      
      // Retourner des données par défaut en cas d'erreur
      return this.getDefaultData(endpoint, options.body ? JSON.parse(options.body) : null)
    }
  }

  // Données par défaut en cas d'erreur API
  getDefaultData(endpoint, requestData = null) {
    console.log(`🔄 Mode hors ligne - données par défaut pour: ${endpoint}`)
    
    if (endpoint.includes('/users')) {
      if (endpoint.includes('/users/') && requestData) {
        // PATCH/PUT sur un utilisateur spécifique
        return { id: endpoint.split('/').pop(), ...requestData, updated: true }
      }
      return [
        { id: 1, name: "Zafe", phone: "777867740", status: "online", lastSeen: new Date().toISOString() },
        { id: 2, name: "Abdallah", phone: "778123456", status: "offline", lastSeen: new Date().toISOString() },
        { id: 3, name: "Ousmane Marra", phone: "776543210", status: "online", lastSeen: new Date().toISOString() }
      ]
    }
    
    if (endpoint.includes('/chats')) {
      return [
        {
          id: 1,
          participants: [1, 2],
          messages: [],
          lastMessage: null,
          updatedAt: new Date().toISOString()
        }
      ]
    }
    
    if (endpoint.includes('/messages')) {
      return []
    }
    
    if (endpoint.includes('/calls')) {
      return []
    }
    
    if (endpoint.includes('/notifications')) {
      return []
    }
    
    if (endpoint.includes('/status')) {
      return []
    }
    
    // Par défaut, retourner un objet vide ou un tableau
    return Array.isArray(requestData) ? [] : {}
  }

  get(endpoint) {
    return this.request(endpoint)
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    })
  }
}

const API = new APIClient()

// ===== USERS =====
export const getUsers = () => API.get('/users')
export const getUser = (userId) => API.get(`/users/${userId}`)
export const createUser = (userData) => API.post('/users', userData)
export const updateUser = (userId, data) => API.patch(`/users/${userId}`, data)
export const updateUserStatus = async (userId, status) => {
  try {
    const result = await API.patch(`/users/${userId}`, { 
      status, 
      lastSeen: new Date().toISOString() 
    })
    console.log(`✅ Statut utilisateur ${userId} mis à jour: ${status}`)
    return result
  } catch (error) {
    console.warn(`⚠️ Impossible de mettre à jour le statut utilisateur ${userId}`)
    return { id: userId, status, lastSeen: new Date().toISOString() }
  }
}

// ===== CHATS =====
export const getChats = () => API.get('/chats')
export const getChat = (chatId) => API.get(`/chats/${chatId}`)
export const createChat = (chatData) => API.post('/chats', chatData)
export const updateChat = (chatId, data) => API.patch(`/chats/${chatId}`, data)

// ===== MESSAGES =====
export const getMessages = (chatId) => API.get(`/messages?chatId=${chatId}`)
export const getAllMessages = () => API.get('/messages')
export const sendMessage = (message) => API.post('/messages', message)
export const updateMessage = (messageId, data) => API.patch(`/messages/${messageId}`, data)
export const deleteMessage = (messageId) => API.delete(`/messages/${messageId}`)

// ===== CALLS =====
export const getCalls = () => API.get('/calls')
export const createCall = (callData) => API.post('/calls', callData)
export const updateCall = (callId, data) => API.patch(`/calls/${callId}`, data)

// ===== NOTIFICATIONS =====
export const getNotifications = () => API.get('/notifications')
export const createNotification = (notification) => API.post('/notifications', notification)

// ===== STATUS =====
export const getStatuses = () => API.get('/status')
export const createStatus = (statusData) => API.post('/status', statusData)

// ===== HEALTH CHECK =====
export const checkApiHealth = async () => {
  try {
    await API.get('/users')
    return API.isOnline
  } catch (error) {
    return false
  }
}

export default API
