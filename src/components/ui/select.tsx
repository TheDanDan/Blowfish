import * as SelectPrimitive from '@radix-ui/react-select'
import type { ComponentProps, ComponentType, HTMLAttributes, ButtonHTMLAttributes } from 'react'

// Radix's polymorphic primitive props are not fully inferred by TypeScript 6.
// Keep the public wrapper props explicit until its upstream types support it.
const Trigger = SelectPrimitive.Trigger as ComponentType<ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>
const Icon = SelectPrimitive.Icon as ComponentType<HTMLAttributes<HTMLSpanElement> & { asChild?: boolean }>
const Content = SelectPrimitive.Content as ComponentType<HTMLAttributes<HTMLDivElement> & { position?: 'item-aligned' | 'popper'; align?: 'start' | 'center' | 'end'; sideOffset?: number }>
const ScrollUpButton = SelectPrimitive.ScrollUpButton as ComponentType<HTMLAttributes<HTMLDivElement>>
const Viewport = SelectPrimitive.Viewport as ComponentType<HTMLAttributes<HTMLDivElement>>
const ScrollDownButton = SelectPrimitive.ScrollDownButton as ComponentType<HTMLAttributes<HTMLDivElement>>
const Item = SelectPrimitive.Item as ComponentType<HTMLAttributes<HTMLDivElement> & { value: string; disabled?: boolean }>

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function Select({ ...props }: ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectValue({ ...props }: ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof Trigger>) {
  return (
    <Trigger data-slot="select-trigger" className={className} {...props}>
      {children}
      <Icon asChild>
        <span data-slot="select-icon">
          <ChevronDownIcon />
        </span>
      </Icon>
    </Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  align = 'end',
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <SelectPrimitive.Portal>
      <Content
        data-slot="select-content"
        className={className}
        position={position}
        align={align}
        sideOffset={4}
        {...props}
      >
        <ScrollUpButton data-slot="select-scroll-button">
          <ChevronUpIcon />
        </ScrollUpButton>
        <Viewport data-slot="select-viewport">{children}</Viewport>
        <ScrollDownButton data-slot="select-scroll-button">
          <ChevronDownIcon />
        </ScrollDownButton>
      </Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof Item>) {
  return (
    <Item data-slot="select-item" className={className} {...props}>
      <span data-slot="select-item-indicator">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </Item>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
