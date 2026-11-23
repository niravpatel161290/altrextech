import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { SectionBadge } from "@/components/ui/section-badge";
import { Seo } from "@/components/Seo";
import BlogCard from "@/components/BlogCard";
import { sortedBlogPosts } from "@/data/blogData";
import { cn } from "@/lib/utils";

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

const ALL = "All";

export default function BlogOverview() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(sortedBlogPosts.map((p) => p.category)))],
    []
  );

  const featuredPost =
    activeCategory === ALL
      ? sortedBlogPosts.find((p) => p.featured) ?? sortedBlogPosts[0]
      : undefined;

  const gridPosts = sortedBlogPosts.filter(
    (p) =>
      p !== featuredPost &&
      (activeCategory === ALL || p.category === activeCategory)
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <Seo
        title="Blog: Industrial IoT, SCADA & Digital Transformation Insights | Altrex"
        description="Insights from Altrex on industrial IoT, web SCADA, energy management, cybersecurity and digital transformation for industrial operations."
        path="/blog"
      />
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        {/* Page header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.div variants={headerFadeUp} initial="hidden" animate="visible">
            <SectionBadge
              title="INSIGHTS & UPDATES"
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
            The Altrex Blog
          </motion.h1>

          <motion.p
            variants={headerFadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mt-5 text-lg leading-relaxed text-muted-foreground"
          >
            Practical thinking on industrial IoT, SCADA, energy and the systems that keep critical operations running.
          </motion.p>
        </div>

        {/* Category filter */}
        {categories.length > 2 && (
          <div
            role="tablist"
            aria-label="Filter posts by category"
            className="mb-12 flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40",
                    isActive
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-border bg-card text-muted-foreground hover:border-orange-500/40 hover:text-orange-500"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        {/* Featured post */}
        {featuredPost && (
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <BlogCard post={featuredPost} featured />
          </motion.div>
        )}

        {/* Posts grid */}
        {gridPosts.length > 0 ? (
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {gridPosts.map((post) => (
              <motion.div key={post.slug} variants={fadeUpVariants}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          !featuredPost && (
            <p className="py-16 text-center text-muted-foreground">
              No posts in this category yet.
            </p>
          )
        )}
      </div>
    </div>
  );
}
