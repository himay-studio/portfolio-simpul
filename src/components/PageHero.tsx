import Link from "next/link";

export type Crumb = { href?: string; label: string };

/**
 * Interior page header. `.breadcrumb` is a single line with an ellipsis so a
 * long product name can never wrap into two lines and push the heading down at
 * 375px.
 *
 * R50: the eyebrow, the title, and the note are separate blocks with gaps.
 */
export default function PageHero({
  crumbs,
  title,
  eyebrow,
  note,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  eyebrow?: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="pagehero">
      <div className="wrap">
        <nav className="breadcrumb" aria-label="Remah roti">
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {i > 0 && <span aria-hidden="true"> / </span>}
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {note && <p className="lead mt-4">{note}</p>}
        {children}
      </div>
    </section>
  );
}
