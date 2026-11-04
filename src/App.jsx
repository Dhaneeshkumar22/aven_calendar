import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthContext'
import api, { configureApi } from './lib/api'
import Navbar from './components/Navbar'
import ThemeIntro from './components/ThemeIntro'
import CalendarPage from './pages/CalendarPage'
import AuthPage from './pages/AuthPage'
export default function App() {
  const auth = useAuth(), navigate = useNavigate()
  useEffect(() => configureApi({ getToken: () => auth.accessToken, refresh: async () => { const { data } = await api.post('/auth/refresh'); auth.setAccessToken(data.accessToken); return data.accessToken } }), [auth])
  return <><Navbar/><Routes><Route path="/" element={<CalendarPage/>}/><Route path="/login" element={<AuthPage mode="login"/>}/><Route path="/signup" element={<AuthPage mode="signup"/>}/><Route path="/verify-otp" element={<AuthPage mode="verify"/>}/><Route path="/forgot-password" element={<AuthPage mode="forgot"/>}/><Route path="/reset-password" element={<AuthPage mode="reset"/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes><ThemeIntro/><Toaster position="top-center" toastOptions={{style:{background:'var(--panel)',color:'var(--text)',border:'1px solid var(--line)'}}}/></>
}
