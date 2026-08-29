import { useEffect, useMemo, useState } from 'react'
import { ActionPanel } from './components/ActionPanel'
import { AppHeader } from './components/AppHeader'
import { AppShell } from './components/AppShell'
import { FeedbackSheet } from './components/FeedbackSheet'
import { ModeSwitcher } from './components/ModeSwitcher'
import { PracticeTable } from './components/PracticeTable'
import { ReferenceSheet } from './components/ReferenceSheet'
import { SessionSummary } from './components/SessionSummary'
import { SettingsSheet } from './components/SettingsSheet'
import {
  availableActions,
  recommend,
  shoeFor,
  tags,
  total,
  type Action,
  type Mode,
  type Rank,
  type Stats,
  type System,
} from './game/cards'
import { useTheme } from './theme/useTheme'
import './styles/app.css'

export default function App() {
  const { resolved, toggleTheme } = useTheme()

  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem('bf-mode') as Mode) || 'basic')
  const [system, setSystem] = useState<System>(() => (localStorage.getItem('bf-system') as System) || 'hilo')
  const [decks, setDecks] = useState(() => +(localStorage.getItem('bf-decks') || 6))
  const [betOn, setBetOn] = useState(() => localStorage.getItem('bf-bet') !== 'false')
  const [feedback, setFeedback] = useState<'instant' | 'after'>('instant')

  const [shoe, setShoe] = useState<Rank[]>(() => shoeFor(decks))
  const [phase, setPhase] = useState<'bet' | 'play' | 'count'>('bet')
  const [player, setPlayer] = useState<Rank[]>([])
  const [dealer, setDealer] = useState<Rank[]>([])
  const [running, setRunning] = useState(0)
  const [answer, setAnswer] = useState('')
  const [wager, setWager] = useState(1)
  const [settings, setSettings] = useState(true)
  const [reference, setReference] = useState(false)
  const [mistake, setMistake] = useState<string | null>(null)
  const [pendingPhase, setPendingPhase] = useState<'bet' | 'count' | null>(null)
  const [stats, setStats] = useState<Stats>({
    hands: 0,
    play: 0,
    playOk: 0,
    count: 0,
    countOk: 0,
    bet: 0,
    betOk: 0,
  })

  useEffect(() => {
    localStorage.setItem('bf-mode', mode)
    localStorage.setItem('bf-system', system)
    localStorage.setItem('bf-decks', String(decks))
    localStorage.setItem('bf-bet', String(betOn))
  }, [mode, system, decks, betOn])

  const tc = useMemo(
    () => Math.trunc(running / Math.max(0.5, Math.round((shoe.length / 52) * 2) / 2)),
    [running, shoe.length],
  )
  const target = Math.min(12, tc <= 1 ? 1 : tc === 2 ? 2 : tc === 3 ? 4 : tc === 4 ? 8 : 12)
  const tag = (r: Rank) => tags[system][r]

  const draw = (n: number) => {
    const cards = shoe.slice(0, n)
    setShoe((s) => s.slice(n))
    return cards
  }

  const reset = () => {
    setShoe(shoeFor(decks))
    setRunning(0)
    setPlayer([])
    setDealer([])
    setPhase('bet')
    setMistake(null)
    setPendingPhase(null)
  }

  const begin = () => {
    if (shoe.length < decks * 13) {
      reset()
      return
    }
    if (mode === 'counting' && betOn) {
      setStats((s) => ({ ...s, bet: s.bet + 1, betOk: s.betOk + (wager === target ? 1 : 0) }))
    }
    const c = draw(4)
    setPlayer([c[0], c[2]])
    setDealer([c[1], c[3]])
    setStats((s) => ({ ...s, hands: s.hands + 1 }))
    setPhase('play')
  }

  const play = (a: Action) => {
    const best = recommend(player, dealer[0])
    setStats((s) => ({ ...s, play: s.play + 1, playOk: s.playOk + (a === best ? 1 : 0) }))
    const hadMistake = a !== best
    if (hadMistake) setMistake(`${total(player)} vs dealer ${dealer[0]} → ${best}`)
    if (a === 'Hit') {
      const next = [...player, draw(1)[0]]
      setPlayer(next)
      if (total(next) < 21) return
    } else if (a === 'Double') {
      setPlayer((p) => [...p, draw(1)[0]])
    }
    const nextPhase = mode === 'counting' ? 'count' : 'bet'
    if (hadMistake) {
      setPendingPhase(nextPhase)
    } else {
      setPhase(nextPhase)
    }
  }

  const dismissMistake = () => {
    setMistake(null)
    if (pendingPhase) {
      setPhase(pendingPhase)
      setPendingPhase(null)
    }
  }

  const confirm = () => {
    const seen = [...player, dealer[0]]
    const actual = running + seen.reduce((n, r) => n + tag(r), 0)
    const ok = +answer === actual
    setRunning(actual)
    setStats((s) => ({ ...s, count: s.count + 1, countOk: s.countOk + (ok ? 1 : 0) }))
    setAnswer('')
    setPhase('bet')
  }

  const handleModeChange = (next: Mode) => {
    setMode(next)
    reset()
  }

  const handleStart = () => {
    reset()
    setSettings(false)
  }

  const actions = availableActions(player)

  return (
    <>
      <AppShell
        header={
          <AppHeader
            onReference={() => setReference(true)}
            onSettings={() => setSettings(true)}
            onReshuffle={reset}
            theme={resolved}
            onToggleTheme={toggleTheme}
          />
        }
        modeSwitcher={<ModeSwitcher mode={mode} onChange={handleModeChange} />}
        table={<PracticeTable dealer={dealer} player={player} phase={phase} />}
        actions={
          <div className={mode === 'counting' && betOn ? 'action-dock action-dock-count' : 'action-dock'}>
            <ActionPanel
              phase={phase}
              mode={mode}
              betOn={betOn}
              running={running}
              wager={wager}
              answer={answer}
              availableActions={actions}
              onWagerChange={setWager}
              onAnswerChange={setAnswer}
              onDeal={begin}
              onPlay={play}
              onConfirmCount={confirm}
            />
          </div>
        }
        metrics={<SessionSummary mode={mode} betOn={betOn} stats={stats} />}
      />

      <FeedbackSheet open={!!mistake} message={mistake} onDismiss={dismissMistake} />

      <SettingsSheet
        open={settings}
        onClose={() => setSettings(false)}
        mode={mode}
        system={system}
        decks={decks}
        feedback={feedback}
        betOn={betOn}
        onModeChange={setMode}
        onSystemChange={setSystem}
        onDecksChange={setDecks}
        onFeedbackChange={setFeedback}
        onBetOnChange={setBetOn}
        onStart={handleStart}
      />

      <ReferenceSheet open={reference} mode={mode} onClose={() => setReference(false)} />
    </>
  )
}
