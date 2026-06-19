import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const [repo, setRepo] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const [owner, repoName] = repo.split("/");

    if (!owner || !repoName) {
      alert("Enter repository in owner/repository format");
      return;
    }

    navigate(`/results/${owner}/${repoName}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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

          <button
            onClick={handleSearch}
            className="search-btn"
          >
            Analyze
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;