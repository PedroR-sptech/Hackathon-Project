import api from './api'

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password })
  const { access_token, user } = response.data
  localStorage.setItem('token', access_token)
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export const register = async (name, email, password) => {
  const response = await api.post('/api/auth/register', { name, email, password })
  const { access_token, user } = response.data
  localStorage.setItem('token', access_token)
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}
