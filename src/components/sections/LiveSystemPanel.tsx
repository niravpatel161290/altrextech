import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import type { Solution } from "@/data/solutionsData";
import {
  GAUGE_CENTER,
  GAUGE_RADIUS,
  GAUGE_START_ANGLE,
  GAUGE_END_ANGLE,
  GAUGE_TRACK_PATH,
  GAUGE_TICK_VALUES,
  angleForValue,
  describeArc,
  pointOnGauge,
  getLoadZone,
} from "@/lib/gauge";

interface LiveSystemPanelProps {
  solution: Solution;
}

const METRIC_COLORS = ["#059669", "#0891b2", "#d97706"];

export default function LiveSystemPanel({ solution }: LiveSystemPanelProps) {
  const metrics = solution.metrics.slice(0, 3);
  const techItems = Array.from(
    new Set(solution.capabilities.flatMap((c) => c.items))
  ).slice(0, 6);

  const [activeChannel, setActiveChannel] = useState(0);
  const [loadValue, setLoadValue] = useState(30);
  const [uptime, setUptime] = useState(0);

  const loadMV = useMotionValue(30);
  const needleAngle = useTransform(loadMV, (v) => angleForValue(v));
  const needleX = useTransform(needleAngle, (a) => pointOnGauge(72, a).x);
  const needleY = useTransform(needleAngle, (a) => pointOnGauge(72, a).y);
  const progress = useTransform(loadMV, [0, 100], [0, 1]);

  useEffect(() => {
    const controls = animate(loadMV, [30, 74, 52, 88, 61, 30], {
      duration: 16,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const unsubscribe = loadMV.on("change", (v) => setLoadValue(Math.round(v)));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [loadMV]);

  useEffect(() => {
    if (techItems.length === 0) return;
    const interval = setInterval(() => {
      setActiveChannel((prev) => (prev + 1) % techItems.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [techItems.length]);

  useEffect(() => {
    const interval = setInterval(() => setUptime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const zone = getLoadZone(loadValue);
  const hh = String(Math.floor(uptime / 3600)).padStart(2, "0");
  const mm = String(Math.floor((uptime % 3600) / 60)).padStart(2, "0");
  const ss = String(uptime % 60).padStart(2, "0");

  return (
    <div className="relative rounded-2xl border border-border bg-card shadow-xl overflow-hidden flex flex-col h-full w-full max-w-md ml-auto">
      {/* Device plaque */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600" />
          </span>
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            ALTREX-01 &middot; LIVE
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground/70 tabular-nums tracking-widest">
          UPTIME {hh}:{mm}:{ss}
        </span>
      </div>

      {/* Body */}
      <div
        className="p-6 flex-1 flex flex-col gap-6 bg-card/40 backdrop-blur-sm"
      >
        {/* Radial gauge */}
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 200 200" className="w-28 h-28 shrink-0">
            <path d={describeArc(GAUGE_RADIUS, GAUGE_START_ANGLE, angleForValue(60))} fill="none" stroke="#059669" strokeOpacity={0.18} strokeWidth={10} strokeLinecap="round" />
            <path d={describeArc(GAUGE_RADIUS, angleForValue(60), angleForValue(85))} fill="none" stroke="#0891b2" strokeOpacity={0.18} strokeWidth={10} strokeLinecap="round" />
            <path d={describeArc(GAUGE_RADIUS, angleForValue(85), GAUGE_END_ANGLE)} fill="none" stroke="#d97706" strokeOpacity={0.18} strokeWidth={10} strokeLinecap="round" />

            <motion.path
              d={GAUGE_TRACK_PATH}
              fill="none"
              stroke={zone.color}
              strokeWidth={8}
              strokeLinecap="round"
              style={{ pathLength: progress, filter: `drop-shadow(0 0 2px ${zone.color}60)` }}
            />

            {GAUGE_TICK_VALUES.map((v) => {
              const angle = angleForValue(v);
              const inner = pointOnGauge(88, angle);
              const outer = pointOnGauge(96, angle);
              return (
                <line key={v} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="currentColor" className="text-muted-foreground/30" strokeWidth={1.5} />
              );
            })}

            <motion.line x1={GAUGE_CENTER} y1={GAUGE_CENTER} x2={needleX} y2={needleY} stroke={zone.color} strokeWidth={2.5} strokeLinecap="round" />
            <circle cx={GAUGE_CENTER} cy={GAUGE_CENTER} r={5} fill={zone.color} />
          </svg>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">System Load</span>
            <span className="font-mono text-2xl font-bold text-foreground tabular-nums">{loadValue}%</span>
            <span
              className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded w-fit"
              style={{ color: zone.color, backgroundColor: `${zone.color}14` }}
            >
              {zone.label}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className={`border border-border rounded-xl p-3 bg-background/50 flex flex-col gap-1 ${i === 2 ? "col-span-2" : ""}`}
            >
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: METRIC_COLORS[i % METRIC_COLORS.length] }} />
                <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider truncate">
                  {metric.label}
                </span>
              </div>
              <div
                className="font-mono text-lg font-bold truncate"
                style={{ color: METRIC_COLORS[i % METRIC_COLORS.length] }}
              >
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-2 border-t border-border">
          <div className="font-mono text-[10px] text-muted-foreground uppercase mt-3 mb-3 tracking-widest">
            Comm Channels
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {techItems.map((item, idx) => {
              const isActive = activeChannel === idx;
              return (
                <div key={item} className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-[9px] text-muted-foreground/50 tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full shrink-0"
                    animate={{
                      backgroundColor: isActive ? "#0891b2" : "var(--border)",
                      boxShadow: isActive ? "0 0 6px #0891b299" : "0 0 0px transparent",
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  <span
                    className={`font-mono text-[10px] truncate transition-colors duration-500 ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}