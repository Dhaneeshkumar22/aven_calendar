import { createContext, useContext, useEffect, useState } from 'react'
const ThemeContext = createContext(null)
export const themes = [
  { id: 'spidey', name: 'Spider-Verse', icon: '🕸️' },
  { id: 'venom', name: 'Venom', icon: '🖤' },
  { id: 'miles', name: 'Miles Morales', icon: '⚡' },
  { id: 'gwen', name: 'Gwen Stacy', icon: '🌸' },
  { id: 'bugle', name: 'Daily Bugle', icon: '📰' },
]
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('webhead-theme') || 'spidey')
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('webhead-theme', theme) }, [theme])
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)
