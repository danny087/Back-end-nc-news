const { Comment } = require("../models/index");
const voteComment = (req, res, next) => {
  if (req.query.vote === "up") {
    Comment.findByIdAndUpdate(
      req.params._id,
      { $inc: { votes: 1 } },
      { new: true }
    ).then(commentCount => {
      res.status(201).send({ commentCount });
    });
  } else if (req.query.vote === "down") {
    Comment.findByIdAndUpdate(
      req.params._id,
      { $inc: { votes: -1 } },
      { new: true }
    ).then(commentCount => {
      res.status(201).send({ commentCount });
    });
  }
};

const deleteComment = (req, res, next) => {
  console.log(req.params);
  return Comment.findByIdAndRemove(req.params._id)
    .then(comment => {
      console.log(comment, "<<<<<<<<<<<zzz");
      if (comment === null) throw { message: "comment not found", status: 404 };
      else {
        res.status(201).send({ comment });
      }
    })
    .catch(err => next(err));
};

module.exports = { voteComment, deleteComment };
