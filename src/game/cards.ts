export type Mode = 'basic' | 'counting'
export type System = 'hilo' | 'zen'
export type Action = 'Hit' | 'Stand' | 'Double' | 'Split' | 'Surrender'
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
  return s.sort(() => Math.random() - 0.5)
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
  if (c.length === 2 && c[0] === c[1] && (c[0] === 'A' || c[0] === '8')) return 'Split'
  if (c.length === 2 && t === 16 && u >= 9) return 'Surrender'
  if (t >= 17) return 'Stand'
  if (t >= 13) return u <= 6 ? 'Stand' : 'Hit'
  if (t === 12) return u >= 4 && u <= 6 ? 'Stand' : 'Hit'
  if (c.length === 2 && (t === 11 || (t === 10 && u <= 9) || (t === 9 && u >= 3 && u <= 6))) return 'Double'
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
    ...(player.length === 2 ? (['Surrender'] as Action[]) : []),
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
