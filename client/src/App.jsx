import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [repo, setRepo] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      const [owner, repoName] = repo.split("/");

      const response = await axios.get(
        `http://localhost:5000/api/repo/${owner}/${repoName}`
      );

      setRepoData(response.data);
    } catch (error) {
      console.log(error);
      setError("Repository not found");
      setRepoData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
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
        <div className="search-row">
          <input
            type="text"
            placeholder="e.g. facebook/react"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            {loading ? "Searching..." : "Analyze"}
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        {repoData && (
          <div className="result-card">
            <div className="result-header">
              <h2>{repoData.name}</h2>
              <a href={repoData.url} target="_blank" rel="noreferrer">
                View on GitHub →
              </a>
            </div>

            {repoData.description && (
              <p className="result-desc">{repoData.description}</p>
            )}

            <div className="stat-grid">
              <div className="stat">
                <p className="stat-val">{repoData.stars}</p>
                <p className="stat-key">⭐ Stars</p>
              </div>
              <div className="stat">
                <p className="stat-val">{repoData.forks}</p>
                <p className="stat-key">🍴 Forks</p>
              </div>
              <div className="stat">
                <p className="stat-val">{repoData.watchers}</p>
                <p className="stat-key">👀 Watchers</p>
              </div>
              <div className="stat">
                <p className="stat-val">{repoData.issues}</p>
                <p className="stat-key">🐞 Issues</p>
              </div>
            </div>

            <div className="meta-row">
              <span className="tag">{repoData.language}</span>
              <span className="meta-text">
                Created {new Date(repoData.createdAt).toLocaleDateString()}
              </span>
              <span className="meta-text">
                Updated {new Date(repoData.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
