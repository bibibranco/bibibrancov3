import { useEffect, useRef, useState, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'

// PORT-006 CopyButton: idle → "Copied!" for 2s, or "Select the address" when the clipboard is
// unavailable (insecure context, denied permission). The result is also announced in a polite
// status region, since the label change alone isn't reliably read out.

type CopyButtonProps = {
  /** Text put on the clipboard. */
  value: string
  /** Idle label, e.g. "Copy email". */
  children: ReactNode
  /** Element holding the visible text, selected for the user when copying fails. */
  fallbackTarget?: () => HTMLElement | null
  onCopy?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}

type State = 'idle' | 'copied' | 'failed'

const messages: Record<Exclude<State, 'idle'>, string> = {
  copied: 'Copied!',
  failed: 'Select the address',
}

function selectText(element: HTMLElement) {
  const range = document.createRange()
  range.selectNodeContents(element)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}

function CopyButton({
  value,
  children,
  fallbackTarget,
  onCopy,
  variant = 'secondary',
  className,
}: CopyButtonProps) {
  const [state, setState] = useState<State>('idle')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(value)
      setState('copied')
      onCopy?.()
      timer.current = setTimeout(() => setState('idle'), 2000)
    } catch {
      setState('failed')
      const target = fallbackTarget?.()
      if (target) selectText(target)
    }
  }

  return (
    <>
      <Button type="button" variant={variant} onClick={copy} className={className}>
        {state === 'idle' ? children : messages[state]}
      </Button>
      <span role="status" className="sr-only">
        {state === 'idle' ? '' : messages[state]}
      </span>
    </>
  )
}

export { CopyButton }
