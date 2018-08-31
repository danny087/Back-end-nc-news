const generateTopics = topicData => {
  return topicData.map(singleTopic => {
    return { ...singleTopic };
  });
};

const generateUsers = userData => {
  return userData.map(singleUser => {
    return { ...singleUser };
  });
};

const generateArticles = ([articleData, userDocs, topicDocs]) => {
  return articleData.map(singleArticle => {
    const belongs_to = topicDocs.find(topDoc => {
      return topDoc.slug === singleArticle.topic;
    }).slug;
    const created_by = userDocs.find(userDoc => {
      return userDoc.username === singleArticle.created_by;
    })._id;

    return { ...singleArticle, belongs_to, created_by };
  });
};

const generateComments = ([commentData, articleDocs, userDocs]) => {
  return commentData.map(singleComment => {
    const created_by = userDocs.find(userDoc => {
      return singleComment.created_by === userDoc.username;
    })._id;
    const belongs_to = articleDocs.find(articleDoc => {
      return articleDoc.title === singleComment.belongs_to;
    })._id;
    return { ...singleComment, created_by, belongs_to };
  });
};

module.exports = {
  generateTopics,
  generateUsers,
  generateArticles,
  generateComments
};
