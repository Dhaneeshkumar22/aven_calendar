import axios from 'axios'
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api', withCredentials: true })
let tokenProvider = () => null
let refreshHandler = null
export function configureApi({ getToken, refresh }) { tokenProvider = getToken; refreshHandler = refresh }
api.interceptors.request.use(config => { const token = tokenProvider(); if (token) config.headers.Authorization = `Bearer ${token}`; return config })
let refreshing
api.interceptors.response.use(response => response, async error => {
  const original = error.config
  if (error.response?.status === 401 && !original?._retried && !original?.url?.includes('/auth/')) {
    original._retried = true
    try { refreshing ||= refreshHandler?.(); const token = await refreshing; refreshing = null; if (token) { original.headers.Authorization = `Bearer ${token}`; return api(original) } } catch { refreshing = null; window.location.assign('/login') }
  }
  return Promise.reject(error)
})
export default api
