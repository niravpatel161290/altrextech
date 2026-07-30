import { motion, type Variants } from "framer-motion";
import {
  Zap,
  Activity,
  Database,
  Server,
  Radio,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import React, { useState } from "react";
import ScrambleCounter from "../ScrambleCounter";
import { SectionBadge } from "../ui/section-badge";
import { Badge } from "../ui/badge";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";

// ── Types ─────────────────────────────────────────────────────────────────────

interface RingStat {
  display: string;
  subtitle: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  scrambleTarget: number;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const ringStats: RingStat[] = [
  {
    display: "2K+",
    subtitle: "Active Nodes",
    label: "Connected Assets",
    icon: Server,
    scrambleTarget: 2_000,
  },
  {
    display: "10M+",
    subtitle: "Processed",
    label: "Daily Data Points",
    icon: Database,
    scrambleTarget: 10,
  },
  {
    display: "10+",
    subtitle: "Global",
    label: "Industrial Deployments",
    icon: Radio,
    scrambleTarget: 10,
  },
  {
    display: "120+",
    subtitle: "Facilities",
    label: "Operational Sites",
    icon: MapPin,
    scrambleTarget: 120,
  },
  {
    display: "99.99%",
    subtitle: "SLA",
    label: "Platform Availability",
    icon: ShieldCheck,
    scrambleTarget: 100,
  },
  {
    display: "24×7",
    subtitle: "Continuous",
    label: "Operational Monitoring",
    icon: Activity,
    scrambleTarget: 24,
  },
];


// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({ stat }: { stat: RingStat }) {
  const Icon = stat.icon;

  return (
    <div className="group relative flex items-center gap-5 rounded-2xl border border-border bg-card/40 p-6 transition-all duration-300 hover:bg-card/80 hover:-translate-y-1">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-secondary text-accent border border-accent">
        <Icon size={30} />
      </div>

      <div className="flex flex-col justify-between h-16 py-0.5">
        <span className="font-mono text-3xl font-bold leading-none tracking-tight text-foreground">
          <ScrambleCounter
            target={stat.scrambleTarget}
            finalText={stat.display}
          />
        </span>
        <h3 className="text-[13px] font-medium leading-none text-muted-foreground">
          {stat.label}
        </h3>
        {stat.subtitle && (
          <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest leading-none">
            {stat.subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────

interface DayData {
  day: string;
  revenue: number;
  sessions: number;
}

// ── Mock data — replace with your API response ──────────────────────────
// Shape stays the same: { day, revenue, sessions }[]

const data: DayData[] = [
  { day: "Mon", revenue: 85000, sessions: 260 },
  { day: "Tue", revenue: 91870, sessions: 341 },
  { day: "Wed", revenue: 68000, sessions: 300 },
  { day: "Thu", revenue: 98000, sessions: 430 },
  { day: "Fri", revenue: 132000, sessions: 470 },
  { day: "Sat", revenue: 158000, sessions: 580 },
  { day: "Sun", revenue: 105130, sessions: 450 },
];

const SESSIONS_COLOR = "#F59E0B";

// ── Helpers ───────────────────────────────────────────────────────────────

function formatRupees(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function formatLakhs(value: number) {
  return `₹${(value / 100000).toFixed(2)}L`;
}

// ── Custom tooltip ────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null;

  const revenue = payload.find((p) => p.dataKey === "revenue")?.value ?? 0;

  return (
    <div className="rounded-xl border border-border bg-popover/90 backdrop-blur-xl p-3 shadow-2xl min-w-[170px]">
      <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full shrink-0"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <span className="text-sm text-muted-foreground">Revenue:</span>
        <span className="text-sm font-semibold text-foreground ml-auto">
          {formatRupees(revenue as number)}
        </span>
      </div>
    </div>
  );
}

// ── Custom x-axis tick — bolds + colors the label under the active point ──

function XAxisTick({
  x,
  y,
  payload,
  activeDay,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
  activeDay: string | null;
}) {
  const isActive = payload?.value === activeDay;
  return (
    <text
      x={x}
      y={(y ?? 0) + 16}
      textAnchor="middle"
      fontSize={12}
      fontWeight={isActive ? 600 : 400}
      fill={isActive ? "var(--primary)" : "var(--muted-foreground)"}
    >
      {payload?.value}
    </text>
  );
}

// ── Legend ────────────────────────────────────────────────────────────────

function ChartLegend() {
  return (
    <div className="flex items-center justify-center gap-6 mt-3">
      <div className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 rounded-sm"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <span className="text-sm text-muted-foreground">Revenue</span>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────

function RevenueSessionsChart() {
  const [activeDay, setActiveDay] = useState<string | null>(null);

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            Revenue — Last 7 Days
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            All stations combined
          </p>
        </div>
        <div className="text-right">
          <p className="text-base font-bold text-foreground">
            {formatLakhs(totalRevenue)}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--primary)" }}>
            7-day total
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            onMouseMove={(state) => {
              if (state.isTooltipActive && typeof state.activeLabel === "string") {
                setActiveDay(state.activeLabel);
              }
            }}
            onMouseLeave={() => setActiveDay(null)}
          >
            <CartesianGrid vertical={false} stroke="var(--border)" />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={<XAxisTick activeDay={activeDay} />}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${v / 1000}K`}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              width={45}
            />

            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />

            <Bar
              dataKey="revenue"
              fill="var(--primary)"
              radius={[6, 6, 0, 0]}
              barSize={56}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <ChartLegend />
    </div>
  );
}

// ── Variants ──────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── StatisticsSection ─────────────────────────────────────────────────────────

const StatisticsSection = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-28">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-16">
          <div>
            <motion.div variants={fadeUp}>
              <SectionBadge
                title="STATISTICS AND METRICS"
                dot={true}
                dotColor="bg-emerald-500"
                className="mb-8"
              />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Unified Industrial Operations at Enterprise Scale
            </motion.h2>
          </div>

          {/* Live throughput badge */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="flex flex-shrink-0 items-center gap-4 rounded-2xl border border-border px-6 py-4 shadow-lg backdrop-blur-md"
          >
            <span className="relative flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            </span>
            <div>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                1.2M/s
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                Live throughput
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats grid */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16"
        >
          {ringStats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-[var(--text-muted)] opacity-10 mb-12" />

        {/* Throughput chart panel */}
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border border-border bg-card/60 p-8"
        >
          {/* Chart header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              Throughput growth{" "}
              <span className="text-muted-foreground font-medium text-sm">
                — Jan to Dec 2024
              </span>
            </h3>
            <Badge variant="outline" className="p-3 space-x-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-green-600">Live Sync</span>
            </Badge>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-gradient-to-b from-orange-500 to-orange-600 shadow-sm" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Data throughput{" "}
                <span className="font-normal text-gray-400">(M events/s)</span>
              </span>
            </div>
            <Badge variant="outline" className="p-3 space-x-1 ml-auto flex items-center">
              <Zap size={16} className="text-green-600" />
              <span className="text-green-600">
                +128% this year
              </span>
            </Badge>
          </div>

          {/* <ThroughputChart /> */}
          <RevenueSessionsChart />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StatisticsSection;
