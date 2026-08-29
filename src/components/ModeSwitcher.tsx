import type { Mode } from '../game/cards'

type ModeSwitcherProps = {
  mode: Mode
  onChange: (mode: Mode) => void
}

export function ModeSwitcher({ mode, onChange }: ModeSwitcherProps) {
  return (
    <div className="mode-switcher" role="group" aria-label="Training mode">
      <button
        type="button"
        className={mode === 'basic' ? 'active' : ''}
        onClick={() => onChange('basic')}
        aria-pressed={mode === 'basic'}
      >
        Basic
      </button>
      <button
        type="button"
        className={mode === 'counting' ? 'active' : ''}
        onClick={() => onChange('counting')}
        aria-pressed={mode === 'counting'}
      >
        Count
      </button>
    </div>
  )
}
