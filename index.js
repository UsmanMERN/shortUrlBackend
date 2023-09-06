const express = require("express");
const path = require("path");
const { route } = require("./routes/urlRoute");
const { config } = require("dotenv");
const app = express();
const staticRoute = require("./staticRoute");
// Enable CORS for all routes
app.use(cors());
const cors = require("cors")
config();
// json
app.use(express.json());
// database
const { connectDB } = require("./config/connectDb");

connectDB();

// middleWare
app.use("/", route);
// app.use("/", staticRoute);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// app.get("/home", (req, res) => {
//   res.render("home");
// });
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
// https://learnwithfaizan.onrender.com