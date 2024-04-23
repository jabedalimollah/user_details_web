const mongoose = require("mongoose");

mongoose.connect(
  `${process.env.DATABASE_CONNECTION}/${process.env.DATABASE_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database connected");
});

db.on("error", (err) => {
  console.log("Database Connection Error", err);
});

db.on("disconnected", () => {
  console.log("Database Disconnected");
});

module.exports = db;
