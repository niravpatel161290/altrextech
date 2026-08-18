import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import type { MegaMenuCategory, MegaMenuFeatured } from "@/components/MegaMenu";
import MenuLink, { isExternalHref } from "@/components/MenuLink";

interface MobileMegaAccordionProps {
  label: string;
  panelId: string;
  isOpen: boolean;
  onToggle: () => void;
  categories: MegaMenuCategory[];
  featured: MegaMenuFeatured;
  onLinkClick: () => void;
}

export default function MobileMegaAccordion({
  label,
  panelId,
  isOpen,
  onToggle,
  categories,
  featured,
  onLinkClick,
}: MobileMegaAccordionProps) {
  const FeaturedIcon = featured.icon;

  return (
    <div>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`w-full flex items-center justify-between px-2 py-3 text-sm font-medium transition-colors rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 ${
          isOpen ? "text-orange-500 bg-orange-500/5" : "hover:text-orange-500 hover:bg-orange-500/5"
        }`}
      >
        <span>{label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-orange-500" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-1 ml-2 max-h-[60vh] space-y-4 overflow-y-auto border-l-2 border-orange-500/20 py-2 pl-3 pr-1">
              {categories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <div key={category.title}>
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400">
                        <CategoryIcon className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        {category.title}
                      </p>
                    </div>
                    <ul className="space-y-0.5">
                      {category.items.map((item) => {
                        const Icon = item.icon;
                        const itemIsExternal = isExternalHref(item.href);
                        return (
                          <li key={item.name}>
                            <MenuLink
                              href={item.href}
                              onClick={onLinkClick}
                              className="group flex items-start gap-2.5 rounded-lg px-2 py-2 outline-none transition-all duration-150 hover:bg-orange-500/5 focus-visible:bg-orange-500/5 focus-visible:ring-2 focus-visible:ring-orange-500/40"
                            >
                              <div className="mt-0.5 shrink-0 rounded-md bg-orange-500/10 p-1.5 text-orange-500 ring-1 ring-inset ring-orange-500/20 transition-transform group-hover:scale-105">
                                <Icon className="h-3.5 w-3.5" />
                              </div>
                              <div className="min-w-0">
                                <span className="flex items-center gap-1 text-xs font-medium leading-snug text-foreground transition-colors group-hover:text-orange-500">
                                  {item.name}
                                  {itemIsExternal && <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />}
                                </span>
                                <span className="block text-[11px] leading-snug text-muted-foreground line-clamp-2">
                                  {item.description}
                                </span>
                              </div>
                            </MenuLink>
                          </li>
                        );
                      })}
                    </ul>
                    <MenuLink
                      href={category.viewAllHref}
                      onClick={onLinkClick}
                      className="mt-1 inline-flex items-center gap-1 px-2 text-xs font-semibold text-orange-600 dark:text-orange-400"
                    >
                      View all
                      <ArrowRight className="h-3 w-3" />
                    </MenuLink>
                  </div>
                );
              })}

              {/* Featured card */}
              <MenuLink
                href={featured.ctaHref}
                onClick={onLinkClick}
                className="relative mt-2 flex flex-col gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-[#0B0F19] p-4 dark:ring-1 dark:ring-white/[0.08]"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orange-500/25 blur-2xl" aria-hidden="true" />
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
                  <FeaturedIcon className="h-4 w-4" />
                </div>
                <div className="relative">
                  <p className="text-sm font-bold text-white">{featured.title}</p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-300 line-clamp-2">{featured.description}</p>
                </div>
                <span className="relative mt-1 inline-flex items-center gap-1 text-xs font-semibold text-orange-400">
                  {featured.ctaLabel}
                  <ArrowRight className="h-3 w-3" />
                </span>
              </MenuLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}