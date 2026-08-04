"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  type Variants,
} from "framer-motion";

interface Metric {
  label: string;
  value: string | number;
  description?: string; // shown on hover; falls back to a generated line if omitted
}

interface Industry {
  metrics: Metric[];
}

// Small curated accent palette, cycled per card so each stat gets its own identity
// without breaking the site's existing border/card/muted-foreground token system.
const ACCENTS = [
  { ring: "#f97316", glow: "rgba(249,115,22,0.45)" }, // orange (existing brand accent)
  { ring: "#22d3ee", glow: "rgba(34,211,238,0.45)" }, // cyan
  { ring: "#a78bfa", glow: "rgba(167,139,250,0.45)" }, // violet
  { ring: "#34d399", glow: "rgba(52,211,153,0.45)" }, // emerald
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CIRCUMFERENCE = 2 * Math.PI * 40;

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const cardRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.4 });
  const [isActive, setIsActive] = useState(false); // hover OR keyboard focus
  const [displayValue, setDisplayValue] = useState("0");

  // Drive the number and the ring off one shared animation so they never drift out of sync.
  useEffect(() => {
    if (!isInView) return;

    const numericValue =
      typeof metric.value === "number"
        ? metric.value
        : Number(metric.value.replace(/[^0-9.]/g, "")) || 0;
    const clampedValue = Math.max(0, Math.min(100, numericValue));

    if (typeof metric.value === "number") {
      const controls = animate(0, clampedValue, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.12,
        onUpdate: (latest) => {
          setDisplayValue(String(Math.round(latest)));
          if (ringRef.current) {
            ringRef.current.style.strokeDashoffset = String(
              CIRCUMFERENCE - (CIRCUMFERENCE * latest) / 100
            );
          }
        },
      });
      return () => controls.stop();
    }

    setDisplayValue(metric.value);
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = String(
        CIRCUMFERENCE - (CIRCUMFERENCE * clampedValue) / 100
      );
    }
  }, [isInView, metric.value, index]);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      tabIndex={0}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      whileHover={{ y: -6 }}
      whileTap={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card/40 p-6 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        borderColor: isActive ? accent.ring : undefined,
        boxShadow: isActive ? `0 16px 40px -12px ${accent.glow}` : undefined,
      }}
    >
      {/* ambient glow, only rendered visually on interaction */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at center, ${accent.glow}, transparent 70%)`,
        }}
      />

      <div className="relative flex h-24 w-24 items-center justify-center">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-muted/30"
          />
          <circle
            ref={ringRef}
            cx="50"
            cy="50"
            r="40"
            strokeWidth="8"
            fill="transparent"
            stroke={accent.ring}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            strokeLinecap="round"
            style={{
              transition: "filter 0.3s ease",
              filter: isActive ? `drop-shadow(0 0 6px ${accent.glow})` : undefined,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold" style={{ color: accent.ring }}>
            {displayValue}
          </span>
        </div>
      </div>

      <span className="mt-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {metric.label}
      </span>

      <AnimatePresence>
        {isActive && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 10 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="px-1 text-center text-xs leading-relaxed text-muted-foreground/80"
          >
            {metric.description ?? `Measured performance for ${metric.label.toLowerCase()}.`}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function IndustryMetricsSection({ industry }: { industry: Industry }) {
  return (
    <section className="border-y border-border bg-card/60 backdrop-blur-sm">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4 lg:px-8"
      >
        {industry.metrics.map((metric, idx) => (
          <MetricCard key={metric.label} metric={metric} index={idx} />
        ))}
      </motion.div>
    </section>
  );
}