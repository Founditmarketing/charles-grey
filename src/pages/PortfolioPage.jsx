import { Gallery, CTA } from '../components/Gallery';
import { SocialProof } from '../components/Contact';

export function PortfolioPage() {
  return (
    <main className="page-padding">
      <Gallery />
      <SocialProof />
      <CTA />
    </main>
  );
}
