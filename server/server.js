require("dotenv").config();
console.log("Token loaded:", process.env.GITHUB_TOKEN ? "YES" : "NO");

const express = require("express");
const cors = require("cors");
const axios = require("axios");

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
  res.json({ message: "RepoLens Backend Running 🚀" });
});

// Repository Details Route
app.get("/api/repo/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    console.log("Owner:", owner);
    console.log("Repo:", repo);

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

      // ✅ FIX: was incorrectly using `repo.owner` (a string) instead of `response.data.owner`
      owner: {
        login: response.data.owner.login,
        avatar: response.data.owner.avatar_url,
        profile: response.data.owner.html_url,
        type: response.data.owner.type,
      },
    };

    res.json(repoData);
  } catch (error) {
    console.log("========== REPO ERROR ==========");
    console.log("Message:", error.message);
    console.log("Code:", error.code);
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);

    res.status(500).json({ error: error.message });
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

    const contributors = response.data.slice(0, 5).map((user) => ({
      login: user.login,
      avatar: user.avatar_url,
      contributions: user.contributions,
      profile: user.html_url,
    }));

    res.json(contributors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contributors" });
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
    res.status(500).json({ message: "Failed to fetch languages" });
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
    res.status(500).json({ message: "Failed to fetch commit activity" });
  }
});

// Health Score Route
app.get("/api/health/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const repoResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      githubConfig
    );

    const contributorsResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contributors`,
      githubConfig
    );

    const commitsResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`,
      githubConfig
    );

    const stars = repoResponse.data.stargazers_count;
    const forks = repoResponse.data.forks_count;
    const contributors = contributorsResponse.data.length;

    const recentCommits =
      commitsResponse.data?.slice(-4).reduce((sum, week) => sum + week.total, 0) || 0;

    let score = 0;
    score += Math.min(stars / 100, 40);
    score += Math.min(forks / 50, 20);
    score += Math.min(contributors * 2, 20);
    score += Math.min(recentCommits / 5, 20);
    score = Math.round(score);

    let status = "Poor";
    if (score >= 80) status = "Excellent";
    else if (score >= 60) status = "Good";
    else if (score >= 40) status = "Average";

    res.json({ score, status });
  } catch (error) {
    res.status(500).json({ message: "Failed to calculate health score" });
  }
});

// AI Insights Route
app.get("/api/insights/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const repoResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      githubConfig
    );

    const contributorsResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contributors`,
      githubConfig
    );

    const commitsResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`,
      githubConfig
    );

    const insights = [];

    const stars = repoResponse.data.stargazers_count;
    const forks = repoResponse.data.forks_count;
    const language = repoResponse.data.language;
    const contributors = contributorsResponse.data.length;

    const recentCommits =
      commitsResponse.data?.slice(-4).reduce((sum, week) => sum + week.total, 0) || 0;

    if (stars > 100) {
      insights.push("Strong community interest");
    } else {
      insights.push("Growing community presence");
    }

    if (contributors >= 5) {
      insights.push("Healthy contributor activity");
    } else {
      insights.push("Mostly maintained by a small team");
    }

    if (recentCommits > 20) {
      insights.push("Active development detected");
    } else {
      insights.push("Development activity is moderate");
    }

    if (language) {
      insights.push(`${language} is the primary language`);
    }

    if (forks > 50) {
      insights.push("Project is frequently forked");
    }

    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate insights" });
  }
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});