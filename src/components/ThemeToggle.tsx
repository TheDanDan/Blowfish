import type { ResolvedTheme } from '../theme/useTheme'

type ThemeToggleProps = {
  theme: ResolvedTheme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button type="button" className="icon-btn" onClick={onToggle} aria-label={`Switch to ${next} theme`}>
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
          <path
            fill="currentColor"
            d="M12 3a1 1 0 0 1 1 1v1.07A7 7 0 0 1 18.93 11H20a1 1 0 1 1 0 2h-1.07A7 7 0 0 1 13 18.93V20a1 1 0 1 1-2 0v-1.07A7 7 0 0 1 5.07 13H4a1 1 0 1 1 0-2h1.07A7 7 0 0 1 11 5.07V4a1 1 0 0 1 1-1Zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
          <path
            fill="currentColor"
            d="M12 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm0-14a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm8 7a1 1 0 0 1 1 1 1 1 0 1 1-2 0 1 1 0 0 1 1-1ZM3 12a1 1 0 0 1-1 1 1 1 0 0 1 0-2 1 1 0 0 1 1 1Zm15.66 6.66a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71ZM6.34 6.34a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71Zm12.02-1.1a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41l.71-.71a1 1 0 0 1 1.41 1.41l-.71.71ZM6.34 17.66a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41l.71-.71a1 1 0 0 1 1.41 1.41l-.71.71ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
          />
        </svg>
      )}
    </button>
  )
}
