import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
// import "./About.css";

function useReveal() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.12 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, on];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, on] = useReveal();
  return (
    <div ref={ref} className={`rl ${on ? "rl-on" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const features = [
  { icon: "◈", label: "Repo Health", desc: "A score built from stars, forks, commits, and contributor depth — so you know if a project is alive before you clone it.", color: "#6366f1" },
  { icon: "⬡", label: "AI Insights", desc: "Observations about community size, development velocity, and project maturity, generated fresh for every repo.", color: "#22d3ee" },
  { icon: "◈", label: "Contributors", desc: "Top contributors with avatars, commit counts, and links — see who actually drives the project.", color: "#a78bfa" },
  { icon: "⬡", label: "Commit Trends", desc: "A 52-week chart of commit activity reveals whether a repo is accelerating, coasting, or abandoned.", color: "#34d399" },
];

const steps = [
  { n: "01", title: "Enter a repo", sub: "owner/repo or paste a GitHub URL" },
  { n: "02", title: "Live fetch", sub: "GitHub API — no cache, always fresh" },
  { n: "03", title: "Score it", sub: "Health + AI observations generated" },
  { n: "04", title: "Decide fast", sub: "Worth contributing to in seconds" },
];

const metrics = [
  { sym: "★", label: "Stars", note: "Community interest" },
  { sym: "⑂", label: "Forks", note: "Adoption signal" },
  { sym: "●●", label: "Contributors", note: "Team depth" },
  { sym: "↑", label: "Commits", note: "Dev velocity" },
  { sym: "♥", label: "Health Score", note: "Overall quality" },
];

export default function About() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [flipped, setFlipped] = useState(null);

  useEffect(() => {
    const h = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <div className="page ab-page">

      {/* Parallax orbs */}
      <div className="ab-orb ab-orb1" style={{ transform: `translate(${mouse.x * 0.025}px,${mouse.y * 0.025}px)` }} />
      <div className="ab-orb ab-orb2" style={{ transform: `translate(${mouse.x * -0.018}px,${mouse.y * -0.018}px)` }} />
      <div className="ab-orb ab-orb3" style={{ transform: `translate(${mouse.x * 0.01}px,${mouse.y * 0.01}px)` }} />

      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo" style={{ textDecoration: "none" }}>
          <span className="logo-dot" />RepoLens
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#">Explore</a>
          <a href="#">Docs</a>
        </div>
        <div className="nav-actions">
          <button className="btn-outline">Login</button>
          <button className="btn-primary">Register</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="ab-hero">
        <div className="ab-eyebrow">Open source · Free to use</div>
        <h1 className="ab-h1">
          GitHub repos,<br />
          <span className="ab-shine">decoded instantly.</span>
        </h1>
        <p className="ab-sub">
          RepoLens pulls live data from GitHub and turns stars, forks,
          commit history, and contributors into a single health view you
          can act on.
        </p>
        <Link to="/" className="ab-cta">Analyze a repository →</Link>

        <div className="ab-chips">
          {["★ Stars", "⑂ Forks", "♥ Health", "↑ Commits"].map((c, i) => (
            <span key={c} className="ab-chip" style={{ animationDelay: `${i * 0.3}s` }}>{c}</span>
          ))}
        </div>

        {/* Animated grid lines in hero */}
        <div className="ab-grid-lines" aria-hidden="true">
          {[...Array(6)].map((_, i) => <div key={i} className="ab-gl" style={{ animationDelay: `${i * 0.4}s` }} />)}
        </div>
      </section>

      {/* ── FLIP CARDS ── */}
      <section className="ab-sec">
        <Reveal><p className="ab-label">What RepoLens shows you</p></Reveal>
        <div className="ab-flip-grid">
          {features.map((f, i) => (
            <Reveal key={f.label} delay={i * 90}>
              <div
                className={`ab-flip ${flipped === i ? "ab-flipped" : ""}`}
                onMouseEnter={() => setFlipped(i)}
                onMouseLeave={() => setFlipped(null)}
              >
                <div className="ab-flip-inner">
                  <div className="ab-flip-front" style={{ "--ac": f.color }}>
                    <div className="ab-ficon" style={{ color: f.color }}>{f.icon}</div>
                    <h3 className="ab-ftitle">{f.label}</h3>
                    <div className="ab-fhint">Hover to learn more</div>
                  </div>
                  <div className="ab-flip-back" style={{ "--ac": f.color }}>
                    <h3 className="ab-ftitle">{f.label}</h3>
                    <p className="ab-fdesc">{f.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── WHY GITHUB — split card with counter animation ── */}
      <section className="ab-sec">
        <Reveal>
          <div className="ab-why">
            <div className="ab-why-left">
              <p className="ab-label">Why GitHub?</p>
              <h2 className="ab-h2">420 million repos.<br />Can you read them?</h2>
              <p className="ab-body">
                GitHub hosts nearly every significant open-source project alive
                today. But raw numbers — stars, watchers, forks — don't tell you
                whether a project is maintained, collaborative, or worth your time.
              </p>
              <p className="ab-body">
                RepoLens reads the signals that matter: recent commit velocity,
                contributor depth, fork-to-star ratio — and gives you a score.
              </p>
            </div>
            <div className="ab-why-right">
              <div className="ab-stat"><span className="ab-stat-n">420M+</span><span className="ab-stat-l">Repositories on GitHub</span></div>
              <div className="ab-stat"><span className="ab-stat-n">100M+</span><span className="ab-stat-l">Developers worldwide</span></div>
              <div className="ab-stat"><span className="ab-stat-n">4B+</span><span className="ab-stat-l">Contributions per year</span></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── HOW IT WORKS — animated steps ── */}
      <section className="ab-sec">
        <Reveal><p className="ab-label">How it works</p></Reveal>
        <div className="ab-steps">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <div className="ab-step">
                <div className="ab-step-num">{s.n}</div>
                <div className="ab-step-line" />
                <p className="ab-step-title">{s.title}</p>
                <p className="ab-step-sub">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── METRICS — hover reveal cards ── */}
      <section className="ab-sec">
        <Reveal><p className="ab-label">Metrics explained</p></Reveal>
        <div className="ab-metrics">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 70}>
              <div className="ab-metric">
                <span className="ab-msym">{m.sym}</span>
                <span className="ab-mlabel">{m.label}</span>
                <span className="ab-mnote">{m.note}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── BEGINNER CARD ── */}
      <section className="ab-sec">
        <Reveal>
          <div className="ab-beginner">
            <div className="ab-bpulse" />
            <span className="ab-bbadge">Beginner friendly</span>
            <h2 className="ab-h2" style={{ marginTop: "16px" }}>New to GitHub?</h2>
            <p className="ab-body" style={{ maxWidth: "480px", margin: "12px auto 28px" }}>
              You don't need to understand pull requests, CI/CD, or semantic versioning.
              Enter any repository name — RepoLens explains what matters in plain language.
            </p>
            <Link to="/" className="ab-cta ab-cta-sm">Try it now →</Link>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="logo"><span className="logo-dot" />RepoLens</div>
        <div className="footer-links">
          <a href="#">Contribute</a>
          <a href="#">Report an issue</a>
          <a href="#">Request a feature</a>
          <a href="#">GitHub</a>
        </div>
      </footer>
    </div>
  );
}