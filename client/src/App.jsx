import { useState } from "react";
import axios from "axios";

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

  return (
    <div style={{ padding: "40px" }}>
      <h1>RepoLens 🚀</h1>

      <input
        type="text"
        placeholder="facebook/react"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginRight: "10px",
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {loading && <p>Loading...</p>}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {repoData && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            maxWidth: "500px",
          }}
        >
          <h2>{repoData.name}</h2>

          <p>{repoData.description}</p>

          <hr />

          <p>⭐ Stars: {repoData.stars}</p>

          <p>🍴 Forks: {repoData.forks}</p>

          <p>👀 Watchers: {repoData.watchers}</p>

          <p>🐞 Issues: {repoData.issues}</p>

          <p>💻 Language: {repoData.language}</p>

          <p>
            📅 Created:
            {" "}
            {new Date(repoData.createdAt).toLocaleDateString()}
          </p>

          <p>
            🔄 Updated:
            {" "}
            {new Date(repoData.updatedAt).toLocaleDateString()}
          </p>

          <a
            href={repoData.url}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>
      )}
    </div>
  );
}

export default App;