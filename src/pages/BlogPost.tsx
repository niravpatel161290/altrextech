import { Link, useParams } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/CTASection";
import BlogCard, { BlogMeta } from "@/components/BlogCard";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blogData";
import type { BlogBlock } from "@/types/blog";
import type { ReactNode } from "react";

const SITE_URL = "https://www.altrextech.com";

/** Matches **bold** and [text](href) inline marks. */
const INLINE_PATTERN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

const linkClass =
  "font-medium text-orange-500 underline decoration-orange-500/30 underline-offset-4 transition-colors hover:decoration-orange-500";

/** Renders inline marks: **bold** and [link text](/path or https://...). */
function renderInline(text: string): ReactNode[] {
  return text.split(INLINE_PATTERN).map((part, i) => {
    if (!part) return null;

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {renderInline(part.slice(2, -2))}
        </strong>
      );
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith("http") ? (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
        </a>
      ) : (
        <Link key={i} to={href} className={linkClass}>
          {label}
        </Link>
      );
    }

    return part;
  });
}

/** Encodes spaces etc. in image paths so share/structured-data URLs are valid. */
function absoluteImageUrl(src: string): string {
  return src.startsWith("http") ? src : encodeURI(`${SITE_URL}${src}`);
}

const headerFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function renderBlock(block: BlogBlock, index: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2 key={index} className="mt-12 mb-4 text-2xl font-bold tracking-tight text-foreground">
          {block.text}
        </h2>
      );
    case "subheading":
      return (
        <h3 key={index} className="mt-8 mb-3 text-lg font-bold tracking-tight text-foreground sm:text-xl">
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p key={index} className="mb-6 text-base leading-8 text-muted-foreground sm:text-[17px]">
          {renderInline(block.text)}
        </p>
      );
    case "table":
      return (
        <div key={index} className="my-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-120 border-collapse text-left text-sm sm:text-[15px]">
            {block.caption && (
              <caption className="px-4 py-3 text-left text-sm text-muted-foreground">
                {block.caption}
              </caption>
            )}
            <thead className="bg-orange-500/10">
              <tr>
                {block.headers.map((header, i) => (
                  <th key={i} scope="col" className="px-4 py-3 font-semibold text-foreground">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-border">
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row" className="px-4 py-3 align-top font-semibold text-foreground">
                        {renderInline(cell)}
                      </th>
                    ) : (
                      <td key={c} className="px-4 py-3 align-top leading-7 text-muted-foreground">
                        {renderInline(cell)}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag
          key={index}
          className={`mb-6 space-y-2 pl-6 text-base leading-8 text-muted-foreground marker:text-orange-500 sm:text-[17px] ${
            block.ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ListTag>
      );
    }
    case "quote":
      return (
        <blockquote
          key={index}
          className="my-10 border-l-4 border-orange-500 bg-orange-500/5 py-4 pl-6 pr-4 text-lg font-medium italic leading-8 text-foreground"
        >
          <p>{renderInline(block.text)}</p>
          {block.cite && (
            <footer className="mt-2 text-sm not-italic text-muted-foreground">— {block.cite}</footer>
          )}
        </blockquote>
      );
    case "image":
      return (
        <figure key={index} className="my-10">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="w-full rounded-2xl border border-border"
          />
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "faq":
      return (
        <div key={index} className="mb-6 divide-y divide-border rounded-2xl border border-border">
          {block.items.map((item, i) => (
            <div key={i} className="px-5 py-5 sm:px-6">
              <h3 className="text-base font-semibold text-foreground sm:text-lg">{item.question}</h3>
              <p className="mt-2 text-base leading-7 text-muted-foreground">
                {renderInline(item.answer)}
              </p>
            </div>
          ))}
        </div>
      );
  }
}

/** Strips **bold** / [link](href) marks for plain-text structured data. */
function toPlainText(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug ?? "");

  // ── 404 ──
  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Seo
          title="Article Not Found | Altrex Digital Platforms Pvt Ltd"
          description="The article you're looking for doesn't exist or may have moved."
          path={`/blog/${slug ?? ""}`}
          noindex
        />
        <div className="text-center">
          <p className="mb-4 font-mono text-sm text-muted-foreground">404 — ARTICLE NOT FOUND</p>
          <Link to="/blog">
            <Button variant="ghost" className="cursor-pointer text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedPosts(post);
  const path = `/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: post.category,
    ...(post.tags?.length && { keywords: post.tags.join(", ") }),
    author: { "@type": "Organization", name: post.author.name, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Altrex Digital Platforms Pvt Ltd",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
    ...(post.coverImage && { image: absoluteImageUrl(post.coverImage) }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}${path}` },
    ],
  };

  const faqItems = post.content.flatMap((block) => (block.type === "faq" ? block.items : []));
  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: toPlainText(item.answer) },
          })),
        }
      : null;

  return (
    <div className="relative min-h-screen bg-transparent">
      <Seo
        title={post.seoTitle ?? `${post.title} | Altrex Blog`}
        description={post.seoDescription ?? post.excerpt}
        path={path}
        image={post.coverImage && absoluteImageUrl(post.coverImage)}
        type="article"
      />
      <Helmet>
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:section" content={post.category} />
        {post.tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        {post.coverAlt && <meta property="og:image:alt" content={post.coverAlt} />}
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        {faqJsonLd && (
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        )}
      </Helmet>

      <article className="mx-auto max-w-3xl px-6 pt-28 pb-12 lg:px-8">
        <motion.div variants={headerFadeUp} initial="hidden" animate="visible">
          <Link
            to="/blog"
            className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-orange-500"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All articles
          </Link>

          <div className="mb-5">
            <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange-500">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
            <div>
              <p className="text-sm font-semibold text-foreground">{post.author.name}</p>
              {post.author.role && (
                <p className="text-[12px] text-muted-foreground">{post.author.role}</p>
              )}
            </div>
            <BlogMeta post={post} />
          </div>
        </motion.div>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.coverAlt ?? post.title}
            className="mt-10 w-full rounded-2xl border border-border object-cover"
          />
        )}

        <div className="mt-10">{post.content.map(renderBlock)}</div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card px-3 py-1 text-[12px] text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8" aria-labelledby="related-heading">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="related-heading" className="text-2xl font-bold tracking-tight text-foreground">
              Keep reading
            </h2>
            <Link
              to="/blog"
              className="flex items-center gap-1.5 text-sm font-semibold text-orange-500 transition-all hover:gap-2.5"
            >
              View all
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <CTASection
        title="Ready to digitise your operations?"
        description="Talk to our team about connecting your assets, monitoring in real time and turning operational data into decisions."
        primaryButton={{ label: "Contact Us", href: "/contact" }}
        secondaryButton={{ label: "Explore Solutions", href: "/solutions" }}
      />
    </div>
  );
}
