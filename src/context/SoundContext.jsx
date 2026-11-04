import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const SoundContext = createContext(null)

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(() => localStorage.getItem('webhead-sound') === 'on')
  const contextRef = useRef(null)

  const toggle = useCallback(() => setEnabled(current => {
    const next = !current
    localStorage.setItem('webhead-sound', next ? 'on' : 'off')
    return next
  }), [])

  const play = useCallback((kind = 'tap') => {
    if (!enabled || typeof window === 'undefined') return
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return
    try {
      const audio = contextRef.current || (contextRef.current = new AudioContextClass())
      if (audio.state === 'suspended') audio.resume()
      const now = audio.currentTime
      const tones = kind === 'theme' ? [[392, 0], [523.25, .09], [659.25, .18]]
        : kind === 'save' ? [[523.25, 0], [659.25, .06], [783.99, .12]]
        : kind === 'delete' ? [[440, 0], [330, .08]]
        : kind === 'select' ? [[587.33, 0], [739.99, .045]]
        : [[520, 0]]
      const duration = kind === 'theme' ? .34 : kind === 'save' ? .24 : kind === 'delete' ? .2 : .12
      tones.forEach(([frequency, delay]) => {
        const oscillator = audio.createOscillator()
        const gain = audio.createGain()
        oscillator.type = kind === 'theme' ? 'sine' : 'triangle'
        oscillator.frequency.setValueAtTime(frequency, now + delay)
        oscillator.frequency.exponentialRampToValueAtTime(frequency * (kind === 'delete' ? .78 : 1.04), now + delay + duration * .75)
        gain.gain.setValueAtTime(.0001, now + delay)
        gain.gain.exponentialRampToValueAtTime(.045, now + delay + .012)
        gain.gain.exponentialRampToValueAtTime(.0001, now + delay + duration)
        oscillator.connect(gain); gain.connect(audio.destination)
        oscillator.start(now + delay); oscillator.stop(now + delay + duration + .01)
      })
    } catch { /* Audio is optional; unsupported devices stay silent. */ }
  }, [enabled])

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play])
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export const useSound = () => useContext(SoundContext)
