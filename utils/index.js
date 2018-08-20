const generateTopics = topicData => {
  return topicData.map(topic => {
    return {
      title: topic.title,
      slug: topic.slug
    };
  });
};

const generateUsers = userData => {
  return userData.map(user => {
    return {
      username: user.username,
      name: user.name,
      avatar_url: user.avatar_url
    };
  });
};
//find()

const generateArticles = (articleData, usersDocs) => {
  // const userIds = usersDocs.map(data => {
  //   return data._id;
  // });

  return articleData.map(article => {
    const user_name = usersDocs.find(user => {
      return user.username === article.created_by;
    });
    const created_by = user_name._id;

    // console.log(articleData[0].topic, "<<<<<");
    // console.log(usersData, "ggggggg");
    // console.log(article, "llll");
    return {
      title: article.title,
      body: article.body,
      votes: article.votes,
      created_at: article.created_at,
      belongs_to: article.topic,
      created_by
    };
  });
};

const generateComments = (articleDocs, topicDocs, userDocs, commentsData) => {
  return commentsData.map(comment => {
    // console.log(comment, "gggggg");

    return {
      body: comment.body,
      belongs_to: articleDocs.find(article => {
        return article.title === comment.belongs_to;
      })._id,
      created_at: comment.created_at,
      votes: comment.votes,
      created_by: userDocs.find(user => {
        return user.username === comment.created_by;
      })._id
    };
  });
};

module.exports = {
  generateTopics,
  generateUsers,
  generateArticles,
  generateComments
};
