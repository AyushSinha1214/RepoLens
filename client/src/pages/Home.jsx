import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const [repo, setRepo] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [activeTab, setActiveTab] = useState("individual");
  const navigate = useNavigate();

  const handleSearch = () => {
    const [owner, repoName] = repo.split("/");

    if (!owner || !repoName) {
      alert("Enter repository in owner/repository format");
      return;
    }

    navigate(`/results/${owner}/${repoName}`);
  };

  const handleLinkSearch = () => {
    try {
      const cleaned = repoLink.replace("https://github.com/", "").replace(/\/$/, "");
      const [owner, repoName] = cleaned.split("/");

      if (!owner || !repoName) {
        alert("Enter a valid GitHub repository link");
        return;
      }

      navigate(`/results/${owner}/${repoName}`);
    } catch {
      alert("Enter a valid GitHub repository link");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      activeTab === "individual" ? handleSearch() : handleLinkSearch();
    }
  };

  return (
    <div className="page">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-dot"></span>
          RepoLens
        </div>

        <div className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">Explore</a>
          <a href="#">Docs</a>
        </div>

        <div className="nav-actions">
          <button className="btn-outline">Login</button>
          <button className="btn-primary">Register</button>
        </div>
      </nav>

      <header className="hero">
        <div className="lens">
          <div className="lens-ring r1"></div>
          <div className="lens-ring r2"></div>
          <div className="lens-ring r3"></div>
          <div className="lens-core"></div>
        </div>

        <h1>
          Inspect any <span>GitHub repo</span>
          <br />
          at a glance
        </h1>

        <p>
          RepoLens surfaces commit stats, contributor info, and repo health
          in one clean view.
        </p>
      </header>

      <section className="search-section">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "individual" ? "active" : ""}`}
            onClick={() => setActiveTab("individual")}
          >
            By owner & name
          </button>
          <button
            className={`tab ${activeTab === "link" ? "active" : ""}`}
            onClick={() => setActiveTab("link")}
          >
            By repository link
          </button>
        </div>

        {activeTab === "individual" ? (
          <div className="search-row">
            <div className="field">
              <label className="field-label">Owner *</label>
              <input
                type="text"
                placeholder="e.g. facebook"
                value={repo.split("/")[0] || ""}
                onChange={(e) => {
                  const repoName = repo.split("/")[1] || "";
                  setRepo(`${e.target.value}/${repoName}`);
                }}
                onKeyDown={handleKeyDown}
                className="search-input"
              />
            </div>
            <div className="field">
              <label className="field-label">Repository *</label>
              <input
                type="text"
                placeholder="e.g. react"
                value={repo.split("/")[1] || ""}
                onChange={(e) => {
                  const owner = repo.split("/")[0] || "";
                  setRepo(`${owner}/${e.target.value}`);
                }}
                onKeyDown={handleKeyDown}
                className="search-input"
              />
            </div>
            <button onClick={handleSearch} className="search-btn">
              Analyze
            </button>
          </div>
        ) : (
          <div className="search-row">
            <div className="field" style={{ flex: 1 }}>
              <label className="field-label">Repository Link *</label>
              <input
                type="text"
                placeholder="https://github.com/owner/repo"
                value={repoLink}
                onChange={(e) => setRepoLink(e.target.value)}
                onKeyDown={handleKeyDown}
                className="search-input"
              />
            </div>
            <button onClick={handleLinkSearch} className="search-btn">
              Analyze
            </button>
          </div>
        )}

        <div className="recent">
          <p className="recent-label">Recent</p>
          <div className="chips">
            <div className="chip">
              ayushsinha1214/repolens
              <button className="chip-x">✕</button>
            </div>
            <div className="chip">
              facebook/react
              <button className="chip-x">✕</button>
            </div>
          </div>
        </div>

        <div className="results-preview">
          <p className="section-title">Results</p>
          <div className="empty-state">
            Search a repository above to start analyzing
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="logo">
          <span className="logo-dot"></span>
          RepoLens
        </div>
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

export default Home;