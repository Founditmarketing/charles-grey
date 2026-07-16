import { Gallery, CTA } from '../components/Gallery';
import { SocialProof } from '../components/Contact';
import { PageSEO } from '../components/PageSEO';

export function PortfolioPage() {
  return (
    <main className="page-padding">
      <PageSEO
        title="Our Work"
        description="Browse completed residential builds, metal buildings, and restaurant build-outs from Charles Grey Construction — Louisiana's fast, high-quality general contractor."
        path="/portfolio"
      />
      <Gallery />
      <SocialProof />
      <CTA />
    </main>
  );
}
