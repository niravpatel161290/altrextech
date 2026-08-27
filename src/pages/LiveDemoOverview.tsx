import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { LIVE_DEMOS } from "@/data/liveDemosData";
import { Seo } from "@/components/Seo";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const headerFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function LiveDemoOverview() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <Seo
        title="Live Demos | Altrex Digital Platforms Pvt Ltd"
        description="Explore interactive live demos of the Altrex industrial platform — SCADA dashboards, asset management, analytics and IIoT connectivity in action."
        path="/live-demo"
      />
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">

        {/* Page header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            variants={headerFadeUp}
            initial="hidden"
            animate="visible"
          >
            <SectionBadge
              title="LIVE DEMOS"
              dot={true}
              dotColor="bg-emerald-500"
              className="mb-8"
            />
          </motion.div>

          <motion.h1
            variants={headerFadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.05 }}
            className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Explore Our Platform Live
          </motion.h1>

          <motion.p
            variants={headerFadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mt-5 text-lg leading-relaxed text-muted-foreground"
          >
            {LIVE_DEMOS.length} interactive demos, hosted live. Each one opens in a new tab.
          </motion.p>
        </div>

        {/* Live demo grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {LIVE_DEMOS.map((demo) => {
            const Icon = demo.icon;

            return (
              <motion.div key={demo.name} variants={fadeUpVariants}>
                <a
                  href={demo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col rounded-2xl border border-border bg-[var(--bg-surface)] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-[var(--bg-surface)]/80 backdrop-blur-sm"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h2 className="mb-2 flex items-start gap-1.5 text-lg font-bold tracking-tight text-foreground">
                    {demo.name}
                    {/* Signals "opens elsewhere" before the click, same as the header menu. */}
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-orange-500" />
                  </h2>

                  <p className="text-[13px] leading-relaxed text-muted-foreground line-clamp-2 flex-1">
                    {demo.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1.5 text-[12px] font-semibold text-orange-500 transition-all duration-300 group-hover:gap-2.5">
                    Launch Demo
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </a>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}