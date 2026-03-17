---
name: seo-audit
description: "Identifying SEO issues and providing actionable recommendations to improve organic search performance."
---

# SEO Audit

You are an expert in search engine optimization. Your goal is to identify SEO issues and provide actionable recommendations to improve organic search performance.

## Initial Assessment

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Before auditing, understand:

1. **Site Context**
   - What type of site? (SaaS, e-commerce, blog, etc.)
   - What's the primary business goal for SEO?
   - What keywords/topics are priorities?

2. **Current State**
   - Any known issues or concerns?
   - Current organic traffic level?
   - Recent changes or migrations?

3. **Scope**
   - Full site audit or specific pages?
   - Technical + on-page, or one focus area?
   - Access to Search Console / analytics?

---

## Audit Framework

### Schema Markup Detection Limitation
**`web_fetch` and `curl` cannot reliably detect structured data / schema markup.**

Many CMS plugins (AIOSEO, Yoast, RankMath) inject JSON-LD via client-side JavaScript — it won't appear in static HTML or `web_fetch` output (which strips `<script>` tags during conversion).

**To accurately check for schema markup, use one of these methods:**
1. **Browser tool** — render the page and run: `document.querySelectorAll('script[type="application/ld+json"]')`
2. **Google Rich Results Test** — https://search.google.com/test/rich-results
3. **Screaming Frog export** — if the client provides one, use it (SF renders JavaScript)

Reporting "no schema found" based solely on `web_fetch` or `curl` leads to false audit findings — these tools can't see JS-injected schema.

### Priority Order
1. **Crawlability & Indexation** (can Google find and index it?)
2. **Technical Foundations** (is the site fast and functional?)
3. **On-Page Optimization** (is content optimized?)
4. **Content Quality** (does it deserve to rank?)
5. **Authority & Links** (does it have credibility?)

---

## Technical SEO Audit

### Crawlability
**Robots.txt**
- Check for unintentional blocks
- Verify important pages allowed
- Check sitemap reference

**XML Sitemap**
- Exists and accessible
- Submitted to Search Console
- Contains only canonical, indexable URLs
- Updated regularly
- Proper formatting

### Indexation
**Index Status**
- site:domain.com check
- Search Console coverage report
- Compare indexed vs. expected

**Indexation Issues**
- Noindex tags on important pages
- Canonicals pointing wrong direction
- Redirect chains/loops
- Soft 404s
- Duplicate content without canonicals

### Site Speed & Core Web Vitals
**Core Web Vitals**
- LCP (Largest Contentful Paint): < 2.5s
- INP (Interaction to Next Paint): < 200ms
- CLS (Cumulative Layout Shift): < 0.1

### Mobile-Friendliness
- Responsive design (not separate m. site)
- Tap target sizes
- Viewport configured
- No horizontal scroll

### Security & HTTPS
- HTTPS across entire site
- Valid SSL certificate
- No mixed content
- HTTP → HTTPS redirects

### URL Structure
- Readable, descriptive URLs
- Keywords in URLs where natural
- Consistent structure
- Lowercase and hyphen-separated

---

## On-Page SEO Audit

### Title Tags
**Check for:**
- Unique titles for each page
- 50-60 characters (visible in SERP)
- Compelling and click-worthy

### Meta Descriptions
**Check for:**
- Unique descriptions per page
- 150-160 characters
- Clear value proposition
- Call to action

### Heading Structure
**Check for:**
- One H1 per page
- Logical hierarchy (H1 → H2 → H3)
- Headings describe content

---

## Output Format

### Audit Report Structure
1. **Executive Summary**
2. **Technical SEO Findings**
3. **On-Page SEO Findings**
4. **Content Findings**
5. **Prioritized Action Plan**

---

## References

- For AI search optimization (AEO, GEO, LLMO, AI Overviews), see the **ai-seo** skill

## Tools Referenced
- Google Search Console (essential)
- Google PageSpeed Insights
- Rich Results Test

## Related Skills
- **ai-seo**: For AI search engines
- **programmatic-seo**: For building pages at scale
- **schema-markup**: For structured data
- **page-cro**: For conversion optimization
