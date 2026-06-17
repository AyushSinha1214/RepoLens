const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "RepoLens Backend Running 🚀"
    });
});

// GitHub Repo Route
app.get("/api/repo/:owner/:repo", async (req, res) => {
    try {
        const { owner, repo } = req.params;

        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}`
        );

        const repoData = {
    name: response.data.name,
    description: response.data.description,
    stars: response.data.stargazers_count,
    forks: response.data.forks_count,
    issues: response.data.open_issues_count,
    language: response.data.language,
    createdAt: response.data.created_at,
    updatedAt: response.data.updated_at,
    url: response.data.html_url
};

res.json(repoData);

    } catch (error) {
        res.status(404).json({
            message: "Repository not found"
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});