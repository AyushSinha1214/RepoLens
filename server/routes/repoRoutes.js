const express = require("express");
const axios = require("axios");

const router = express.Router();

const githubConfig = {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
};

// Repository Details Route
router.get("/repo/:owner/:repo", async (req, res) => {
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

      owner: {
        login: response.data.owner.login,
        avatar: response.data.owner.avatar_url,
        profile: response.data.owner.html_url,
        type: response.data.owner.type,
      },
    };

    res.json(repoData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Contributors Route
router.get("/contributors/:owner/:repo", async (req, res) => {
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
    res.status(500).json({
      message: "Failed to fetch contributors",
    });
  }
});

// Languages Route
router.get("/languages/:owner/:repo", async (req, res) => {
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
router.get("/commits/:owner/:repo", async (req, res) => {
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

// Health Score Route
router.get("/health/:owner/:repo", async (req, res) => {
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
      commitsResponse.data?.slice(-4).reduce(
        (sum, week) => sum + week.total,
        0
      ) || 0;

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

    res.json({
      score,
      status,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate health score",
    });
  }
});

// AI Insights Route
router.get("/insights/:owner/:repo", async (req, res) => {
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
      commitsResponse.data?.slice(-4).reduce(
        (sum, week) => sum + week.total,
        0
      ) || 0;

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
    res.status(500).json({
      message: "Failed to generate insights",
    });
  }
});

module.exports = router;