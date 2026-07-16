import { useEffect } from 'react';

const SITE_URL = 'https://www.charlesgreyconstruction.com';
const SITE_NAME = 'Charles Grey Construction';
const DEFAULT_TITLE = `${SITE_NAME} | Fast, High-Quality Builder`;
const DEFAULT_DESCRIPTION = "Charles Grey Construction is a premium full-service general contractor handling structural, residential, and commercial projects with unmatched speed and quality.";

function upsertMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return el;
}

// Injects per-route title, meta description, canonical link, og/twitter tags,
// and an optional noindex directive. Mirrors the static defaults in index.html
// so the same tags exist whether a crawler reads the SSR shell or executes JS.
export function PageSEO({ title, description, path = '/', noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESCRIPTION;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;

    upsertMeta('name', 'description', desc);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'twitter:title', fullTitle);
    upsertMeta('property', 'twitter:description', desc);
    upsertMeta('property', 'twitter:url', url);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    let robotsTag = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsTag) {
        robotsTag = document.createElement('meta');
        robotsTag.name = 'robots';
        document.head.appendChild(robotsTag);
      }
      robotsTag.content = 'noindex, nofollow';
    } else if (robotsTag) {
      robotsTag.remove();
    }

    return () => {
      document.title = DEFAULT_TITLE;
      upsertMeta('name', 'description', DEFAULT_DESCRIPTION);
      upsertMeta('property', 'og:title', DEFAULT_TITLE);
      upsertMeta('property', 'og:description', DEFAULT_DESCRIPTION);
      upsertMeta('property', 'og:url', `${SITE_URL}/`);
      upsertMeta('property', 'twitter:title', DEFAULT_TITLE);
      upsertMeta('property', 'twitter:description', DEFAULT_DESCRIPTION);
      upsertMeta('property', 'twitter:url', `${SITE_URL}/`);
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) canonicalTag.href = `${SITE_URL}/`;
      if (noindex) {
        const robots = document.querySelector('meta[name="robots"]');
        if (robots) robots.remove();
      }
    };
  }, [title, description, path, noindex]);

  return null;
}
