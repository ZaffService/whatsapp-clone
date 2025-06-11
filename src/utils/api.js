// Détection automatique de l'environnement
const API_URL = import.meta.env.PROD 
  ? `${window.location.origin}/api`
  : 'http://localhost:5001'

class API {
  static async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      return await response.json()
    } catch (error) {
      console.error(`API Error [${options.method || 'GET'}] ${endpoint}:`, error)
      throw error
    }
  }

  static get(endpoint) { return this.request(endpoint) }
  static post(endpoint, data) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) }) }
  static put(endpoint, data) { return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) }) }
  static patch(endpoint, data) { return this.request(endpoint, { method: 'PATCH', body: JSON.stringify(data) }) }
  static delete(endpoint) { return this.request(endpoint, { method: 'DELETE' }) }
}

// ===== CHATS =====
export const getChats = () => API.get('/chats')
export const getChat = (chatId) => API.get(`/chats/${chatId}`)
export const createChat = (chatData) => API.post('/chats', chatData)
export const updateChat = (chatId, data) => API.patch(`/chats/${chatId}`, data)
export const deleteChat = (chatId) => API.delete(`/chats/${chatId}`)

// ===== USERS =====
export const getUsers = () => API.get('/users')
export const getUser = (userId) => API.get(`/users/${userId}`)
export const getUserById = (userId) => API.get(`/users/${userId}`)
export const createUser = (userData) => API.post('/users', userData)
export const updateUser = (userId, data) => API.patch(`/users/${userId}`, data)
export const updateUserStatus = (userId, status) => API.patch(`/users/${userId}`, { 
  status, 
  lastSeen: new Date().toISOString() 
})
export const deleteUser = (userId) => API.delete(`/users/${userId}`)
export const loginUser = (credentials) => API.post('/auth/login', credentials)
export const registerUser = (userData) => API.post('/auth/register', userData)
export const logoutUser = () => API.post('/auth/logout')

// ===== MESSAGES =====
export const getMessages = (chatId) => API.get(`/messages?chatId=${chatId}`)
export const getAllMessages = () => API.get('/messages')
export const getMessage = (messageId) => API.get(`/messages/${messageId}`)
export const sendMessage = (message) => API.post('/messages', message)
export const addMessage = (message) => API.post('/messages', message)
export const createMessage = (message) => API.post('/messages', message)
export const updateMessage = (messageId, data) => API.patch(`/messages/${messageId}`, data)
export const deleteMessage = (messageId) => API.delete(`/messages/${messageId}`)
export const markMessageAsRead = (messageId) => API.patch(`/messages/${messageId}`, { status: 'read' })

// ===== CALLS =====
export const getCalls = () => API.get('/calls')
export const getCall = (callId) => API.get(`/calls/${callId}`)
export const createCall = (callData) => API.post('/calls', callData)
export const updateCall = (callId, data) => API.patch(`/calls/${callId}`, data)
export const deleteCall = (callId) => API.delete(`/calls/${callId}`)
export const startCall = (callData) => API.post('/calls', { ...callData, status: 'active' })
export const endCall = (callId) => API.patch(`/calls/${callId}`, { status: 'ended', endTime: new Date().toISOString() })

// ===== NOTIFICATIONS =====
export const getNotifications = () => API.get('/notifications')
export const createNotification = (notification) => API.post('/notifications', notification)
export const updateNotification = (notifId, data) => API.patch(`/notifications/${notifId}`, data)
export const deleteNotification = (notifId) => API.delete(`/notifications/${notifId}`)
export const markNotificationAsRead = (notifId) => API.patch(`/notifications/${notifId}`, { read: true })

// ===== STATUS =====
export const getStatus = () => API.get('/status')
export const getStatuses = () => API.get('/status')
export const createStatus = (statusData) => API.post('/status', statusData)
export const updateStatus = (statusId, data) => API.patch(`/status/${statusId}`, data)
export const deleteStatus = (statusId) => API.delete(`/status/${statusId}`)

// ===== GROUPS =====
export const getGroups = () => API.get('/groups')
export const getGroup = (groupId) => API.get(`/groups/${groupId}`)
export const createGroup = (groupData) => API.post('/groups', groupData)
export const updateGroup = (groupId, data) => API.patch(`/groups/${groupId}`, data)
export const deleteGroup = (groupId) => API.delete(`/groups/${groupId}`)
export const addGroupMember = (groupId, userId) => API.post(`/groups/${groupId}/members`, { userId })
export const removeGroupMember = (groupId, userId) => API.delete(`/groups/${groupId}/members/${userId}`)

// ===== CONTACTS =====
export const getContacts = () => API.get('/contacts')
export const addContact = (contactData) => API.post('/contacts', contactData)
export const updateContact = (contactId, data) => API.patch(`/contacts/${contactId}`, data)
export const deleteContact = (contactId) => API.delete(`/contacts/${contactId}`)

// ===== MEDIA =====
export const uploadMedia = (mediaData) => API.post('/media', mediaData)
export const getMedia = (mediaId) => API.get(`/media/${mediaId}`)
export const deleteMedia = (mediaId) => API.delete(`/media/${mediaId}`)

// ===== SEARCH =====
export const searchMessages = (query) => API.get(`/messages?q=${encodeURIComponent(query)}`)
export const searchUsers = (query) => API.get(`/users?q=${encodeURIComponent(query)}`)
export const searchChats = (query) => API.get(`/chats?q=${encodeURIComponent(query)}`)

// ===== SETTINGS =====
export const getSettings = () => API.get('/settings')
export const updateSettings = (settings) => API.patch('/settings', settings)

// ===== TYPING INDICATORS =====
export const setTyping = (chatId, isTyping) => API.post('/typing', { chatId, isTyping })
export const getTypingStatus = (chatId) => API.get(`/typing/${chatId}`)

export default API
