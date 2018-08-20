const mongoose = require("mongoose");
const {
  generateTopics,
  generateUsers,
  generateArticles,
  generateComments
} = require("../utils");
// const { Topic } = require("../models/Topic");
// const { User } = require("../models/User");
// const { Article } = require("../models/Article");
// const { Comment } = require("../models/Comment");
const { Topic, User, Article, Comment } = require("../models");

const seedDB = ({ topicsData, usersData, articlesData, commentsData }) => {
  // console.log("seed");
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(generateTopics(topicsData)),
        User.insertMany(generateUsers(usersData))
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      // console.log(Array.isArray(userDocs), "hhhhhh");
      // console.log(topicDocs, userDocs);
      const articles = generateArticles(articlesData, userDocs);
      return Promise.all([
        Article.insertMany(articles),
        topicDocs,
        userDocs
      ]).then(([articleDocs, topicDocs, userDocs]) => {
        // console.log(articleDocs, "fffff");
        const comments = generateComments(
          articleDocs,
          topicDocs,
          userDocs,
          commentsData
        );
        // console.log(comments);
        return Promise.all([
          articleDocs,
          topicDocs,
          userDocs,
          Comment.insertMany(comments)
        ]);
        // console.log(commentsData, "lllll");
      });
    });
};

module.exports = seedDB;
