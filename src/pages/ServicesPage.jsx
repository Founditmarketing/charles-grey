import { Services, Process } from '../components/Services';
import { CTA } from '../components/Gallery';
import { PageSEO } from '../components/PageSEO';

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "General Contracting",
  "provider": {
    "@type": "GeneralContractor",
    "name": "Charles Grey Construction",
    "telephone": "985-860-6725",
    "url": "https://www.charlesgreyconstruction.com/"
  },
  "areaServed": {
    "@type": "State",
    "name": "Louisiana"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Construction Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Residential Construction",
          "description": "Turnkey residential builds — dirt work, foundation, framing, roofing, insulation, drywall, electrical, and plumbing."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Commercial Construction",
          "description": "Metal building erection, TPO/PVC flat membrane roofing, and roof coatings for commercial properties."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Interior Build-Outs",
          "description": "Restaurant refreshers and commercial tenant build-outs, including flooring and drywall."
        }
      }
    ]
  }
};

export function ServicesPage() {
  return (
    <main className="page-padding">
      <PageSEO
        title="Construction Services"
        description="Full-service general contracting across Louisiana: turnkey residential builds, commercial metal buildings and flat roofing, and restaurant & tenant build-outs — all under one roof."
        path="/services"
      />
      <Services />
      <Process />
      <CTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }} />
    </main>
  );
}
