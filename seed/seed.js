const mongoose = require("mongoose");
const {
  generateTopics,
  generateUsers,
  generateArticles,
  generateComments
} = require("../utlis");
const { Topic, User, Article, Comment } = require("../models/index");

const seedDB = ({ topicData, userData, articleData, commentData }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(topicData),
        User.insertMany(generateUsers(userData))
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      const articles = generateArticles([articleData, userDocs, topicDocs]);
      return Promise.all([
        Article.insertMany(articles),
        topicDocs,
        userDocs
      ]).then(([articleDocs, topicDocs, userDocs]) => {
        const comments = generateComments([commentData, articleDocs, userDocs]);
        return Promise.all([
          Comment.insertMany(comments),
          articleDocs,
          topicDocs,
          userDocs
        ]).then(([commentDocs, articleDocs, topicDocs, userDocs]) => {
          return [articleDocs, topicDocs, userDocs, commentDocs];
        });
      });
    });
};

module.exports = seedDB;
