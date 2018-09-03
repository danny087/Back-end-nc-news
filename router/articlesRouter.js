const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  getAllComments,
  addNewComment
} = require("../controllers/articlesController");
articlesRouter.get("/", getAllArticles);
articlesRouter.get("/:_id", getArticleById);
articlesRouter.get("/:_id/comments", getAllComments);
articlesRouter.post("/:_id/comments", addNewComment);
module.exports = { articlesRouter };
