const seedDB = require("./seed");
const mongoose = require("mongoose");
const { DB_URL } = require("../config/config");
const data = require("./devData");

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    return seedDB(data);
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log(`Disconnected from ${DB_URL}`);
  });
