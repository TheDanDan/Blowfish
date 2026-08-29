import type { ReactNode } from 'react'

type AppShellProps = {
  header: ReactNode
  modeSwitcher: ReactNode
  table: ReactNode
  actions: ReactNode
  metrics: ReactNode
}

export function AppShell({ header, modeSwitcher, table, actions, metrics }: AppShellProps) {
  return (
    <main className="app-shell">
      {header}
      <div className="toolbar">
        {modeSwitcher}
        {metrics}
      </div>
      <div className="table-stage">{table}</div>
      {actions}
    </main>
  )
}
