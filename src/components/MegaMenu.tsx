import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, ExternalLink, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import MenuLink, { isExternalHref } from "@/components/MenuLink";

// Card (ui/card.tsx) is a plain div and can't take framer-motion props
// (variants/initial/animate/exit). Where a card needs to animate, we render
// motion.div with these same base classes instead of <Card>.
const CARD_BASE_CLASSES =
  "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10";

export interface MegaMenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export interface MegaMenuCategory {
  title: string;
  icon: LucideIcon;
  items: MegaMenuItem[];
  viewAllHref: string;
  /** Footer link text. Defaults to `View All {title}` when omitted. */
  viewAllLabel?: string;
}

export interface MegaMenuFeatured {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  exploreAllLabel: string;
  exploreAllHref: string;
}

interface MegaMenuProps {
  isOpen: boolean;
  label: string;
  categories: MegaMenuCategory[];
  featured: MegaMenuFeatured;
  onLinkClick: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut", staggerChildren: 0.05, delayChildren: 0.04 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" } },
};

export default function MegaMenu({ isOpen, label, categories, onLinkClick }: MegaMenuProps) {

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="menu"
          aria-label={`${label} menu`}
          data-slot="card"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={cn(CARD_BASE_CLASSES, "fixed inset-x-0 top-16 z-40 hidden md:block rounded-t-none")}
        >
          <div className="mx-auto max-w-[1400px] px-6 py-6 lg:px-8">
            <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-[repeat(3,1fr)_320px] xl:gap-6">
              {categories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    data-slot="card"
                    variants={panelVariants}
                    className={cn(CARD_BASE_CLASSES, "flex h-full flex-col p-4")}
                  >
                    {/* Section header */}
                    <div className="mb-3 flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[color:var(--brand-secondary)]/15 to-[color:var(--brand-secondary)]/5 text-[color:var(--brand-secondary)] ring-1 ring-inset ring-[color:var(--brand-secondary)]/15 dark:text-[color:var(--brand-secondary)] dark:ring-[color:var(--brand-secondary)]/20">
                        <CategoryIcon className="h-4 w-4" />
                      </div>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-900 dark:text-[#F8FAFC]">
                        {category.title}
                      </h4>
                    </div>
                    <div className="mb-2 h-px w-full bg-gradient-to-r from-[color:var(--brand-secondary)]/50 via-[color:var(--brand-secondary)]/10 to-transparent dark:from-[color:var(--brand-secondary)]/40" />

                    {/* Cards */}
                    <ul className="flex flex-1 flex-col gap-1" role="none">
                      {category.items.map((item) => {
                        const ItemIcon = item.icon;
                        const itemIsExternal = isExternalHref(item.href);
                        return (
                          <li key={item.name} role="none">
                            <MenuLink
                              href={item.href}
                              onClick={onLinkClick}
                              role="menuitem"
                              className="group relative flex items-start gap-3 rounded-xl border-l-[3px] border-l-transparent p-2 pl-2.5 outline-none transition-all duration-[250ms] ease-out hover:-translate-y-0.5 hover:border-l-[color:var(--brand-secondary)] hover:bg-[color:var(--brand-secondary)]/5 focus-visible:border-l-[color:var(--brand-secondary)] focus-visible:bg-[color:var(--brand-secondary)]/10 focus-visible:ring-2 focus-visible:ring-[color:var(--brand-secondary)]/40 dark:hover:bg-white/[0.04] dark:hover:shadow-none dark:focus-visible:bg-white/[0.04]"
                            >
                              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand-secondary)]/10 text-[color:var(--brand-secondary)] ring-1 ring-inset ring-[color:var(--brand-secondary)]/20 transition-transform duration-[250ms] group-hover:scale-105">
                                <ItemIcon className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1">
                                  <span className="truncate text-[13px] font-semibold leading-snug text-slate-900 transition-colors duration-[250ms] group-hover:text-[color:var(--brand-secondary)] dark:text-[#F8FAFC] dark:group-hover:text-[color:var(--brand-secondary)]">
                                    {item.name}
                                  </span>
                                  {itemIsExternal ? (
                                    // Always-visible (not hover-only) so an external demo link is
                                    // recognizable as "leaves the site" before the user clicks it.
                                    <ExternalLink className="h-3 w-3 shrink-0 text-slate-400 dark:text-[#94A3B8]" />
                                  ) : (
                                    <ArrowRight className="h-3 w-3 shrink-0 -translate-x-1 text-[color:var(--brand-secondary)] opacity-0 transition-all duration-[250ms] group-hover:translate-x-0 group-hover:opacity-100 dark:text-[color:var(--brand-secondary)]" />
                                  )}
                                </div>
                                <p className="mt-0.5 text-[11px] leading-snug text-slate-500 line-clamp-2 dark:text-[#94A3B8]">
                                  {item.description}
                                </p>
                              </div>
                            </MenuLink>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Footer CTA — pinned to bottom regardless of item count */}
                    <MenuLink
                      href={category.viewAllHref}
                      onClick={onLinkClick}
                      className="group mt-auto flex items-center gap-1 border-t border-slate-100 pt-3 mt-3 text-xs font-semibold text-[color:var(--brand-secondary)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-secondary)]/40 dark:border-white/[0.08] dark:text-[color:var(--brand-secondary)]"
                    >
                      <span className="border-b border-transparent group-hover:border-[color:var(--brand-secondary)]">
                        {category.viewAllLabel ?? `View All ${category.title}`}
                      </span>
                      <ArrowRight className="h-3 w-3 transition-transform duration-[250ms] group-hover:translate-x-1" />
                    </MenuLink>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}