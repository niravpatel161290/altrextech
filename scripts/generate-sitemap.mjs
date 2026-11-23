// Generates public/sitemap.xml from the route data in src/data.
// Runs automatically before `npm run build` (see "prebuild" in package.json),
// or manually with: npm run sitemap
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = "https://www.altrextech.com";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const today = new Date().toISOString().slice(0, 10);

const read = (file) => readFileSync(resolve(root, "src/data", file), "utf8");

/** Pull every `slug: "..."` (single or double quotes) from a data file. */
function getSlugs(file) {
  return [...read(file).matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);
}

/** Blog posts: slug + publishedAt (used as lastmod). */
function getBlogPosts() {
  const src = read("blogData.ts");
  return [
    ...src.matchAll(/slug:\s*["']([^"']+)["'][\s\S]*?publishedAt:\s*["']([^"']+)["']/g),
  ].map((m) => ({ slug: m[1], lastmod: m[2] }));
}

const urls = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/live-demo", changefreq: "monthly", priority: "0.7" },
];

const sections = [
  { base: "/solutions", file: "solutionsData.ts" },
  { base: "/services", file: "servicesRegistry.ts" },
  { base: "/industries", file: "industriesRegistry.ts" },
];

for (const { base, file } of sections) {
  urls.push({ path: base, changefreq: "monthly", priority: "0.9" });
  for (const slug of getSlugs(file)) {
    urls.push({ path: `${base}/${slug}`, changefreq: "monthly", priority: "0.8" });
  }
}

const posts = getBlogPosts();
const latestPost = posts.map((p) => p.lastmod).sort().at(-1) ?? today;
urls.push({ path: "/blog", changefreq: "weekly", priority: "0.8", lastmod: latestPost });
for (const { slug, lastmod } of posts) {
  urls.push({ path: `/blog/${slug}`, changefreq: "monthly", priority: "0.7", lastmod });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE_URL}${u.path}</loc>
    <lastmod>${u.lastmod ?? today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml generated with ${urls.length} URLs`);
