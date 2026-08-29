import { useEffect } from 'react'
import { Sheet } from './Sheet'

type FeedbackSheetProps = {
  open: boolean
  message: string | null
  onDismiss: () => void
}

export function FeedbackSheet({ open, message, onDismiss }: FeedbackSheetProps) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey || event.key !== ' ') return
      event.preventDefault()
      onDismiss()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onDismiss])

  if (!message) return null

  return (
    <Sheet open={open} onClose={onDismiss} eyebrow="One to remember" title={message} compact>
      <p className="feedback-note">That is the percentage play — you are building the pattern.</p>
      <button
        type="button"
        className="play-action play-action-deal btn-full feedback-dismiss"
        onClick={onDismiss}
        aria-keyshortcuts="Space"
        aria-label="Got it, shortcut Space"
      >
        <span className="play-action-label">Got it</span>
        <kbd className="play-action-key" aria-hidden="true">
          Space
        </kbd>
      </button>
    </Sheet>
  )
}
