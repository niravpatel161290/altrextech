import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { formatBlogDate, getReadingTime } from "@/data/blogData";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  /** Large horizontal layout used for the featured post. */
  featured?: boolean;
}

function BlogCover({ post, className }: { post: BlogPost; className?: string }) {
  if (post.coverImage) {
    return (
      <img
        src={post.coverImage}
        alt={post.coverAlt ?? post.title}
        loading="lazy"
        className={cn("h-full w-full object-cover transition-transform duration-500 group-hover:scale-105", className)}
      />
    );
  }

  // Placeholder cover when a post has no image.
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500/20 via-orange-500/5 to-transparent",
        className
      )}
    >
      <Newspaper className="h-10 w-10 text-orange-500/60 transition-transform duration-500 group-hover:scale-110" />
    </div>
  );
}

export function BlogMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
        <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {getReadingTime(post.content)} min read
      </span>
    </div>
  );
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={cn(
        "group relative flex h-full overflow-hidden rounded-2xl border border-border bg-[var(--bg-surface)] shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40",
        featured ? "flex-col lg:flex-row" : "flex-col"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-border",
          featured ? "aspect-[16/9] lg:aspect-auto lg:w-1/2 border-b lg:border-b-0 lg:border-r" : "aspect-[16/9] border-b"
        )}
      >
        <BlogCover post={post} />
      </div>

      <div className={cn("flex flex-1 flex-col", featured ? "p-6 sm:p-8 lg:p-10" : "p-6")}>
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange-500">
            {post.category}
          </span>
          {featured && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Featured
            </span>
          )}
        </div>

        <h2
          className={cn(
            "font-bold tracking-tight text-foreground transition-colors group-hover:text-orange-500",
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          )}
        >
          {post.title}
        </h2>

        <p
          className={cn(
            "mt-3 flex-1 leading-relaxed text-muted-foreground",
            featured ? "text-sm sm:text-base" : "text-[13px] line-clamp-3"
          )}
        >
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <BlogMeta post={post} />
          <span className="flex shrink-0 items-center gap-1.5 text-[12px] font-semibold text-orange-500 transition-all duration-300 group-hover:gap-2.5">
            Read
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
