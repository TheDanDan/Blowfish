import { Sheet } from './Sheet'

type FeedbackSheetProps = {
  open: boolean
  message: string | null
  onDismiss: () => void
}

export function FeedbackSheet({ open, message, onDismiss }: FeedbackSheetProps) {
  if (!message) return null

  return (
    <Sheet open={open} onClose={onDismiss} eyebrow="One to remember" title={message} compact>
      <p className="feedback-note">That is the percentage play — you are building the pattern.</p>
      <button type="button" className="btn-primary btn-full" onClick={onDismiss}>
        Got it
      </button>
    </Sheet>
  )
}
