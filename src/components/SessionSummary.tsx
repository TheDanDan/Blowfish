import type { Mode, Stats } from '../game/cards'
import { pct } from '../game/cards'

type SessionSummaryProps = {
  mode: Mode
  betOn: boolean
  stats: Stats
}

export function SessionSummary({ mode, betOn, stats }: SessionSummaryProps) {
  return (
    <section className="session-summary" aria-label="Session metrics">
      <span>
        Hands <b>{stats.hands}</b>
      </span>
      <span className="session-sep" aria-hidden="true">
        |
      </span>
      <span>
        Accuracy <b>{pct(stats.playOk, stats.play)}</b>
      </span>
      {mode === 'counting' && (
        <>
          <span className="session-sep" aria-hidden="true">
            |
          </span>
          <span>
            Count <b>{pct(stats.countOk, stats.count)}</b>
          </span>
        </>
      )}
      {mode === 'counting' && betOn && (
        <>
          <span className="session-sep" aria-hidden="true">
            |
          </span>
          <span>
            Bet <b>{pct(stats.betOk, stats.bet)}</b>
          </span>
        </>
      )}
    </section>
  )
}
