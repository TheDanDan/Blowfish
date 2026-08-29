import type { ResolvedTheme } from '../theme/useTheme'
import blowfishLogo from '../assets/blowfish-logo-transparent.png'
import { ThemeToggle } from './ThemeToggle'

type AppHeaderProps = {
  onReference: () => void
  onSettings: () => void
  onReshuffle: () => void
  theme: ResolvedTheme
  onToggleTheme: () => void
}

export function AppHeader({ onReference, onSettings, onReshuffle, theme, onToggleTheme }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-brand">
        <img className="app-logo" src={blowfishLogo} alt="" />
        <div className="app-title">Blowfish</div>
      </div>
      <nav className="app-nav" aria-label="App controls">
        <button type="button" className="nav-link" onClick={onReference}>
          Reference
        </button>
        <button type="button" className="icon-btn" onClick={onSettings} aria-label="Settings">
          <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
            <path
              fill="currentColor"
              d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.94 4.5a7.96 7.96 0 0 0 .06-.94 7.96 7.96 0 0 0-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.28 7.28 0 0 0-1.62-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54a7.28 7.28 0 0 0-1.62.94l-2.39-.96a.5.5 0 0 0-.6.22L2.01 9.4a.5.5 0 0 0 .12.64L4.16 11.6a7.96 7.96 0 0 0-.06.94c0 .32.02.63.06.94L2.13 14.6a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.5.39 1.05.7 1.62.94l.36 2.54a.5.5 0 0 0 .5.42h3.84a.5.5 0 0 0 .5-.42l.36-2.54c.57-.24 1.12-.55 1.62-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64L20.94 13Z"
            />
          </svg>
        </button>
        <button type="button" className="icon-btn" onClick={onReshuffle} aria-label="Shuffle new shoe">
          <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5"
            />
          </svg>
        </button>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </nav>
    </header>
  )
}
