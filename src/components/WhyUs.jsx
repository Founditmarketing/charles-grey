import { Target, Clock, Zap, ShieldCheck } from 'lucide-react';

export function WhyUs() {
  const diffs = [
    { num: '01', icon: <Zap size={20} />, title: "Speed to Start", desc: "We deploy faster than anyone in the area, getting your project moving immediately." },
    { num: '02', icon: <Target size={20} />, title: "Line-Item Details", desc: "Complete transparency with fully detailed, line-item estimates so you know exactly what you pay for." },
    { num: '03', icon: <Clock size={20} />, title: "Same-Day Quotes", desc: "Time is money. We pump out highly accurate quotes dramatically faster than traditional contractors." },
    { num: '04', icon: <ShieldCheck size={20} />, title: "Unmatched Quality", desc: "We build it cheaper and faster, without ever sacrificing the premium quality you expect from a top-tier GC." }
  ];

  return (
    <section className="section diff" id="about">
      <div>
        <div className="section-tag">The CG Difference</div>
        <h2 className="section-title">Why choose Charles Grey.</h2>
        <p className="section-desc">We operate differently than most contractors. We communicate clearly, quote transparently, and build with incredible efficiency. See what sets us apart.</p>
        
        <div className="diff-grid">
          {diffs.map((d, i) => (
            <div className="diff-card" key={i}>
              <div className="diff-num">{d.num}</div>
              <div className="diff-icon">{d.icon}</div>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const stats = [
    { num: "100%", label: "Turnkey Builds" },
    { num: "24hr", label: "Estimate Speed" },
    { num: "50+", label: "Completed Projects" },
    { num: "5★", label: "Client Rating" }
  ];

  return (
    <section className="stats">
      <div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
