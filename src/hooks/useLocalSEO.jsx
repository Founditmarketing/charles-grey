import { useEffect } from 'react';

// Injects the per-city GeneralContractor JSON-LD schema. Title/description/
// canonical for city pages are owned by <PageSEO> (see CitySEOPage.jsx).
export function useLocalSEO(cityData) {
  useEffect(() => {
    if (!cityData) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "GeneralContractor",
      "name": "Charles Grey Construction",
      "image": "https://www.charlesgreyconstruction.com/images/drive-download-20260404T203410Z-1-001/IMG_20260404_105454.jpg",
      "@id": `https://www.charlesgreyconstruction.com/#${cityData.slug}`,
      "url": `https://www.charlesgreyconstruction.com/service-areas/${cityData.slug}`,
      "telephone": "985-860-6725",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityData.name,
        "addressRegion": cityData.state,
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.latitude,
        "longitude": cityData.longitude
      },
      "areaServed": cityData.name,
      "priceRange": "$$$$"
    };

    let script = document.querySelector('#seo-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.innerText = JSON.stringify(schema);

    // Cleanup when returning to normal pages
    return () => {
      if (script) script.remove();
    };
  }, [cityData]);
}
