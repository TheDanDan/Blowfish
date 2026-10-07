export type Mode = 'basic' | 'counting'
export type System = 'hilo' | 'zen'
export type Action = 'Hit' | 'Stand' | 'Double' | 'Split'
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
export type Phase = 'bet' | 'play' | 'count'

export const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10']
export const suits = ['♠', '♥', '♦', '♣'] as const

export const tags = {
  hilo: { A: -1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1, '7': 0, '8': 0, '9': 0, '10': -1 },
  zen: { A: -1, '2': 1, '3': 1, '4': 2, '5': 2, '6': 2, '7': 1, '8': 0, '9': 0, '10': -2 },
} as const

export function shoeFor(n: number): Rank[] {
  const s: Rank[] = []
  for (let i = 0; i < n * 4; i++) s.push(...ranks.slice(0, 9), '10', '10', '10', '10')
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[s[i], s[j]] = [s[j], s[i]]
  }
  return s
}

export function total(c: Rank[]): number {
  let v = c.reduce((a, r) => a + (r === 'A' ? 11 : +r), 0)
  let a = c.filter((x) => x === 'A').length
  while (v > 21 && a--) v -= 10
  return v
}

export function recommend(c: Rank[], d: Rank): Action {
  const t = total(c)
  const u = d === 'A' ? 11 : +d
  const canDouble = c.length === 2

  if (canDouble && c[0] === c[1]) {
    const pair = c[0]
    if (pair === 'A' || pair === '8') return 'Split'
    if ((pair === '2' || pair === '3' || pair === '7') && u <= 7) return 'Split'
    if (pair === '4' && u >= 5 && u <= 6) return 'Split'
    if (pair === '6' && u <= 6) return 'Split'
    if (pair === '9' && (u <= 6 || u === 8 || u === 9)) return 'Split'
  }

  const hasSoftAce = c.includes('A') && c.reduce((sum, rank) => sum + (rank === 'A' ? 1 : +rank), 0) + 10 <= 21
  if (hasSoftAce) {
    if (t >= 19) return 'Stand'
    if (t === 18) {
      if (canDouble && u >= 3 && u <= 6) return 'Double'
      return u <= 8 ? 'Stand' : 'Hit'
    }
    if (canDouble && ((t <= 14 && u >= 5 && u <= 6) ||
      (t >= 15 && t <= 16 && u >= 4 && u <= 6) ||
      (t === 17 && u >= 3 && u <= 6))) return 'Double'
    return 'Hit'
  }

  if (t >= 17) return 'Stand'
  if (t >= 13) return u <= 6 ? 'Stand' : 'Hit'
  if (t === 12) return u >= 4 && u <= 6 ? 'Stand' : 'Hit'
  if (canDouble && (t === 11 || (t === 10 && u <= 9) || (t === 9 && u >= 3 && u <= 6))) return 'Double'
  return 'Hit'
}

export function suitForSeed(seed: number): (typeof suits)[number] {
  return suits[Math.abs(seed) % suits.length]
}

export function pct(n: number, d: number): string {
  return d ? `${Math.round((n / d) * 100)}%` : '—'
}

export function availableActions(player: Rank[]): Action[] {
  if (total(player) >= 21) return ['Stand']
  return [
    'Hit',
    'Stand',
    ...(player.length === 2 ? (['Double'] as Action[]) : []),
    ...(player.length === 2 && player[0] === player[1] ? (['Split'] as Action[]) : []),
  ]
}

export type Stats = {
  hands: number
  play: number
  playOk: number
  count: number
  countOk: number
  bet: number
  betOk: number
}
