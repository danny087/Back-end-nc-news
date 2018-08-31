const articleRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  getAllComments,
  addComment,
  voteAarticle
} = require("../controllers/articleController");

articleRouter.get("/", getAllArticles);
articleRouter.get("/:_id", getArticleById);
articleRouter.get("/:_id/comments", getAllComments);
articleRouter.post("/:_id/comments", addComment);
articleRouter.patch("/:_id", voteAarticle);

module.exports = { articleRouter };
