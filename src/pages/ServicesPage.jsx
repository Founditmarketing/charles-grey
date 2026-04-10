import { Services, Process } from '../components/Services';
import { CTA } from '../components/Gallery';

export function ServicesPage() {
  return (
    <main className="page-padding">
      <Services />
      <Process />
      <CTA />
    </main>
  );
}
