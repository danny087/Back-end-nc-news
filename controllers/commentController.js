const { Comment } = require("../models/index");
const voteComment = (req, res, next) => {
  // console.log(req.query.vote, "^^^^^^^^");
  // console.log(req.params, ">>>>>>>>.");
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
      console.log(commentCount);
      res.status(201).send({ commentCount });
    });
  }
};

module.exports = { voteComment };
