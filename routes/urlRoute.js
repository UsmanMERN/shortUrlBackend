const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirect,
  handleGetAnalytics,
  handleFrontend,
} = require("../controllers/handleURL");

const route = express.Router();
route.get("/", (req, res) => {
  res.json("app is running...... oo yeah");
});

route.post("/url", handleGenerateNewShortURL);
route.get("/:url", handleRedirect);
route.get("/analytics/:id", handleGetAnalytics);
module.exports = {
  route,
};
// https://learnwithfaizan.onrender.com