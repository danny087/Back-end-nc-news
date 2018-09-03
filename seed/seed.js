const mongoose = require("mongoose");
const {
  generateTopics,
  generateUsers,
  generateArticles,
  generateComments
<<<<<<< HEAD
} = require("../utlis");
const { Topic, User, Article, Comment } = require("../models/index");

const seedDB = ({ topicData, userData, articleData, commentData }) => {
=======
} = require("../utils");
// const { Topic } = require("../models/Topic");
// const { User } = require("../models/User");
// const { Article } = require("../models/Article");
// const { Comment } = require("../models/Comment");
const { Topic, User, Article, Comment } = require("../models");

const seedDB = ({ topicsData, usersData, articlesData, commentsData }) => {
  // console.log("seed");
>>>>>>> e52fe74d96943a144a59883432ffa28dca682b1d
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
<<<<<<< HEAD
        Topic.insertMany(topicData),
        User.insertMany(generateUsers(userData))
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      const articles = generateArticles([articleData, userDocs, topicDocs]);
=======
        Topic.insertMany(generateTopics(topicsData)),
        User.insertMany(generateUsers(usersData))
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      // console.log(Array.isArray(userDocs), "hhhhhh");
      // console.log(topicDocs, userDocs);
      const articles = generateArticles(articlesData, userDocs);
>>>>>>> e52fe74d96943a144a59883432ffa28dca682b1d
      return Promise.all([
        Article.insertMany(articles),
        topicDocs,
        userDocs
      ]).then(([articleDocs, topicDocs, userDocs]) => {
<<<<<<< HEAD
        const comments = generateComments([commentData, articleDocs, userDocs]);
        return Promise.all([
          Comment.insertMany(comments),
          articleDocs,
          topicDocs,
          userDocs
        ]).then(([commentDocs, articleDocs, topicDocs, userDocs]) => {
          return [articleDocs, topicDocs, userDocs, commentDocs];
        });
=======
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
>>>>>>> e52fe74d96943a144a59883432ffa28dca682b1d
      });
    });
};

module.exports = seedDB;
