import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type StyledSelectProps = {
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
  ariaLabel?: string
}

export function StyledSelect({ value, onValueChange, options, ariaLabel = 'Select option' }: StyledSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger aria-label={ariaLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
