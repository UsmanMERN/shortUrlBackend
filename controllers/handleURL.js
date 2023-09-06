const urlModal = require("../models/url");
const shortid = require("shortid");

const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400);
  try {
    // Generate a new short URL and save it to the database:
    const shortUrl = shortid();
    const data = await urlModal({
      shortId: shortUrl,
      description: body.description,
      image: body.image,
      redirectURL: body.url,
      visitHistory: [],
    }).save();
    console.log(data);
    res.status(201).json(data)
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const handleRedirect = async (req, res) => {
  const url = req.params.url;
  const data = await urlModal.findOneAndUpdate(
    {
      shortId: url,
    },
    {
      $push: { visitHistory: { timestamp: Date.now() } },
    }
  );
  res.redirect(data.redirectURL);
};
const handleGetAnalytics = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await urlModal.findOne({ shortId: id });
    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }
    return res.json({
      analytics: result.visitHistory,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const handleFrontend = async (req, res) => {
  try {
    const allData = await urlModal.find({});
    res.render("home", { urls: allData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handleGenerateNewShortURL,
  handleRedirect,
  handleGetAnalytics,
  handleFrontend,
};
