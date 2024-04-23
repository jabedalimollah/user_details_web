const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");
const bodyParser = require("body-parser");
const personRoutes = require("./routes/personRoutes");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: `http://localhost:5173`,
  // origin:'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.use("/person", personRoutes);

// const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("localhost://5000");
});
