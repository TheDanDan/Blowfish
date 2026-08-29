import type { Rank } from '../game/cards'
import { suitForSeed } from '../game/cards'

type CardProps = {
  rank?: Rank
  back?: boolean
  seed?: number
}

export function Card({ rank, back = false, seed = 0 }: CardProps) {
  const suit = suitForSeed(seed)
  return (
    <div className={`card ${back ? 'back' : ''}`}>
      <b>{back ? '◆' : rank}</b>
      {!back && <small>{suit}</small>}
    </div>
  )
}
