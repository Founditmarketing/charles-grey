import { WhyUs, Stats } from '../components/WhyUs';
import { CTA } from '../components/Gallery';
import { PageSEO } from '../components/PageSEO';

export function AboutPage() {
  return (
    <main className="page-padding">
      <PageSEO
        title="About Us"
        description="Charles Grey Construction is Louisiana's premium general contractor: same-day quotes, transparent line-item estimates, and turnkey execution without sacrificing quality."
        path="/about"
      />
      <WhyUs />
      <Stats />
      <CTA />
    </main>
  );
}
