process.env.NODE_ENV = "test";
const seedDB = require("../seed/seed");
const app = require("../app");
const { expect } = require("chai");
const testData = require("../seed/testData/index");
const request = require("supertest")(app);

describe("API", () => {
  let topicDocs, userDocs, commentDocs, articleDocs;
  beforeEach(function() {
    this.timeout(10000);
    return seedDB(testData).then(docs => {
      [articleDocs, topicDocs, userDocs, commentDocs] = docs;
      // console.log(userDocs[0], "ooooooo");
    });
  });

  describe("/topics", () => {
    it("GET returns a 200 status with all the topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics.length).to.eql(2);
          expect(res.body.topics[0].title).equal("Mitch");
          expect(res.body.topics).to.be.an("array");
        });
    });
    it("GET returns a 200 status with all articles for a certain topic", () => {
      return request
        .get(`/api/topics/${topicDocs[0].slug}/articles`)
        .expect(200)
        .then(res => {
          expect(res.body.article.length).to.equal(2);
          expect(res.body.article[0].title).to.equal(
            "Living in the shadow of a great man"
          );
          expect(res.body.article[0]).to.have.all.keys(
            "votes",
            "_id",
            "title",
            "created_by",
            "body",
            "created_at",
            "belongs_to",
            "__v"
          );
          expect(res.body.article).to.be.an("array");
        });
    });
    it("Get returns a 404 status when a topic doesnt exist", () => {
      // console.log(topicDocs[0].slug, "lllllllllllll");
      return request
        .get(`/api/topics/noTopic/articles`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Topic not found");
        });
    });
    it("Get returns a 400 for article that doesnt exist", () => {
      // console.log(topicDocs[0].slug, "lllllllllllll");
      return request
        .get(`/api/topics/${userDocs[0]._id}/articles`)
        .expect(400)
        .then(res => {
          console.log(res.body, "<<<<<<<<<,");
          expect(res.body.msg).to.equal("Topic not found");
        });
    });
    it("POST  Adds a new article to a topic", () => {
      // console.log(articleDocs, "<<<<<<<<<<<,");
      const newArticle = {
        title: "Living in the shadow of a great man",
        created_by: userDocs[0]._id,
        body: "I find this existence challenging",
        belongs_to: "mitch"
      };
      return request
        .post(`/api/topics/${topicDocs[0].slug}/articles`)
        .send(newArticle)
        .expect(201)
        .then(res => {
          expect(res.body.article).to.have.all.keys(
            "belongs_to",
            "title",
            "created_by",
            "body",
            "created_at",
            "votes",
            "_id",
            "__v"
          );

          expect(res.body.article.belongs_to).to.equal("mitch");
        });
    });
    it.only("POST send 404 when topic doesnt exist", () => {
      // console.log(articleDocs, "<<<<<<<<<<<,");
      const newArticle = {
        title: "Living ",
        created_by: userDocs[0]._id,
        body: "I find this existence challenging",
        belongs_to: "butter_bridge"
      };
      return request
        .post(`/api/topics/${topicDocs[1].slug}/articles`)
        .send(newArticle)
        .expect(404)
        .then(res => {
          console.log(res.body, "kkkkkkkkkkkk");
          expect(res.body.msg).to.eql("topic not found");
        });
    });
    it("Posts a new article with atopic that dosnt exist", () => {
      // console.log(articleDocs, "<<<<<<<<<<<,");
      const newArticle = {
        title: "Living in the shadow of a great man",
        created_by: "unknown",
        body: "I find this existence challenging",
        belongs_to: "dogs"
      };
      return request
        .post(`/api/topics/notopic/articles`)
        .send(newArticle)
        .expect(400)
        .then(res => {
          console.log(res.body, "@@@@@@@@@@@@@");
          expect(res.body.msg).to.eql("topic not found");
        });
    });
  });
  describe("/api/articles", () => {
    it("get all of the articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.eql(4);
          expect(res.body.articles[0]).to.have.all.keys(
            "_id",
            "title",
            "created_by",
            "body",
            "created_at",
            "belongs_to",
            "__v",
            "votes"
          );
        });
    });

    it("get an individual article", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.article.belongs_to).to.equal("mitch");
          expect(res.body.article).to.have.all.keys(
            "votes",
            "_id",
            "title",
            "created_by",
            "body",
            "created_at",
            "belongs_to",
            "__v"
          );
        });
    });
    it("get 404 when article doesnt exist", () => {
      return request
        .get(`/api/articles/${topicDocs[0]._id}`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("topic not found");
        });
    });
    it("get 400 when article doesnt exist", () => {
      return request
        .get(`/api/articles/noarticle`)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "noarticle" at path "_id" for model "articles"'
          );
        });
    });
    it("Get all the comments for a individual article", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments.length).to.eql(2);
          expect(res.body.comments[0]).to.have.all.keys(
            "votes",
            "_id",
            "body",
            "belongs_to",
            "created_by",
            "created_at",
            "__v"
          );
        });
    });
    it("Add a new comment to an article.", () => {
      // console.log(commentDocs);
      const newComment = {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works.",
        created_by: userDocs[0]._id,
        belongs_to: articleDocs[0]._id
      };
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .send(newComment)
        .expect(201)
        .then(res => {
          expect(res.body.comment).to.have.all.keys(
            "votes",
            "_id",
            "body",
            "belongs_to",
            "created_by",
            "created_at",
            "__v"
          );
        });
    });
    it("sends 404 when adding comment to article with wrong id.", () => {
      // console.log(commentDocs);
      const newComment = {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works.",
        created_by: topicDocs[0]._id
      };
      return request
        .post(`/api/articles/${commentDocs[0]._id}/comments`)
        .send(newComment)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("article not found");
        });
    });
    it("sends 400 when adding comment to article witch doesnt exsit.", () => {
      // console.log(commentDocs);
      const newComment = {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works.",
        created_by: "unknown"
      };
      return request
        .post(`/api/articles/unknown/comments`)
        .send(newComment)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "unknown" at path "_id" for model "articles"'
          );
        });
    });
    it("Patch Increment the vote of an article by one.", () => {
      return request
        .patch(`/api/articles/${articleDocs[0]._id}?vote=up`)
        .expect(201)
        .then(res => {
          expect(res.body.articleCount.votes).to.equal(1);
        });
    });
    it("Patch Increment the vote of an article with wrong id.", () => {
      return request
        .patch(`/api/articles/${topicDocs[0]._id}?vote=up`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("article not found");
        });
    });
    it("Patch Increment the vote of an article with id that doesnt exist.", () => {
      return request
        .patch(`/api/articles/unknown?vote=up`)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "unknown" at path "_id" for model "articles"'
          );
        });
    });
    it("Decrement the votes of an article by one.", () => {
      return request
        .patch(`/api/articles/${articleDocs[0]._id}?vote=down`)
        .expect(201)
        .then(res => {
          expect(res.body.articleCount.votes).to.equal(-1);
        });
    });
    it("Increment the vote of a comment by one.", () => {
      return request
        .patch(`/api/comments/${commentDocs[0]._id}?vote=up`)
        .expect(201)
        .then(res => {
          expect(res.body.commentCount.votes).to.equal(8);
        });
    });
    it("Decrements the votes of a comment by one.", () => {
      return request
        .patch(`/api/comments/${commentDocs[0]._id}?vote=down`)
        .expect(201)
        .then(res => {
          expect(res.body.commentCount.votes).to.equal(6);
        });
    });
  });
  describe("/comments", () => {
    it("Deletes a comment", () => {
      return request
        .delete(`/api/comments/${commentDocs[0]._id}`)
        .expect(201)
        .then(res => {
          expect(res.body.comment).to.have.all.keys(
            "__v",
            "_id",
            "belongs_to",
            "body",
            "created_at",
            "created_by",
            "votes"
          );
        });
    });
    it("Deletes a comment that doesnt that doesnt exist", () => {
      return request
        .delete(`/api/comments/${topicDocs[0]._id}`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("comment not found");
        });
    });
    it("Deletes a comment that doesnt that doesnt exist", () => {
      return request
        .delete(`/api/comments/unknown`)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "unknown" at path "_id" for model "comments"'
          );
        });
    });
  });
  describe("/users", () => {
    it("GET user by username", () => {
      console.log(userDocs, "<<<<<<<<<");
      return request

        .get(`/api/users/${userDocs[0].username}`)
        .expect(200)
        .then(res => {
          expect(res.body.users[0].username).to.equal("butter_bridge");
        });
    });
  });
});
