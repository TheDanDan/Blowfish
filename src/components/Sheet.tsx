import { useEffect, type ReactNode } from 'react'

type SheetProps = {
  open: boolean
  onClose: () => void
  title: string
  eyebrow?: string
  children: ReactNode
  full?: boolean
  compact?: boolean
}

export function Sheet({ open, onClose, title, eyebrow, children, full = false, compact = false }: SheetProps) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div className="sheet-overlay" role="presentation" onClick={onClose}>
      <div
        className={`sheet ${full ? 'sheet-full' : ''} ${compact ? 'sheet-compact' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="sheet-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {eyebrow && <span className="sheet-eyebrow">{eyebrow}</span>}
        <h1 id="sheet-title" className="sheet-title">
          {title}
        </h1>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  )
}
