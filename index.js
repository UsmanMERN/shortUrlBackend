const express = require("express");
const path = require("path");
const { route } = require("./routes/urlRoute");
const { config } = require("dotenv");
const cors = require("cors")
const app = express();
// Enable CORS for all routes
app.use(cors());
config();
// json
app.use(express.json());
// database
const { connectDB } = require("./config/connectDb");

connectDB();

// middleWare
app.use("/", route);
// app.use("/", staticRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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