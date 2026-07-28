"use client";

import { useEffect, useId, useRef, useState } from "react";

export type Option = { value: string; label: string; meta?: string };

type Props = {
  label: string;
  name: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** R16.1 / R57 geometry: anchor away from the nearer viewport edge. */
  anchor?: "left" | "right";
  required?: boolean;
  hint?: string;
};

/**
 * R12, the custom Select. A native `<select>` is banned everywhere in this
 * build, on the marketing pages and in the demo app alike.
 *
 * Contract:
 *  - open/close animates, and the chevron rotates
 *  - keyboard accessible: ArrowUp/ArrowDown move the active option, Enter and
 *    Space commit, Escape closes and returns focus to the trigger, Home and
 *    End jump to the ends
 *  - role="listbox" on the panel, role="option" on each item
 *  - a hidden input carries the form value
 *
 * R57: the panel is `display: none` when closed, not merely faded. A
 * `visibility: hidden` panel still occupies layout and still widens
 * `document.documentElement.scrollWidth`, which is horizontal overflow that
 * appears in no screenshot because the culprit is invisible in exactly the
 * state that breaks the page. It also carries `max-width: calc(100vw - 2rem)`.
 *
 * R50: the option label and its meta line are separate block elements with a
 * gap, so they can never render as "PashminaScarf panjang".
 */
export default function Select({
  label,
  name,
  options,
  value,
  onChange,
  placeholder = "Pilih salah satu",
  anchor = "left",
  required,
  hint,
}: Props) {
  const [open, setOpen] = useState(false);
  const [inner, setInner] = useState(value ?? "");
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  const current = value ?? inner;
  const selected = options.find((o) => o.value === current);

  const commit = (v: string) => {
    setInner(v);
    onChange?.(v);
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const i = options.findIndex((o) => o.value === current);
    setActive(i === -1 ? 0 : i);
  }, [open, options, current]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (options[active]) commit(options[active].value);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div className="field">
      {/* R19: the label is always visible above the control. */}
      <span className="field-label" id={`${id}-label`}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>

      <div className="cs" data-open={open} ref={rootRef}>
        <button
          type="button"
          className="cs-trigger"
          ref={triggerRef}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${id}-label`}
          aria-controls={`${id}-list`}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onKeyDown}
        >
          <span className={`cs-value${selected ? "" : " is-placeholder"}`}>
            {selected ? selected.label : placeholder}
          </span>
          <span className="cs-chev" aria-hidden="true" />
        </button>

        <div
          className="cs-panel"
          data-anchor={anchor}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          tabIndex={-1}
          onKeyDown={onKeyDown}
        >
          {options.map((o, i) => (
            <button
              key={o.value}
              type="button"
              className={`cs-opt${i === active ? " is-active" : ""}`}
              role="option"
              aria-selected={o.value === current}
              onMouseEnter={() => setActive(i)}
              onClick={() => commit(o.value)}
            >
              <span className="cs-opt-label">{o.label}</span>
              {/* R50: its own block, its own size, never inline beside the
                  label. */}
              {o.meta && <span className="cs-opt-meta">{o.meta}</span>}
            </button>
          ))}
        </div>
      </div>

      {hint && <span className="hint">{hint}</span>}

      {/* the form value */}
      <input type="hidden" name={name} value={current} />
    </div>
  );
}
