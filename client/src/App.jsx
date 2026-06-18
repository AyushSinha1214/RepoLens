import { useState } from "react";
import axios from "axios";

function App() {
  const [repo, setRepo] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
  try {
    setLoading(true);

    const [owner, repoName] = repo.split("/");

    const response = await axios.get(
      `http://localhost:5000/api/repo/${owner}/${repoName}`
    );

    setRepoData(response.data);
  } catch (error) {
    console.log(error);
    alert("Repository not found");
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
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {repoData && (
        <div style={{ marginTop: "20px" }}>
          <h2>{repoData.name}</h2>

          <p>{repoData.description}</p>

          <p>⭐ Stars: {repoData.stars}</p>

          <p>🍴 Forks: {repoData.forks}</p>

          <p>🐞 Issues: {repoData.issues}</p>

          <p>💻 Language: {repoData.language}</p>
        </div>
      )}
    </div>
  );
}

export default App;