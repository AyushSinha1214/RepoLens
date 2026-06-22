const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const githubConfig = {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
};

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "RepoLens Backend Running 🚀",
  });
});

// Repository Details Route
app.get("/api/repo/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const response = await axios.get(
  `https://api.github.com/repos/${owner}/${repo}`,
  githubConfig
);

    const repoData = {
      name: response.data.name,
      description: response.data.description,
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      watchers: response.data.watchers_count,
      issues: response.data.open_issues_count,
      language: response.data.language,
      createdAt: response.data.created_at,
      updatedAt: response.data.updated_at,
      url: response.data.html_url,
    };

    res.json(repoData);
  } catch (error) {
  console.log("========== REPO ERROR ==========");
  console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);

  res.status(404).json({
    message: "Repository not found",
  });
}
});

// Contributors Route
app.get("/api/contributors/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const response = await axios.get(
  `https://api.github.com/repos/${owner}/${repo}/contributors`,
  githubConfig
);

    const contributors = response.data
      .slice(0, 5)
      .map((user) => ({
        login: user.login,
        avatar: user.avatar_url,
        contributions: user.contributions,
        profile: user.html_url,
      }));

    res.json(contributors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contributors",
    });
  }
});

// Languages Route
app.get("/api/languages/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const response = await axios.get(
  `https://api.github.com/repos/${owner}/${repo}/languages`,
  githubConfig
);

    const languages = response.data;

    const totalBytes = Object.values(languages).reduce(
      (sum, value) => sum + value,
      0
    );

    const formattedLanguages = Object.entries(languages).map(
      ([name, bytes]) => ({
        name,
        percentage: ((bytes / totalBytes) * 100).toFixed(1),
      })
    );

    res.json(formattedLanguages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch languages",
    });
  }
});

// Commit Activity Route
app.get("/api/commits/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const response = await axios.get(
  `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`,
  githubConfig
);

    const commitData = response.data.map((week, index) => ({
      week: `Week ${index + 1}`,
      commits: week.total,
    }));

    res.json(commitData);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch commit activity",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});