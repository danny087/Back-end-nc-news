const app = require("express")();
const { topicRouter } = require("./router/topicRouter");
const { articlesRouter } = require("./router/articlesRouter");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use("/api/topics", topicRouter);
app.use("/api/articles", articlesRouter);
const mongoose = require("mongoose");
const { DB_URL } = require("./config/config");
mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(console.log(`connected to ${DB_URL}`));
module.exports = app;
