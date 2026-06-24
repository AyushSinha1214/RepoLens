require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const repoRoutes = require("./routes/repoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("Mongo Error:", err.message));

app.get("/", (req, res) => {
  res.json({
    message: "RepoLens Backend Running 🚀",
  });
});

app.use("/api", repoRoutes);
app.use("/api/auth", authRoutes);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});