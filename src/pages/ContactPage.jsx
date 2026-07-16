import { CTA } from '../components/Gallery';
import { PageSEO } from '../components/PageSEO';

export function ContactPage() {
  return (
    <main className="page-padding">
      <PageSEO
        title="Contact Us"
        description="Get a free, line-item construction estimate from Charles Grey Construction. Call, message, or use our AI estimator — most quotes turn around in 24 hours."
        path="/contact"
      />
      <CTA />
    </main>
  );
}
