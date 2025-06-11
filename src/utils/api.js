// Détection automatique de l'environnement
const API_URL = import.meta.env.PROD 
  ? `${window.location.origin}/api`  // Production: même domaine + /api
  : 'http://localhost:5001'          // Développement: port séparé

class API {
  static async get(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json()
    } catch (error) {
      console.error('API GET Error:', error)
      throw error
    }
  }

  static async post(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json()
    } catch (error) {
      console.error('API POST Error:', error)
      throw error
    }
  }

  static async put(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json()
    } catch (error) {
      console.error('API PUT Error:', error)
      throw error
    }
  }

  static async delete(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json()
    } catch (error) {
      console.error('API DELETE Error:', error)
      throw error
    }
  }
}

export default API
