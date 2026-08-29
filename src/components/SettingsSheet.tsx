import type { Mode, System } from '../game/cards'
import { Sheet } from './Sheet'
import { StyledSelect } from './StyledSelect'

type SettingsSheetProps = {
  open: boolean
  onClose: () => void
  mode: Mode
  system: System
  decks: number
  feedback: 'instant' | 'after'
  betOn: boolean
  onModeChange: (mode: Mode) => void
  onSystemChange: (system: System) => void
  onDecksChange: (decks: number) => void
  onFeedbackChange: (feedback: 'instant' | 'after') => void
  onBetOnChange: (betOn: boolean) => void
  onStart: () => void
}

export function SettingsSheet({
  open,
  onClose,
  mode,
  system,
  decks,
  feedback,
  betOn,
  onModeChange,
  onSystemChange,
  onDecksChange,
  onFeedbackChange,
  onBetOnChange,
  onStart,
}: SettingsSheetProps) {
  return (
    <Sheet open={open} onClose={onClose} eyebrow="Table setup" title="Set your training table.">
      <div className="settings-groups">
        <div className="settings-group">
          <div className="settings-row">
            <span>Mode</span>
            <StyledSelect
              value={mode}
              onValueChange={(value) => onModeChange(value as Mode)}
              options={[
                { value: 'basic', label: 'Basic strategy' },
                { value: 'counting', label: 'Card counting' },
              ]}
            />
          </div>
          <div className="settings-row">
            <span>Decks</span>
            <StyledSelect
              value={String(decks)}
              onValueChange={(value) => onDecksChange(Number(value))}
              options={[1, 2, 4, 6, 8].map((n) => ({ value: String(n), label: String(n) }))}
            />
          </div>
          {mode === 'counting' && (
            <>
              <div className="settings-row">
                <span>Counting system</span>
                <StyledSelect
                  value={system}
                  onValueChange={(value) => onSystemChange(value as System)}
                  options={[
                    { value: 'hilo', label: 'Hi-Lo' },
                    { value: 'zen', label: 'Zen' },
                  ]}
                />
              </div>
              <div className="settings-row">
                <span>Feedback</span>
                <StyledSelect
                  value={feedback}
                  onValueChange={(value) => onFeedbackChange(value as 'instant' | 'after')}
                  options={[
                    { value: 'instant', label: 'Instant' },
                    { value: 'after', label: 'End of hand' },
                  ]}
                />
              </div>
            </>
          )}
        </div>
        {mode === 'counting' && (
          <button
            type="button"
            className={`settings-toggle ${betOn ? 'on' : ''}`}
            onClick={() => onBetOnChange(!betOn)}
            aria-pressed={betOn}
          >
            <span>
              <b>Practice bet sizing</b>
              <small>Test your count-to-wager decisions</small>
            </span>
            <i aria-hidden="true" />
          </button>
        )}
      </div>
      <button type="button" className="btn-primary btn-full" onClick={onStart}>
        Start training
      </button>
    </Sheet>
  )
}
