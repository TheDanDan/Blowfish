import { useEffect, useRef } from 'react'
import type { Action, Mode, Phase } from '../game/cards'

type ActionPanelProps = {
  phase: Phase
  mode: Mode
  betOn: boolean
  running: number
  wager: number
  answer: string
  availableActions: Action[]
  onWagerChange: (wager: number) => void
  onAnswerChange: (answer: string) => void
  onDeal: () => void
  onPlay: (action: Action) => void
  onConfirmCount: () => void
}

const ALL_ACTIONS: Action[] = ['Hit', 'Stand', 'Double', 'Split']
const CHIP_VALUES = [1, 2, 4, 6, 8, 10, 12]

const ACTION_SHORTCUTS: Record<Action, string> = {
  Hit: 'H',
  Stand: 'S',
  Double: 'D',
  Split: 'P',
}

const ACTION_BY_KEY: Record<string, Action> = {
  h: 'Hit',
  s: 'Stand',
  d: 'Double',
  p: 'Split',
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
}

export function ActionPanel({
  phase,
  mode,
  betOn,
  running,
  wager,
  answer,
  availableActions,
  onWagerChange,
  onAnswerChange,
  onDeal,
  onPlay,
  onConfirmCount,
}: ActionPanelProps) {
  const playRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      if (document.querySelector('.sheet-overlay')) return

      if (isTypingTarget(e.target)) return

      if (phase === 'play') {
        const action = ACTION_BY_KEY[e.key.toLowerCase()]
        if (!action || !availableActions.includes(action)) return
        e.preventDefault()
        playRef.current?.querySelector<HTMLButtonElement>(`[data-action="${action}"]`)?.click()
        return
      }

      if (phase === 'bet' && e.key === ' ') {
        e.preventDefault()
        onDeal()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [phase, availableActions, onDeal])

  if (phase === 'bet') {
    return (
      <section className="action-panel bet-panel" aria-label="Bet actions">
        {mode === 'counting' && betOn && (
          <div className="wager-section">
            <p className="wager-hint">
              Running count {running >= 0 ? '+' : ''}
              {running} · choose 1–12 units
            </p>
            <div className="chips" role="group" aria-label="Wager amount">
              {CHIP_VALUES.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={wager === n ? 'picked' : ''}
                  onClick={() => onWagerChange(n)}
                  aria-pressed={wager === n}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          type="button"
          className="play-action play-action-deal btn-full"
          onClick={onDeal}
          aria-keyshortcuts="Space"
          aria-label="Deal cards, shortcut Space"
        >
          <kbd className="play-action-key" aria-hidden="true">
            Space
          </kbd>
          <span className="play-action-label">Deal cards</span>
        </button>
      </section>
    )
  }

  if (phase === 'play') {
    return (
      <section className="action-panel play-panel" aria-label="Play actions">
        <div ref={playRef} className="play-actions" role="group" aria-label="Available actions">
          {ALL_ACTIONS.map((action) => {
            const isAvailable = availableActions.includes(action)
            const shortcut = ACTION_SHORTCUTS[action]
            return (
              <button
                key={action}
                type="button"
                data-action={action}
                disabled={!isAvailable}
                className={`play-action play-action-${action.toLowerCase()}`}
                onClick={() => onPlay(action)}
                aria-keyshortcuts={shortcut.toLowerCase()}
                aria-label={
                  isAvailable ? `${action}, shortcut ${shortcut}` : `${action}, unavailable`
                }
              >
                <kbd className="play-action-key" aria-hidden="true">
                  {shortcut}
                </kbd>
                <span className="play-action-label">{action}</span>
              </button>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section className="action-panel count-panel" aria-label="Count actions">
      <div className="count-prompt">
        <h2>What is the running count?</h2>
        <p>Include every exposed card before the next round.</p>
      </div>
      <form
        className="count-controls"
        onSubmit={(e) => {
          e.preventDefault()
          onConfirmCount()
        }}
      >
        <input
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          inputMode="numeric"
          aria-label="Running count"
          placeholder="0"
        />
        <button type="submit" className="btn-primary">
          Confirm count
        </button>
      </form>
    </section>
  )
}
