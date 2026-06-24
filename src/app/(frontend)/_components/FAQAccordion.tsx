'use client'
import React, { useState, useRef, useEffect } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface Props {
  items: FAQItem[]
}

function FAQItemComponent({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div style={{ borderTop: '0.5px solid var(--border)' }}>
      <button
        className="w-full text-left flex items-center justify-between gap-4 py-5"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-display font-bold uppercase text-[12px] tracking-wide">
          {item.question}
        </span>
        <span
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[16px] leading-none"
          style={{
            background: 'var(--npa-red)',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          overflow: 'hidden',
          height: `${height}px`,
          transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div ref={contentRef} className="pb-5 text-sm text-muted-foreground leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  )
}

export function FAQAccordion({ items }: Props) {
  const [open, setOpen] = useState<number>(0)

  return (
    <div className="flex flex-col" style={{ borderBottom: '0.5px solid var(--border)' }}>
      {items.map((item, i) => (
        <FAQItemComponent
          key={i}
          item={item}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}
    </div>
  )
}
