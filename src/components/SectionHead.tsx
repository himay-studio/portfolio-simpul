/**
 * The numbered editorial rail, the layout's signature device.
 *
 * A two digit ordinal set in Fraunces at the left gutter, `01`, `02`, `03`.
 * It costs nothing, it is used on the home page and mirrored in the ordering
 * steps on `/cara-pesan`, and it makes the page read as edited rather than as
 * a stack of generic blocks. See LAYOUT-ARCHITECTURE.md section 1.
 *
 * R50: the ordinal, the title, and the note are separate block elements. There
 * is no arrangement of them that can glue into one run of text.
 */
export default function SectionHead({
  ordinal,
  title,
  note,
  action,
  onDark = false,
}: {
  ordinal: string;
  title: string;
  note?: string;
  action?: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <div className="section-head reveal">
      <div style={{ display: "flex", gap: "var(--s-5)", alignItems: "flex-start", minWidth: 0 }}>
        <span
          aria-hidden="true"
          className="display"
          style={{
            fontSize: "var(--t-h3)",
            lineHeight: 1,
            paddingTop: 6,
            color: onDark ? "var(--tint)" : "var(--gold)",
            flex: "0 0 auto",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {ordinal}
        </span>
        <div style={{ minWidth: 0 }}>
          <h2 style={{ color: onDark ? "var(--ivory)" : undefined }}>{title}</h2>
          {note && (
            <p
              className="lead mt-4"
              style={{ color: onDark ? "var(--tint)" : undefined }}
            >
              {note}
            </p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}
