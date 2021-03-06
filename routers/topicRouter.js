const topicRouter = require("express").Router();
const {
  getAllTopics,
  getArticleByTopic,
  addArticleToTopic
} = require("../controllers/topicController");

topicRouter.get("/", getAllTopics);
topicRouter.get("/:topic_slug/articles", getArticleByTopic);
topicRouter.post("/:topic_slug/articles", addArticleToTopic);

module.exports = { topicRouter };
