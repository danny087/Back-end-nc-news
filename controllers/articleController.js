const { Article, Comment } = require("../models/index");

const getAllArticles = (req, res, next) => {
  Article.find({}).then(articles => {
    console.log("articles", "<<<<<<<<<");
    res.status(200).send({ articles });
  });
};

const getArticleById = (req, res, next) => {
  console.log("getting called");
  Article.findById(req.params._id)
    .then(article => {
      console.log(article, "****");
      if (article.body !== null) {
        res.status(200).send({ article });
      }
    })
    .catch(err => next(err));
};

const getAllComments = (req, res, next) => {
  console.log(req.params._id, "sssssss");
  Comment.find({ belongs_to: req.params._id }).then(comments => {
    // console.log(comments, "oooooooo");
    res.status(200).send({ comments });
  });
};

const addComment = (req, res, next) => {
  // console.log(req.params, req.body, "44444444");
  Comment.create({
    body: req.body.body,
    belongs_to: req.params._id,
    created_by: req.body.created_by
  }).then(comment => {
    console.log(comment, "????????");
    res.status(201).send({ comment });
  });
};

const voteAarticle = (req, res, next) => {
  // console.log(req.query.vote, "<<<<<<<<<<<<<<<");
  // console.log(req.params);
  if (req.query.vote === "up") {
    Article.findByIdAndUpdate(
      req.params._id,
      { $inc: { votes: 1 } },
      { new: true }
    ).then(articleCount => {
      // console.log(articleCount, "*********");
      res.send(201).res.send({ articleCount });
    });
  } else if (req.query.vote === "down") {
    Article.findByIdAndUpdate(
      req.params._id,
      { $inc: { votes: -1 } },
      { new: true }
    ).then(articleCount => {
      res.status(201).res.send({ articleCount });
    });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  getAllComments,
  addComment,
  voteAarticle
};
