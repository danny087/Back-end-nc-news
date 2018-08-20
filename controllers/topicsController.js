const { Topic, Article } = require("../models/index");

const getAllTopics = (req, res, next) => {
  // console.log("hello");
  Topic.find({}).then(topics => {
    // console.log("topics");
    res.status(200).send({ topics });
  });
};

const getArticleByTopic = (req, res, next) => {
  // console.log(req.params.topic_slug, "jjjjj");
  Article.find({ belongs_to: req.params.topic_slug }).then(articles => {
    res.status(200).send({ articles });
  });
};

const addArticleToTopic = (req, res, next) => {
  // console.log(req.body, "hhhhxxxxx");
  // console.log(newArticle, "<<<<<");
  Article.create({
    belongs_to: req.params.topic_slug,
    title: req.body.title,
    created_by: req.body.created_by,
    body: req.body.body
  }).then(articles => {
    res.status(201).send({ articles });
  });

  // Article.insert.many
  // );
};

module.exports = { getAllTopics, getArticleByTopic, addArticleToTopic };
