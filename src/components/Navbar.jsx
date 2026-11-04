import { CalendarDays, ChevronDown, LogOut, Menu, Plus, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { themes, useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useCalendar } from '../pages/CalendarPage'
export default function Navbar() {
  const { theme, setTheme } = useTheme(), { user, logout } = useAuth(), [open, setOpen] = useState(false), navigate = useNavigate()
  return <header className="topbar"><div className="topbar-inner"><Link to="/" className="brand"><span className="brand-mark"><span>W</span></span><span className="brand-copy"><b>WEBHEAD</b><small>YOUR FRIENDLY NEIGHBORHOOD PLANNER</small></span></Link><nav className="nav-links"><Link to="/" className="nav-current"><CalendarDays size={16}/> Calendar</Link><button className="nav-button" onClick={()=>user ? window.dispatchEvent(new Event('new-note')) : navigate('/login')}><Plus size={16}/> New note</button></nav><div className="nav-right"><div className="theme-wrap"><button className="theme-button" aria-label="Choose theme" onClick={()=>setOpen(!open)}><Sparkles size={16}/><span className="theme-label">{themes.find(t=>t.id===theme)?.name}</span><ChevronDown size={14}/></button>{open&&<div className="theme-menu">{themes.map(t=><button key={t.id} onClick={()=>{setTheme(t.id);setOpen(false)}}><span>{t.icon}</span>{t.name}{theme===t.id&&<span className="theme-check">✓</span>}</button>)}</div>}</div>{user?<button className="avatar" title="Sign out" onClick={async()=>{await logout();navigate('/')}}>{user.name?.[0]||user.email?.[0]||'W'}<span className="avatar-out"><LogOut size={13}/></span></button>:<Link to="/login" className="sign-in">Sign in <span>↗</span></Link>}<button className="mobile-menu" aria-label="Menu"><Menu/></button></div></div></header>
}
