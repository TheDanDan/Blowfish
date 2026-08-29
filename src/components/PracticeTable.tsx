import type { Rank } from '../game/cards'
import { total } from '../game/cards'
import { Card } from './Card'

type PracticeTableProps = {
  dealer: Rank[]
  player: Rank[]
  phase: 'bet' | 'play' | 'count'
}

export function PracticeTable({ dealer, player, phase }: PracticeTableProps) {
  return (
    <section className="practice-table" aria-label="Practice table">
      <div className="seat dealer-seat">
        <p className="seat-label">Dealer</p>
        <div className="cards">
          {dealer.length ? (
            <>
              <Card rank={dealer[0]} seed={0} />
              <Card rank={dealer[1]} back={phase === 'play'} seed={1} />
            </>
          ) : (
            <em className="seat-empty">Waiting for the deal</em>
          )}
        </div>
      </div>
      <hr className="table-divider" />
      <div className="seat player-seat">
        <p className="seat-label">
          You
          {player.length > 0 && <span className="seat-total">{total(player)}</span>}
        </p>
        <div className="cards">
          {player.length ? (
            player.map((rank, index) => <Card key={`${rank}-${index}`} rank={rank} seed={index + 10} />)
          ) : (
            <em className="seat-empty">One-unit wager selected</em>
          )}
        </div>
      </div>
    </section>
  )
}
