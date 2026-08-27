import { Helmet } from "react-helmet-async";

/**
 * Central place for site-wide SEO constants. Update here if the domain,
 * brand name, or default share image ever changes.
 */
const SITE_NAME = "Altrex Digital Platforms Pvt Ltd";
const SITE_URL = "https://www.altrextech.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.png`;
const DEFAULT_DESCRIPTION_MAX_LENGTH = 160;

export interface SeoProps {
  /** Full page title. Rendered as-is — include the brand suffix yourself. */
  title: string;
  /** Meta description. Automatically trimmed to a search-friendly length. */
  description: string;
  /** Route path starting with "/", e.g. "/solutions/iiot-platform". Used to build the canonical + OG URL. */
  path: string;
  /** Absolute URL or a "/public"-relative path. Defaults to the site favicon. */
  image?: string;
  /** Set true on pages that shouldn't be indexed (e.g. a dynamic-route 404). */
  noindex?: boolean;
}

/**
 * Truncates text on a word boundary so meta descriptions don't get cut
 * mid-word by search engines or social previews.
 */
export function truncateDescription(
  text: string,
  maxLength: number = DEFAULT_DESCRIPTION_MAX_LENGTH
): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;

  const sliced = trimmed.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${sliced.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}...`;
}

function resolveImageUrl(image?: string): string {
  if (!image) return DEFAULT_OG_IMAGE;
  return image.startsWith("http") ? image : `${SITE_URL}${image}`;
}

/**
 * Drop this at the top of any routed page to set that page's title, meta
 * description, canonical URL, and Open Graph / Twitter card tags.
 *
 * Usage:
 *   <Seo
 *     title="Solutions | Altrex Digital Platforms Pvt Ltd"
 *     description="..."
 *     path="/solutions"
 *   />
 */
export function Seo({ title, description, path, image, noindex }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const metaDescription = truncateDescription(description);
  const ogImage = resolveImageUrl(image);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}