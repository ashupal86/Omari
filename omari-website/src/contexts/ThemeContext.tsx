import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  mounted: boolean
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  mounted: false,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'omari-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage after component mounts
  useEffect(() => {
    setMounted(true)
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme
      if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
        console.log('Loading stored theme:', storedTheme)
        setTheme(storedTheme)
      }
    } catch (error) {
      console.error('Error loading theme from localStorage:', error)
    }
  }, [storageKey])

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      console.log('Applying system theme:', systemTheme)
      root.classList.add(systemTheme)
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
        const newSystemTheme = mediaQuery.matches ? 'dark' : 'light'
        console.log('System theme changed to:', newSystemTheme)
        root.classList.remove('light', 'dark')
        root.classList.add(newSystemTheme)
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    console.log('Applying theme:', theme)
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      try {
        localStorage.setItem(storageKey, theme)
        setTheme(theme)
        console.log('Theme saved to localStorage:', theme)
      } catch (error) {
        console.error('Error saving theme to localStorage:', error)
        setTheme(theme) // Still update the state even if localStorage fails
      }
    },
    mounted,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
