const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    description: {
      type: String, // Add a field for description
      required: true, // Make it optional
    },
    image: {
      type: String, // Add a field for image URL
      required: true, // Make it optional
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("url", urlSchema);
