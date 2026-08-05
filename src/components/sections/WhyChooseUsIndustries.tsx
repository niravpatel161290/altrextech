// WhyChooseBento.tsx
// Drop-in replacement for the "Why Choose" section inside ServicePage.tsx
// Each bento cell renders a different visual component based on what the
// differentiator is actually claiming — speed, cost, scale, reliability, etc.
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  CheckCircle2, XCircle, Zap, TrendingDown, Layers,
  Shield, Brain, Link2, Clock, ArrowRight,
} from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
// ─────────────────────────────────────────────────────────────────────────────
// Visual type detector — reads the item title and returns which cell component
// to render. Falls back to a clean stat/tick card for unrecognised titles.
// ─────────────────────────────────────────────────────────────────────────────
type VisualType =
  | "speed"
  | "cost"
  | "scale"
  | "reliability"
  | "unification"
  | "compatibility"
  | "intelligence"
  | "security"
  | "expertise"
  | "default";
function detectType(title: string): VisualType {
  const t = title.toLowerCase();
  if (t.includes("time-to-value") || t.includes("faster") || t.includes("deploy")) return "speed";
  if (t.includes("cost") || t.includes("tco") || t.includes("capital")) return "cost";
  if (t.includes("scal")) return "scale";
  if (t.includes("reliab") || t.includes("continuous") || t.includes("proactive") || t.includes("edge")) return "reliability";
  if (t.includes("centraliz") || t.includes("unified") || t.includes("single point") || t.includes("end-to-end") || t.includes("integrated command")) return "unification";
  if (t.includes("vendor") || t.includes("agnostic") || t.includes("multi-vendor") || t.includes("compat")) return "compatibility";
  if (t.includes("ai") || t.includes("intelligence") || t.includes("real-time") || t.includes("visibility")) return "intelligence";
  if (t.includes("security") || t.includes("secure") || t.includes("cybersecurity")) return "security";
  if (t.includes("expertise") || t.includes("experience") || t.includes("knowledge")) return "expertise";
  return "default";
}
// ─────────────────────────────────────────────────────────────────────────────
// Bento size assignment — first item always large (col-span-2), rest compact
// unless there are only 2 items (then both medium). Adjust to taste.
// ─────────────────────────────────────────────────────────────────────────────
function getBentoSize(idx: number, total: number): string {
  if (total === 2) return "col-span-1 row-span-1";
  if (total === 3) return idx === 0 ? "sm:col-span-2" : "col-span-1";
  if (total === 4) return idx === 0 ? "sm:col-span-2" : "col-span-1";
  // 5 items: first wide, second tall, rest normal
  if (total === 5) {
    if (idx === 0) return "sm:col-span-2";
    if (idx === 1) return "sm:row-span-2 col-span-1";
    return "col-span-1";
  }
  return "col-span-1";
}
// ─────────────────────────────────────────────────────────────────────────────
// Individual visual components
// ─────────────────────────────────────────────────────────────────────────────
// SPEED — animated timeline bar: "months" shrinks, "weeks" grows
function SpeedVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mt-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
        <XCircle size={13} className="text-red-400 shrink-0" />
        <span className="w-16 shrink-0">Before</span>
        <div className="flex-1 h-2 rounded-full bg-red-500/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-red-500/60"
            initial={{ width: "0%" }}
            animate={inView ? { width: "85%" } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          />
        </div>
        <span className="text-red-400 shrink-0">Months</span>
      </div>
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
        <span className="w-16 shrink-0">Altrex</span>
        <div className="flex-1 h-2 rounded-full bg-emerald-500/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-emerald-500"
            initial={{ width: "0%" }}
            animate={inView ? { width: "28%" } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>
        <span className="text-emerald-400 shrink-0">Weeks</span>
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        <Zap size={12} className="text-orange-500" />
        <span className="font-mono text-xs text-orange-500 uppercase tracking-widest">3× faster deployment</span>
      </div>
    </div>
  );
}
// COST — downward trending bar chart with ₹ savings callout
function CostVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const bars = [100, 82, 65, 48, 30];
  return (
    <div ref={ref} className="mt-4">
      <div className="flex items-end gap-1.5 h-10">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ background: `rgba(249,115,22,${0.9 - i * 0.15})` }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${h}%` } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground">Year 1 → Year 5</span>
        <div className="flex items-center gap-1">
          <TrendingDown size={12} className="text-emerald-400" />
          <span className="font-mono text-xs text-emerald-400">−70% TCO</span>
        </div>
      </div>
    </div>
  );
}
// SCALE — animated dot grid that expands outward from center
function ScaleVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const rings = [1, 4, 8, 12]; // dots per ring
  const radii = [8, 16, 24, 32]; // px — all fit inside the 80px (w-20) container
  const colors = ["#f97316", "#fb923c", "#fdba74", "#fed7aa"];
  return (
    <div ref={ref} className="mt-4 flex items-center justify-center">
      <div className="relative w-20 h-20 overflow-hidden">
        {rings.map((count, ringIdx) => {
          const r = radii[ringIdx];
          return Array.from({ length: count }).map((_, dotIdx) => {
            const angle = (dotIdx / count) * Math.PI * 2;
            const x = 40 + Math.cos(angle) * r - 2;
            const y = 40 + Math.sin(angle) * r - 2;
            return (
              <motion.div
                key={`${ringIdx}-${dotIdx}`}
                className="absolute w-1 h-1 rounded-full"
                style={{ left: x, top: y, background: colors[ringIdx] }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + ringIdx * 0.15 + dotIdx * 0.02 }}
              />
            );
          });
        })}
        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-orange-500" />
      </div>
      <div className="ml-3 flex flex-col gap-0.5">
        <span className="font-mono text-xs text-muted-foreground">1 site</span>
        <div className="w-px h-2 bg-orange-500/30 ml-1" />
        <span className="font-mono text-xs text-orange-500">1000+ sites</span>
      </div>
    </div>
  );
}
// RELIABILITY — uptime ring with animated fill
function ReliabilityVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const UPTIME = 99.9;
  const R = 28, C = 2 * Math.PI * R;
  const filled = (UPTIME / 100) * C;
  return (
    <div ref={ref} className="mt-4 flex items-center gap-4">
      <div className="relative shrink-0">
        <svg width="72" height="72" viewBox="0 0 72 72">
          {/* Track */}
          <circle cx="36" cy="36" r={R} fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="4" />
          {/* Animated fill */}
          <motion.circle
            cx="36" cy="36" r={R}
            fill="none"
            stroke="#f97316"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: C - filled } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
            style={{ transform: "rotate(-90deg)", transformOrigin: "36px 36px" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[11px] font-bold text-orange-500">99.9%</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {["Monitoring", "Auto-recovery", "Redundancy"].map((item, i) => (
          <motion.div
            key={item}
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.12 }}
          >
            <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
            <span className="font-mono text-xs text-muted-foreground">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
// UNIFICATION — many inputs converging to one output
function UnificationVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const inputs = ["System A", "System B", "System C"];
  return (
    <div ref={ref} className="mt-4 flex items-center gap-2">
      <div className="flex flex-col gap-1.5">
        {inputs.map((label, i) => (
          <motion.div
            key={label}
            className="rounded-md border border-border bg-muted/40 px-2 py-1 font-mono text-xs text-muted-foreground"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            {label}
          </motion.div>
        ))}
      </div>
      {/* Converging lines via SVG */}
      <svg width="36" height="56" viewBox="0 0 36 56" className="shrink-0">
        {[8, 28, 48].map((y, i) => (
          <motion.path
            key={i}
            d={`M 0 ${y} C 18 ${y}, 18 28, 36 28`}
            fill="none"
            stroke="#f97316"
            strokeWidth="1"
            strokeOpacity="0.6"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
          />
        ))}
      </svg>
      <motion.div
        className="flex h-12 w-20 items-center justify-center rounded-xl border border-orange-500/40 bg-orange-500/10 font-mono text-[9px] font-bold text-orange-500 text-center leading-tight"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        ONE<br/>PLATFORM
      </motion.div>
    </div>
  );
}
// COMPATIBILITY — vendor logo grid with checkmarks cycling
function CompatibilityVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const vendors = ["MODBUS", "OPC-UA", "MQTT", "REST", "DNP3", "BACnet"];
  return (
    <div ref={ref} className="mt-4 flex flex-wrap gap-1.5">
      {vendors.map((v, i) => (
        <motion.div
          key={v}
          className="flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2 py-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1 + i * 0.07 }}
        >
          <CheckCircle2 size={11} className="text-emerald-400" />
          <span className="font-mono text-xs text-muted-foreground">{v}</span>
        </motion.div>
      ))}
      <motion.div
        className="flex items-center gap-1 rounded-md border border-orange-500/20 bg-orange-500/5 px-2 py-1"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
      >
        <span className="font-mono text-xs text-orange-500">+40 more</span>
      </motion.div>
    </div>
  );
}
// INTELLIGENCE — animated pulse radar sweep
function IntelligenceVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mt-4 flex items-center gap-4">
      <div className="relative shrink-0 w-16 h-16">
        <svg width="64" height="64" viewBox="0 0 64 64">
          {[24, 16, 8].map((r, i) => (
            <circle key={i} cx="32" cy="32" r={r} fill="none"
              stroke="rgba(249,115,22,0.15)" strokeWidth="1" />
          ))}
          {/* Spinner wrapped in a <g> so SVG's own rotate() pivots correctly */}
          {inView && (
            <motion.line
              x1="32" y1="50" x2="32" y2="10"
              stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.8"
              style={{ transformOrigin: "32px 32px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
          )}
          {/* blip */}
          <motion.circle cx="44" cy="18" r="2.5" fill="#f97316"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          />
        </svg>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <Brain size={12} className="text-orange-500" />
          <span className="font-mono text-xs text-muted-foreground">AI Detection</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap size={12} className="text-orange-500" />
          <span className="font-mono text-xs text-muted-foreground">&lt;50ms latency</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-orange-500" />
          <span className="font-mono text-xs text-muted-foreground">24×7 active</span>
        </div>
      </div>
    </div>
  );
}
// SECURITY — shield with animated lock
function SecurityVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const checks = ["IEC-62443", "TLS 1.3", "RBAC", "Audit Trail"];
  return (
    <div ref={ref} className="mt-4 flex items-start gap-3">
      <motion.div
        className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20"
        animate={inView ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
      >
        <Shield size={22} className="text-orange-500" />
      </motion.div>
      <div className="flex flex-col gap-1.5">
        {checks.map((c, i) => (
          <motion.div
            key={c}
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
            <span className="font-mono text-xs text-muted-foreground">{c}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
// EXPERTISE — animated experience ticker
function ExpertiseVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const stats = [
    { value: "10+", label: "Years" },
    { value: "50+", label: "Deployments" },
    { value: "9", label: "Sectors" },
  ];
  return (
    <div ref={ref} className="mt-4 grid grid-cols-3 gap-2">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className="flex flex-col items-center rounded-lg border border-border bg-muted/30 py-2"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 + i * 0.12 }}
        >
          <span className="font-mono text-base font-bold text-orange-500">{s.value}</span>
          <span className="font-mono text-xs text-muted-foreground mt-0.5">{s.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
// DEFAULT — clean tick/cross comparison
function DefaultVisual({ title: _title }: { title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mt-4 flex flex-col gap-1.5">
      {["Without Altrex", "With Altrex"].map((label, i) => (
        <motion.div
          key={label}
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: i === 0 ? -6 : 6 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.15 + i * 0.15 }}
        >
          {i === 0
            ? <XCircle size={12} className="text-red-400 shrink-0" />
            : <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />}
          <span className="font-mono text-xs text-muted-foreground">{label}</span>
          <div className={`ml-auto h-1.5 rounded-full ${i === 0 ? "w-12 bg-red-500/30" : "w-24 bg-emerald-500/50"}`} />
        </motion.div>
      ))}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// Render the right visual for each item
// ─────────────────────────────────────────────────────────────────────────────
function ItemVisual({ title }: { title: string }) {
  const type = detectType(title);
  switch (type) {
    case "speed":         return <SpeedVisual />;
    case "cost":          return <CostVisual />;
    case "scale":         return <ScaleVisual />;
    case "reliability":   return <ReliabilityVisual />;
    case "unification":   return <UnificationVisual />;
    case "compatibility": return <CompatibilityVisual />;
    case "intelligence":  return <IntelligenceVisual />;
    case "security":      return <SecurityVisual />;
    case "expertise":     return <ExpertiseVisual />;
    default:              return <DefaultVisual title={title} />;
  }
}
// ─────────────────────────────────────────────────────────────────────────────
// Icon per type
// ─────────────────────────────────────────────────────────────────────────────
function ItemIcon({ title }: { title: string }) {
  const type = detectType(title);
  const iconProps = { size: 16, className: "text-orange-500" };
  switch (type) {
    case "speed":         return <Zap {...iconProps} />;
    case "cost":          return <TrendingDown {...iconProps} />;
    case "scale":         return <Layers {...iconProps} />;
    case "reliability":   return <CheckCircle2 {...iconProps} />;
    case "unification":   return <Link2 {...iconProps} />;
    case "compatibility": return <ArrowRight {...iconProps} />;
    case "intelligence":  return <Brain {...iconProps} />;
    case "security":      return <Shield {...iconProps} />;
    default:              return <CheckCircle2 {...iconProps} />;
  }
}
// ─────────────────────────────────────────────────────────────────────────────
// Main bento section
// ─────────────────────────────────────────────────────────────────────────────
interface WhyChooseItem {
  title: string;
  description: string;
}
interface WhyChooseBentoProps {
  title: string;
  items: WhyChooseItem[];
}
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
export default function WhyChooseBento({ title, items }: WhyChooseBentoProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-14 space-y-2">
          <SectionBadge title="Differentiators" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
        </motion.div>
        {/* Bento grid */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min"
        >
          {items.map((item, idx) => {
            const sizeClass = getBentoSize(idx, items.length);
            return (
              <motion.div
                key={`${item.title}-${idx}`}
                variants={cardVariant}
                className={`
                  relative flex flex-col rounded-2xl border border-border
                  bg-background p-6 shadow-sm overflow-hidden
                  hover:border-orange-500/25 transition-colors duration-300
                  ${sizeClass}
                `}
              >
                {/* Title row */}
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/15">
                    <ItemIcon title={item.title} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">
                    {item.title}
                  </h3>
                </div>
                {/* Unique visual per differentiator type */}
                <ItemVisual title={item.title} />
                {/* Description — always below the visual */}
                {item.description && (
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground border-t border-border pt-3">
                    {item.description}
                  </p>
                )}
                {/* Index number badge — top right corner */}
                <div className="absolute right-4 top-4 pointer-events-none select-none">
                  <span className="font-mono text-3xl font-black italic tracking-tighter text-zinc-500/20">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

