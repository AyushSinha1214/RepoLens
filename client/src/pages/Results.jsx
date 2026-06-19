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
        <h1 style={{ padding: "40px" }}>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1 style={{ padding: "40px" }}>{error}</h1>
      </div>
    );
  }

  return (
    <div className="page">
      <nav className="navbar">
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          RepoLens
        </Link>
      </nav>

      <section className="search-section">
        <div className="result-card">
          <div className="result-header">
            <h2>{repoData.name}</h2>

            <a
              href={repoData.url}
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub →
            </a>
          </div>

          <p className="result-desc">
            {repoData.description}
          </p>

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
              Created{" "}
              {new Date(repoData.createdAt).toLocaleDateString()}
            </span>

            <span className="meta-text">
              Updated{" "}
              {new Date(repoData.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Results;