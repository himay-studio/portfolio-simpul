"use client";

import { useEffect, useId, useRef, useState } from "react";

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const DOW = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;

const human = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

/** Monday-first offset for the 1st of the month */
const leadingBlanks = (year: number, month: number) => {
  const jsDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  return (jsDay + 6) % 7;
};

type Props = {
  label: string;
  name: string;
  value?: string;
  onChange?: (isoDate: string) => void;
  anchor?: "left" | "right";
  hint?: string;
  /** disallow dates before today */
  minToday?: boolean;
};

/**
 * R21, the custom date picker.
 *
 * A free text date input with placeholder guidance like "contoh: 12 Agustus
 * 2026" is a FAILED build, it produces unparseable data. This is a real
 * calendar grid with the same interaction bar as the R12 Select: open/close
 * animation, ArrowUp/Down/Left/Right to move by week and by day, Enter to
 * commit, Escape to close, PageUp/PageDown to change month, and proper roles
 * on the grid.
 *
 * R57: the panel is `display: none` when closed, and clamped to
 * `calc(100vw - 2rem)`. On Mabrur a `.dp-panel` that was only faded out sat at
 * `left: 0; width: 340px` inside a 375px viewport, so its right edge measured
 * 385px and pushed `scrollWidth` to 385 while the picker was CLOSED. Nobody
 * could see it, and no screenshot showed it, because the culprit was invisible
 * in exactly the state that broke the page.
 */
export default function DatePicker({
  label,
  name,
  value,
  onChange,
  anchor = "left",
  hint,
  minToday = true,
}: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
  const [inner, setInner] = useState(value ?? "");
  const [cursor, setCursor] = useState(() => new Date(today));
  const [view, setView] = useState(() => ({
    y: today.getFullYear(),
    m: today.getMonth(),
  }));

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  const current = value ?? inner;
  const selectedDate = current ? new Date(current + "T00:00:00") : null;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const commit = (d: Date) => {
    const v = iso(d);
    setInner(v);
    onChange?.(v);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const moveCursor = (days: number) => {
    const next = new Date(cursor);
    next.setDate(next.getDate() + days);
    setCursor(next);
    setView({ y: next.getFullYear(), m: next.getMonth() });
  };

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
      case "ArrowLeft":
        e.preventDefault();
        moveCursor(-1);
        break;
      case "ArrowRight":
        e.preventDefault();
        moveCursor(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveCursor(-7);
        break;
      case "ArrowDown":
        e.preventDefault();
        moveCursor(7);
        break;
      case "PageUp":
        e.preventDefault();
        setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { ...v, m: v.m - 1 }));
        break;
      case "PageDown":
        e.preventDefault();
        setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { ...v, m: v.m + 1 }));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!(minToday && cursor < today)) commit(cursor);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const blanks = leadingBlanks(view.y, view.m);

  return (
    <div className="field">
      <span className="field-label" id={`${id}-label`}>
        {label}
      </span>

      <div className="cs" data-open={open} ref={rootRef}>
        <button
          type="button"
          className="cs-trigger"
          ref={triggerRef}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-labelledby={`${id}-label`}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onKeyDown}
        >
          <span className={`cs-value${selectedDate ? "" : " is-placeholder"}`}>
            {selectedDate ? human(selectedDate) : "Pilih tanggal"}
          </span>
          <span className="cs-chev" aria-hidden="true" />
        </button>

        <div
          className="dp-panel"
          data-anchor={anchor}
          role="dialog"
          aria-label={label}
          onKeyDown={onKeyDown}
        >
          <div className="dp-head">
            <button
              type="button"
              className="dp-nav"
              aria-label="Bulan sebelumnya"
              onClick={() =>
                setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { ...v, m: v.m - 1 }))
              }
            >
              &lsaquo;
            </button>
            <span className="dp-title" aria-live="polite">
              {MONTHS[view.m]} {view.y}
            </span>
            <button
              type="button"
              className="dp-nav"
              aria-label="Bulan berikutnya"
              onClick={() =>
                setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { ...v, m: v.m + 1 }))
              }
            >
              &rsaquo;
            </button>
          </div>

          <div className="dp-grid" role="grid" aria-label={`${MONTHS[view.m]} ${view.y}`}>
            {DOW.map((d) => (
              <span key={d} className="dp-dow" role="columnheader" aria-label={d}>
                {d}
              </span>
            ))}
            {Array.from({ length: blanks }, (_, i) => (
              <span key={`b${i}`} aria-hidden="true" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const d = new Date(view.y, view.m, day);
              const disabled = minToday && d < today;
              const isSelected = !!selectedDate && iso(d) === iso(selectedDate);
              return (
                <button
                  key={day}
                  type="button"
                  role="gridcell"
                  className={`dp-day${iso(d) === iso(today) ? " is-today" : ""}`}
                  aria-selected={isSelected}
                  aria-label={human(d)}
                  disabled={disabled}
                  tabIndex={iso(d) === iso(cursor) ? 0 : -1}
                  onClick={() => commit(d)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {hint && <span className="hint">{hint}</span>}
      <input type="hidden" name={name} value={current} />
    </div>
  );
}
