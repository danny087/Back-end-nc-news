const { Article, Comment } = require("../models/index");

const getAllArticles = (req, res, next) => {
  Article.find({}).then(articles => {
    res.status(200).send({ articles });
  });
};

const getArticleById = (req, res, next) => {
  console.log(req.params, "<<<<<<<<");
  Article.findById(req.params._id)
    .then(article => {
      if (article === null) throw { message: "topic not found", status: 404 };
      res.status(200).send({ article });
    })
    .catch(err => next(err));
};

const getAllComments = (req, res, next) => {
  Comment.find({
    belongs_to: req.params._id,
    body: "I find this existence challenging"
  }).then(comments => {
    // console.log(comments, "oooooooo");
    res.status(200).send({ comments });
  });
};

const addComment = (req, res, next) => {
  return Article.findById(req.params._id)
    .then(article => {
      if (article === null) throw { message: "article not found", status: 404 };
      return Comment.create({
        body: req.body.body,
        belongs_to: req.params._id,
        created_by: req.body.created_by
      });
    })
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(err => next(err));
};

const voteAarticle = (req, res, next) => {
  Article.findById(req.params._id)
    .then(article => {
      if (article === null) throw { message: "article not found", status: 404 };
      else if (req.query.vote === "up") {
        Article.findByIdAndUpdate(
          req.params._id,
          { $inc: { votes: 1 } },
          { new: true }
        ).then(articleCount => {
          res.status(201).send({ articleCount });
        });
      } else if (req.query.vote === "down") {
        Article.findByIdAndUpdate(
          req.params._id,
          { $inc: { votes: -1 } },
          { new: true }
        ).then(articleCount => {
          res.status(201).send({ articleCount });
        });
      }
    })
    .catch(err => next(err));
};

module.exports = {
  getAllArticles,
  getArticleById,
  getAllComments,
  addComment,
  voteAarticle
};
