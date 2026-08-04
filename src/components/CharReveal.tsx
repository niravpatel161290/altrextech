import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Types ──────────────────────────────────────────────────────────────── */

export interface LineConfig {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharRevealProps {
  lines: (string | LineConfig)[];
  as?: "h1" | "h2" | "h3" | "h4" | "div" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
  lineGap?: string;
}

/* ── Component ──────────────────────────────────────────────────────────── */

export default function CharReveal({
  lines,
  as: Tag = "div",
  className = "",
  delay = 0,
  stagger = 0.022,
  immediate = false,
  lineGap = "mt-2",
}: CharRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });
  const shouldAnimate = immediate || inView;

  const normalizedLines: LineConfig[] = lines.map((l) =>
    typeof l === "string" ? { text: l } : l,
  );

  let globalIdx = 0;

  const renderChar = (char: string, style?: React.CSSProperties, cls?: string) => {
    const idx = globalIdx++;

    if (char === " ") {
      return (
        <span key={idx} style={{ display: "inline-block", minWidth: "0.25em" }}>
          {" "}
        </span>
      );
    }

    return (
      <span
        key={idx}
        style={{
          display: "inline-block",
          overflow: "hidden",
          verticalAlign: "bottom",
          lineHeight: "inherit",
        }}
      >
        <motion.span
          style={{ display: "inline-block", ...style }}
          className={cls ?? ""}
          initial={{ y: "110%" }}
          animate={shouldAnimate ? { y: "0%" } : { y: "110%" }}
          transition={{
            duration: 0.55,
            delay: delay + idx * stagger,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {char}
        </motion.span>
      </span>
    );
  };

  return (
    // @ts-expect-error — polymorphic element via 'as' prop
    <Tag ref={ref} className={className}>
      {normalizedLines.map((line, lineIdx) => {
        // Split into alternating word/whitespace tokens so we can keep
        // each word's characters glued together as one wrap unit, while
        // spaces stay as normal, natural break points between words.
        const tokens = line.text.split(/(\s+)/).filter((t) => t.length > 0);

        return (
          <span
            key={lineIdx}
            style={{ display: "block" }}
            className={lineIdx > 0 ? lineGap : ""}
          >
            {tokens.map((token, tokenIdx) => {
              const isWhitespace = /^\s+$/.test(token);

              if (isWhitespace) {
                return (
                  <span key={`ws-${tokenIdx}`}>
                    {[...token].map((char) => renderChar(char, line.style, line.className))}
                  </span>
                );
              }

              // Wrap the whole word so individual letter-spans can never
              // be split across a line break — only whitespace can wrap.
              return (
                <span
                  key={`w-${tokenIdx}`}
                  style={{ display: "inline-block", whiteSpace: "nowrap" }}
                >
                  {[...token].map((char) => renderChar(char, line.style, line.className))}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}