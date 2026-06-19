import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Results() {
  const { owner, repo } = useParams();

  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/api/repo/${owner}/${repo}`
        );

        setRepoData(response.data);
      } catch (err) {
        setError("Repository not found");
      } finally {
        setLoading(false);
      }
    };

    fetchRepo();
  }, [owner, repo]);

  if (loading) {
    return (
      <div className="page">
        <h1 className="status-text">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1 className="status-text">{error}</h1>
        <Link to="/" className="back-link">
          ← Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="logo-dot"></span>
          RepoLens
        </Link>
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

      <div className="results-body">
        <aside className="sidebar">
          <div className="repo-header">
            <div className="repo-avatar">🔭</div>
            <p className="repo-name">{repoData.name}</p>
            <p className="repo-owner">{owner}</p>
            {repoData.description && (
              <p className="repo-desc">{repoData.description}</p>
            )}
            {repoData.language && (
              <div className="tag-row">
                <span className="tag">{repoData.language}</span>
              </div>
            )}
          </div>

          <hr className="divider" />

          <div className="meta-list">
            <div className="meta-item">
              📅 Created {new Date(repoData.createdAt).toLocaleDateString()}
            </div>
            <div className="meta-item">
              🔄 Updated {new Date(repoData.updatedAt).toLocaleDateString()}
            </div>
          </div>

          <a
            href={repoData.url}
            target="_blank"
            rel="noreferrer"
            className="github-link"
          >
            View on GitHub →
          </a>
        </aside>

        <main className="main-panel">
          <div className="section-title">Repository overview</div>

          <div className="overview-grid">
            <div className="overview-card">
              <p className="overview-label">Open Issues</p>
              <p className="overview-val">{repoData.issues}</p>
            </div>
            <div className="overview-card">
              <p className="overview-label">Total Forks</p>
              <p className="overview-val">{repoData.forks}</p>
            </div>
            <div className="overview-card">
              <p className="overview-label">Watchers</p>
              <p className="overview-val">{repoData.watchers}</p>
            </div>
            <div className="overview-card">
              <p className="overview-label">Stars</p>
              <p className="overview-val">{repoData.stars}</p>
            </div>
          </div>

          <div className="section-title">About</div>
          <div className="about-card">
            <p>
              {repoData.description || "No description provided for this repository."}
            </p>
            <div className="about-meta">
              <span className="tag">{repoData.language || "Unknown"}</span>
              <span className="meta-text">
                Created {new Date(repoData.createdAt).toLocaleDateString()}
              </span>
              <span className="meta-text">
                Last updated {new Date(repoData.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Results;