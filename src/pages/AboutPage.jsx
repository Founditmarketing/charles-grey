import { WhyUs, Stats } from '../components/WhyUs';
import { CTA } from '../components/Gallery';

export function AboutPage() {
  return (
    <main className="page-padding">
      <WhyUs />
      <Stats />
      <CTA />
    </main>
  );
}
