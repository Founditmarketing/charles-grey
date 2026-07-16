import { Services, Process } from '../components/Services';
import { CTA } from '../components/Gallery';
import { PageSEO } from '../components/PageSEO';

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
    </main>
  );
}
