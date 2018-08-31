const commentRouter = require("express").Router();
const { voteComment } = require("../controllers/commentController");

commentRouter.patch("/:_id", voteComment);

module.exports = { commentRouter };
