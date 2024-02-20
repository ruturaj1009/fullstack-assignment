// dotenv
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

// database
const configDB = require("./config/db");

app.use(cors());
app.use(express.json());

// routes
const seedRoute = require("./routes/seedRoute");
const transactionRoute = require("./routes/transactionRoute");
const statisticsRoute = require("./routes/statisticsRoute");

app.use("/api", seedRoute);
app.use("/api", transactionRoute);
app.use("/api", statisticsRoute);

// production

app.use(express.static(path.join(path.resolve(), "/frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(path.resolve(), "frontend", "dist", "index.html"))
);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  configDB();
  console.log(`server started at ${PORT}`);
});
