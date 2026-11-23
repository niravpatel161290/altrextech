/**
 * A single block of article body content. Posts are stored as structured
 * blocks (rather than raw HTML/Markdown) so they render with the site's own
 * typography and need no extra parsing dependency.
 *
 * Text in paragraph, list, quote and table blocks supports two inline marks:
 *   **bold text**            → <strong>
 *   [link text](/some/path)  → internal <Link> (or external <a> for http URLs)
 */
export type BlogBlock =
  | { type: "paragraph"; text: string }
  /** Section heading, rendered as <h2>. */
  | { type: "heading"; text: string }
  /** Sub-section heading, rendered as <h3>. */
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  /** Question/answer list. Also emitted as FAQPage structured data. */
  | { type: "faq"; items: { question: string; answer: string }[] };

export type BlogCategory =
  | "Industrial IoT"
  | "Oil & Gas"
  | "Operations"
  | "SCADA"
  | "Energy"
  | "Cybersecurity"
  | "Company News";

export interface BlogPost {
  /** URL slug, e.g. "what-is-web-scada" → /blog/what-is-web-scada */
  slug: string;
  title: string;
  /** Short summary shown on cards and used as the meta description. */
  excerpt: string;
  category: BlogCategory;
  /** ISO date string, e.g. "2026-11-12". */
  publishedAt: string;
  author: { name: string; role?: string };
  /** Optional cover image (path under /public or absolute URL). */
  coverImage?: string;
  /** Descriptive alt text for the cover image (helps image SEO). */
  coverAlt?: string;
  tags?: string[];
  /** Mark one post as featured to pin it at the top of the blog page. */
  featured?: boolean;
  /** Optional SEO title override; defaults to "<title> | Altrex Blog". */
  seoTitle?: string;
  /** Optional meta description override; defaults to the excerpt. */
  seoDescription?: string;
  content: BlogBlock[];
}
