import { Hero, Marquee } from '../components/Hero';
import { WhyUs } from '../components/WhyUs';
import { Services } from '../components/Services';
import { Gallery, CTA } from '../components/Gallery';
import { SocialProof } from '../components/Contact';

export function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <WhyUs />
      <Services />
      <SocialProof />
      <CTA />
    </main>
  );
}
