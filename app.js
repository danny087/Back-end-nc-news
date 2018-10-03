const app = require("express")();
const { apiRouter } = require("./routers/apiRouter");
const mongoose = require("mongoose");
const { DB_URL } = require("./config");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(console.log(`connected to ${DB_URL}`));
app.use(cors());
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

module.exports = app;
