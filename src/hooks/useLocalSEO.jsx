import { useEffect } from 'react';

export function useLocalSEO(cityData) {
  useEffect(() => {
    if (!cityData) return;

    // 1. Inject Standard Meta Tags
    document.title = `General Contractor in ${cityData.name}, ${cityData.state} | Charles Grey Construction`;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = cityData.description;

    // 2. Inject LocalBusiness JSON-LD Schema explicitly formatted for Google
    const schema = {
      "@context": "https://schema.org",
      "@type": "GeneralContractor",
      "name": "Charles Grey Construction",
      "image": "https://charlesgreyconstruction.com/images/drive-download-20260404T203410Z-1-001/IMG_20260404_105454.jpg",
      "@id": `https://charlesgreyconstruction.com/#${cityData.slug}`,
      "url": `https://charlesgreyconstruction.com/service-areas/${cityData.slug}`,
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
      document.title = "Charles Grey Construction | Fast, High-Quality Builder";
      if (script) script.remove();
    };
  }, [cityData]);
}
