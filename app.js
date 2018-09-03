const app = require("express")();
<<<<<<< HEAD
const { apiRouter } = require("./routers/apiRouter");
const mongoose = require("mongoose");
const { DB_URL } = require("./config");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
=======
const { topicRouter } = require("./router/topicRouter");
const { articlesRouter } = require("./router/articlesRouter");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use("/api/topics", topicRouter);
app.use("/api/articles", articlesRouter);
const mongoose = require("mongoose");
const { DB_URL } = require("./config/config");
>>>>>>> e52fe74d96943a144a59883432ffa28dca682b1d
mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(console.log(`connected to ${DB_URL}`));
<<<<<<< HEAD

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log(err, "@@@@@@");
  if (err.name === "CastError") {
    res.status(400).send({ msg: err.message });
  } else if (err.status === 404) {
    console.log(err.status, "<<<<<<<<<<<<!!!!!!");
    res.status(404).send({ msg: err.message });
  }
});

=======
>>>>>>> e52fe74d96943a144a59883432ffa28dca682b1d
module.exports = app;
