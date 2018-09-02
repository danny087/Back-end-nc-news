const commentRouter = require("express").Router();
const {
  voteComment,
  deleteComment
} = require("../controllers/commentController");

commentRouter.patch("/:_id", voteComment);
commentRouter.delete("/:_id", deleteComment);

module.exports = { commentRouter };
