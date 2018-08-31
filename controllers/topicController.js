const { Topic, Article } = require("../models/index");

const getAllTopics = (req, res, next) => {
  Topic.find({}).then(topics => {
    // console.log("topics");
    res.status(200).send({ topics });
  });
};

const getArticleByTopic = (req, res, next) => {
  console.log(req.params);
  return Article.find({ belongs_to: req.params.topic_slug })
    .then(article => {
      console.log(article, "**************");
      if (article !== null) {
        res.status(200).send({ article });
      }
    })
    .catch(err => next(err));
};

const addArticleToTopic = (req, res, next) => {
  console.log(req.params, req.body, "&&&&&&&&&");
  Article.create({
    belongs_to: req.params.topic_slug,
    title: req.body.title,
    created_by: req.body.created_by,
    body: req.body.body
  })
    .then(article => {
      console.log(article, "lllllllllllllllll");
      res.status(201).send({ article });
    })
    .catch(console.log);
};

module.exports = { getAllTopics, getArticleByTopic, addArticleToTopic };
