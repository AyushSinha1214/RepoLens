import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../App.css";

function Results() {
  const { owner, repo } = useParams();

  const [repoData, setRepoData] = useState(null);
const [contributors, setContributors] = useState([]);
const [languages, setLanguages] = useState([]);
const [commitData, setCommitData] = useState([]);
const [health, setHealth] = useState(null);
const [insights, setInsights] = useState([]);

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        repoResponse,
        contributorsResponse,
        languagesResponse,
        commitsResponse,
        healthResponse,
        insightsResponse,
      ] = await Promise.all([
        axios.get(`http://localhost:5000/api/repo/${owner}/${repo}`),
        axios.get(`http://localhost:5000/api/contributors/${owner}/${repo}`),
        axios.get(`http://localhost:5000/api/languages/${owner}/${repo}`),
        axios.get(`http://localhost:5000/api/commits/${owner}/${repo}`),
        axios.get(`http://localhost:5000/api/health/${owner}/${repo}`),
        axios.get(`http://localhost:5000/api/insights/${owner}/${repo}`),
      ]);

      setRepoData(repoResponse.data);
      setContributors(contributorsResponse.data);
      setLanguages(languagesResponse.data);
      setCommitData(commitsResponse.data.slice(-12));
      setHealth(healthResponse.data);
      setInsights(insightsResponse.data);
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
      setError("Repository not found");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
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

<div className="health-card">
  <p className="health-title">
    Repo Health
  </p>

  <div className="health-score">
    {health?.score}/100
  </div>

  <div className="health-status">
    {health?.status}
  </div>
</div>

<hr className="divider" />

<div className="ai-card">
  <p className="ai-title">
    AI Insights
  </p>

  {insights.map((item, index) => (
    <div
      key={index}
      className="ai-insight"
    >
      • {item}
    </div>
  ))}
</div>

<hr className="divider" />

<div className="meta-list">
  <div className="meta-item">
    📅 Created{" "}
    {new Date(repoData.createdAt).toLocaleDateString()}
  </div>

  <div className="meta-item">
    🔄 Updated{" "}
    {new Date(repoData.updatedAt).toLocaleDateString()}
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
          <div className="section-title">
            Repository Overview
          </div>

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

          {/* Languages */}
          <div className="section-title">
            Languages
          </div>

          <div className="languages-card">
            {languages.map((language) => (
              <div
                key={language.name}
                className="language-row"
              >
                <span>{language.name}</span>
                <span>{language.percentage}%</span>
              </div>
            ))}
          </div>

          {/* Commit Activity */}
          <div className="section-title">
            Commit Activity (Last 12 Weeks)
          </div>

          <div className="chart-card">
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={commitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="commits"
                    stroke="#6366f1"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Contributors */}
          <div className="section-title">
            Top Contributors
          </div>

          <div className="contributors-grid">
            {contributors.map((user) => (
              <a
                key={user.login}
                href={user.profile}
                target="_blank"
                rel="noreferrer"
                className="contributor-card"
              >
                <img
                  src={user.avatar}
                  alt={user.login}
                  className="contributor-avatar"
                />

                <div>
                  <p className="contributor-name">
                    {user.login}
                  </p>

                  <p className="contributor-count">
                    {user.contributions} contributions
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* About */}
          <div className="section-title">
            About
          </div>

          <div className="about-card">
            <p>
              {repoData.description ||
                "No description provided for this repository."}
            </p>

            <div className="about-meta">
              <span className="tag">
                {repoData.language || "Unknown"}
              </span>

              <span className="meta-text">
                Created{" "}
                {new Date(repoData.createdAt).toLocaleDateString()}
              </span>

              <span className="meta-text">
                Last updated{" "}
                {new Date(repoData.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
    
  );
  
}


export default Results;