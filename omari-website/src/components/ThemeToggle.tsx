import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()

  const toggleTheme = () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      console.log('Toggling theme from', theme, 'to', newTheme)
      alert(`Switching from ${theme} to ${newTheme}`) // Temporary test
      setTheme(newTheme)
    } catch (error) {
      console.error('Error toggling theme:', error)
    }
  }

  console.log('ThemeToggle rendered with theme:', theme, 'mounted:', mounted)

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        type="button"
        disabled
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative"
      type="button"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
