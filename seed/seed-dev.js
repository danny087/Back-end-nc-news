const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/NC-news";
// "mongodb://localhost:27017/NC_news"
const data = require("./devData");
const seedDB = require("./seed");

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
  });

// mongoose
//   .connect(
//     DB_URL,
//     { useNewUrlParser: true }
//   )
