import type { CSSProperties } from "react";

export type Ratio = "1:1" | "4:5" | "3:4" | "4:3" | "3:2" | "16:9";

const RATIO_CLASS: Record<Ratio, string> = {
  "1:1": "ratio-1-1",
  "4:5": "ratio-4-5",
  "3:4": "ratio-3-4",
  "4:3": "ratio-4-3",
  "3:2": "ratio-3-2",
  "16:9": "ratio-16-9",
};

type Props = {
  /** MEDIA.md row id, e.g. "M09". Printed in the tag so a mismatch is visible. */
  id: string;
  /** exact target path under public/. This IS the filename Stage 4 must write. */
  path: string;
  type?: "image" | "video";
  ratio: Ratio;
  /** short human brief. The full prompt lives in MEDIA.md. */
  brief: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Annotated media placeholder, the Stage 3 to Stage 4 bridge.
 *
 * R15, the rule this component exists to make unbreakable: nothing here ever
 * points a `<video src>` or a `<source src>` at a file that is not on disk. A
 * `<video>` wired to a missing mp4 renders a frozen poster and reads as a
 * broken hero, which is exactly how dapur-tepat, portfolio-kilau,
 * gunung-rezeki, and sinyalkita shipped dead heroes.
 *
 * At Stage 3 every slot is a labelled box carrying its own generation brief.
 * Stage 5 swaps these for real `<img>` and `<video>` elements only once Stage 4
 * has landed the files at the exact paths named here.
 */
export default function Media({
  id,
  path,
  type = "image",
  ratio,
  brief,
  className = "",
  style,
}: Props) {
  return (
    <div
      className={`ph ${RATIO_CLASS[ratio]} ${className}`.trim()}
      style={style}
      data-media={path}
      data-type={type}
      data-ratio={ratio}
      data-media-id={id}
      role="img"
      aria-label={brief}
    >
      <span className="ph-tag">
        [MEDIA {id}] {brief} Rasio {ratio}.
      </span>
    </div>
  );
}
