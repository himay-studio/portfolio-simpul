"use client";

import { useId, useState } from "react";

export type AccordionItem = { q: string; a: string | string[] };

/**
 * FAQ accordion, R7.
 *
 * The panel animates with `grid-template-rows: 0fr -> 1fr` rather than a
 * max-height guess, so the transition is correct at any content length.
 *
 * R48 note: a collapsed accordion is NOT a card stack, so a FAQ of ten items
 * is explicitly exempt from the mobile carousel rule. Ten cards would need a
 * carousel, ten accordion rows do not.
 */
export default function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        const body = Array.isArray(item.a) ? item.a : [item.a];
        return (
          <div className="acc-item" data-open={isOpen} key={item.q}>
            <h3>
              <button
                type="button"
                className="acc-trigger"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className="acc-icon" aria-hidden="true" />
              </button>
            </h3>
            <div className="acc-panel" id={`${id}-${i}`} role="region">
              <div>
                <div className="acc-inner stack">
                  {body.map((p, k) => (
                    <p key={k}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
