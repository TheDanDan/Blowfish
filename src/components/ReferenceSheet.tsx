import { useState } from 'react'
import type { Mode } from '../game/cards'
import { betRamp, chartRows, dealerUpcards, deviations, ranks, tags } from '../game/reference'
import { Sheet } from './Sheet'

type ReferenceSheetProps = {
  open: boolean
  mode: Mode
  onClose: () => void
}

function StrategyChart() {
  return (
    <>
      <p className="chart-key">
        <b>H</b> Hit <b>S</b> Stand <b>D</b> Double <b>P</b> Split
      </p>
      <div className="chart-wrap">
        <div className="strategy-chart">
          <b>YOU / DEALER</b>
          {dealerUpcards.map((card) => (
            <b key={card}>{card}</b>
          ))}
          {chartRows.flatMap(([hand, plays]) => [
            <strong key={hand}>{hand}</strong>,
            ...plays.split(' ').map((play, index) => (
              <span className={`move-${play}`} key={`${hand}-${index}`}>
                {play}
              </span>
            )),
          ])}
        </div>
      </div>
    </>
  )
}

function TagGrid({ system }: { system: 'hilo' | 'zen' }) {
  return (
    <div className="tags">
      {ranks.map((r) => (
        <div key={r}>
          {r}
          <b>
            {tags[system][r] > 0 ? '+' : ''}
            {tags[system][r]}
          </b>
        </div>
      ))}
    </div>
  )
}

const COUNTING_PAGES = ['Playing table', 'Hi-Lo tags', 'Zen tags', 'Core deviations'] as const

export function ReferenceSheet({ open, mode, onClose }: ReferenceSheetProps) {
  const [pageIndex, setPageIndex] = useState(0)

  const handleClose = () => {
    setPageIndex(0)
    onClose()
  }

  return (
    <Sheet
      open={open}
      onClose={handleClose}
      eyebrow="Quick reference"
      title={mode === 'counting' ? 'Counting reference' : 'Basic strategy'}
      full
    >
      {mode === 'counting' ? (
        <div className="reference-pager">
          <div className="reference-segments" role="tablist" aria-label="Reference sections">
            {COUNTING_PAGES.map((label, index) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={pageIndex === index}
                className={pageIndex === index ? 'active' : ''}
                onClick={() => setPageIndex(index)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="reference-content">
            {pageIndex === 0 && (
              <article>
                <h3>Playing table</h3>
                <StrategyChart />
              </article>
            )}
            {pageIndex === 1 && (
              <article>
                <h3>Hi-Lo tags</h3>
                <TagGrid system="hilo" />
                <h3>Bet ramp</h3>
                <p>{betRamp}</p>
              </article>
            )}
            {pageIndex === 2 && (
              <article>
                <h3>Zen tags</h3>
                <TagGrid system="zen" />
                <p className="chart-note">
                  Zen is a balanced level-two count. Convert its running count to true count by decks remaining.
                </p>
              </article>
            )}
            {pageIndex === 3 && (
              <article>
                <h3>Core deviations</h3>
                <div className="deviation-table">
                  <b>Situation</b>
                  <b>Hi-Lo</b>
                  <b>Zen</b>
                  {deviations.flatMap((row) => [
                    <span key={`${row.situation}-s`}>{row.situation}</span>,
                    <span key={`${row.situation}-h`}>{row.hilo}</span>,
                    <span key={`${row.situation}-z`}>{row.zen}</span>,
                  ])}
                </div>
                <p className="chart-note">Core index deviations only. Compare the count systems.</p>
              </article>
            )}
          </div>
          <div className="reference-nav">
            <button
              type="button"
              disabled={pageIndex === 0}
              onClick={() => setPageIndex((i) => i - 1)}
              aria-label="Previous reference sheet"
            >
              ←
            </button>
            <span>
              {pageIndex + 1} / {COUNTING_PAGES.length}
            </span>
            <button
              type="button"
              disabled={pageIndex === COUNTING_PAGES.length - 1}
              onClick={() => setPageIndex((i) => i + 1)}
              aria-label="Next reference sheet"
            >
              →
            </button>
          </div>
        </div>
      ) : (
        <>
          <StrategyChart />
          <p className="chart-note">
            Surrender hard 16 against 9, 10, or A when offered. This chart follows the active trainer rules.
          </p>
        </>
      )}
    </Sheet>
  )
}
