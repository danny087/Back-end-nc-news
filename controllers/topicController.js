const { Topic, Article } = require("../models/index");

const getAllTopics = (req, res, next) => {
  Topic.find({}).then(topics => {
    res.status(200).send({ topics });
  });
};

const getArticleByTopic = (req, res, next) => {
  return Article.find({ belongs_to: req.params.topic_slug })
    .then(article => {
      if (article.length !== 0) {
        res.status(200).send({ article });
      } else {
        next({ status: 404, message: "Topic not found" });
      }
    })
    .catch(err => next(err));
};

const addArticleToTopic = (req, res, next) => {
  Topic.find({ slug: req.params.topic_slug })

    .then(topic => {
      if (topic.length === 0) throw { message: "topic not found", status: 404 };

      return Article.create({
        belongs_to: req.params.topic_slug,
        title: req.body.title,
        created_by: req.body.created_by,
        body: req.body.body
      });
    })
    .then(article => {
      console.log(article, "lllllllllllllllll");
      res.status(201).send({ article });
    })
    .catch(err => next(err));
};

module.exports = { getAllTopics, getArticleByTopic, addArticleToTopic };
