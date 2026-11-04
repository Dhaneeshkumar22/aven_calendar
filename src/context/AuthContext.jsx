import { createContext, useContext, useMemo, useState } from 'react'
import api from '../lib/api'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null)
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({ accessToken, user,
    async login(email, password) { const { data } = await api.post('/auth/login', { email, password }); setAccessToken(data.accessToken); setUser(data.user || { email }); return data },
    async signup(payload) { return (await api.post('/auth/signup', payload)).data },
    async verifyOtp(email, otp) { return (await api.post('/auth/verify-otp', { email, otp })).data },
    async logout() { try { await api.post('/auth/logout') } finally { setAccessToken(null); setUser(null) } },
    setAccessToken, setUser }), [accessToken, user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
