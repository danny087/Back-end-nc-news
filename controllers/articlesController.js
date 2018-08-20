const { Topic, Article, Comment } = require("../models/index");

const getAllArticles = (req, res) => {
  Article.find({}).then(articles => {
    res.status(200).send({ articles });
  });
};

const getArticleById = (req, res) => {
  console.log(req.params, "aaaa");
  // Article.find({})
  Article.findOne({ _id: req.params._id }).then(article => {
    if (article.body !== null) {
      res.status(200).send({ article });
    }
  });
};

const getAllComments = (req, res) => {
  console.log(req.params, "<<<<<<<");

  Comment.find({ belongs_to: req.params._id }).then(comments => {
    res.status(200).send({ comments });
  });
};

const addNewComment = (req, res) => {
  console.log(req.query, "<<<<<<<<<<<<<<<<<");
};

module.exports = { getAllArticles, getArticleById, getAllComments };
