import { Link } from "react-router-dom";
import "../App.css";

function About() {
  return (
    <div className="page">
      <div className="about-container">

        {/* Hero Section */}
        <section className="about-hero">
          <h1>
            About <span>RepoLens</span>
          </h1>

          <p>
            Analyze GitHub repositories in seconds.
            Understand repository health, contributor activity,
            technology stack, and project growth without digging
            through dozens of GitHub pages.
          </p>

          <Link to="/" className="hero-btn">
            Start Exploring →
          </Link>
        </section>

        {/* Features */}
        <section className="feature-grid">
          <div className="feature-card">
            <h3>📊 Repo Health</h3>
            <p>
              Health scoring based on repository activity,
              contributors, stars and commits.
            </p>
          </div>

          <div className="feature-card">
            <h3>🤖 AI Insights</h3>
            <p>
              Smart observations that help you quickly
              understand repository quality.
            </p>
          </div>

          <div className="feature-card">
            <h3>👥 Contributors</h3>
            <p>
              Explore contributor activity and team
              participation.
            </p>
          </div>

          <div className="feature-card">
            <h3>📈 Commit Trends</h3>
            <p>
              Visualize development activity and
              maintenance patterns.
            </p>
          </div>
        </section>

        {/* Why GitHub */}
        <section className="info-section">
          <h2>Why GitHub Matters</h2>

          <p>
            GitHub hosts millions of repositories and powers
            modern software development.
          </p>

          <div className="info-list">
            <div>• Which projects are active?</div>
            <div>• Which repositories are healthy?</div>
            <div>• Which technologies are used?</div>
            <div>• Is the project actively maintained?</div>
          </div>

          <p>
            RepoLens answers these questions instantly.
          </p>
        </section>

        {/* How It Works */}
        <section className="info-section">
          <h2>How RepoLens Works</h2>

          <div className="timeline">
            <div className="timeline-step">
              <span>①</span>
              Enter a repository
            </div>

            <div className="timeline-step">
              <span>②</span>
              Fetch GitHub data
            </div>

            <div className="timeline-step">
              <span>③</span>
              Generate analytics & insights
            </div>

            <div className="timeline-step">
              <span>④</span>
              Understand projects faster
            </div>
          </div>
        </section>

        {/* Beginner Section */}
        <section className="beginner-card">
          <h2>🚀 New to GitHub?</h2>

          <p>
            Many beginners find GitHub intimidating.
            RepoLens was built to simplify repository
            analysis and make open source easier to explore.
          </p>

          <p>
            You don't need to understand stars, forks,
            commit history, or contributor statistics
            before getting started.
          </p>
        </section>

        {/* Metrics */}
        <section className="metrics-grid">
          <div className="metric-card">
            <h3>⭐ Stars</h3>
            <p>Project popularity</p>
          </div>

          <div className="metric-card">
            <h3>🍴 Forks</h3>
            <p>Community adoption</p>
          </div>

          <div className="metric-card">
            <h3>👥 Contributors</h3>
            <p>Team participation</p>
          </div>

          <div className="metric-card">
            <h3>📈 Commits</h3>
            <p>Development activity</p>
          </div>

          <div className="metric-card">
            <h3>🏥 Health Score</h3>
            <p>Repository quality</p>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2>Ready to explore GitHub repositories?</h2>

          <Link to="/" className="hero-btn">
            Analyze a Repository →
          </Link>
        </section>

      </div>
    </div>
  );
}

export default About;