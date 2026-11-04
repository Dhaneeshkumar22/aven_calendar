import { useEffect, useRef, useState } from 'react'
import { CalendarDays, Sparkles } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { themes, useTheme } from '../context/ThemeContext'

export default function ThemeIntro() {
  const { theme } = useTheme()
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const [introTheme, setIntroTheme] = useState(theme)
  const previous = useRef(null)

  useEffect(() => {
    if (location.pathname !== '/') { previous.current = null; setVisible(false); return }
    // Show once as the calendar opens, then again whenever the user picks another theme.
    if (previous.current === null || previous.current !== theme) {
      previous.current = theme
      setIntroTheme(theme)
      setVisible(true)
    }
  }, [theme, location.pathname])

  useEffect(() => {
    if (!visible) return
    const timer = window.setTimeout(() => setVisible(false), 2100)
    return () => window.clearTimeout(timer)
  }, [visible, introTheme])

  if (!visible || location.pathname !== '/') return null
  const selected = themes.find(item => item.id === introTheme) || themes[0]
  const month = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  return <div className={`theme-intro intro-${introTheme}`} data-intro-theme={introTheme} aria-live="polite" aria-label={`${selected.name} calendar theme`}>
    <div className="intro-web"/><div className="intro-orbit orbit-one"/><div className="intro-orbit orbit-two"/>
    {introTheme==='venom'&&<div className="venom-tendrils"><i/><i/><i/><i/><i/></div>}
    {introTheme==='miles'&&<div className="miles-glitch-lines"><i/><i/><i/><i/></div>}
    {introTheme==='gwen'&&<div className="gwen-petals"><i>✿</i><i>✧</i><i>❀</i><i>✦</i><i>✿</i><i>✧</i></div>}
    {introTheme==='bugle'&&<div className="bugle-masthead">THE DAILY BUGLE <span>ALL THE NEWS THAT’S FIT TO PRINT</span></div>}
    <div className="intro-content"><div className="intro-emblem">{selected.icon}</div>
      <span className="intro-kicker"><Sparkles size={14}/> YOUR CALENDAR, REIMAGINED</span>
      <h1>{selected.name}</h1><p>A fresh little world for <em>{month}</em></p>
      <div className="intro-preview"><div className="intro-preview-head"><CalendarDays size={14}/><span>{month}</span><span className="intro-preview-spark">✦</span></div><div className="intro-days">{['M','T','W','T','F','S','S'].map((day,i)=><span key={i} className={i===3?'intro-today':''}>{day}</span>)}{[12,13,14,15,16,17,18].map((day,i)=><span key={day} className={`intro-date ${i===3?'intro-date-active':''}`}>{day}{i===1||i===4?<i/>:null}</span>)}</div></div>
      <div className="intro-loading"><span/></div>
    </div>
  </div>
}
