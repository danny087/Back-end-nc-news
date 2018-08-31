process.env.NODE_ENV = "test";
const seedDB = require("../seed/seed");
const app = require("../app");
const { expect } = require("chai");
const testData = require("../seed/testData/index");
const request = require("supertest")(app);

describe("API", () => {
  let topicDocs, userDocs, commentDocs, articleDocs;
  beforeEach(function() {
    this.timeout(5000);
    return seedDB(testData).then(docs => {
      [articleDocs, topicDocs, userDocs, commentDocs] = docs;
      // console.log(userDocs[0], "ooooooo");
    });
  });

  describe("/topics", () => {
    it("GET returns the topics", () => {
      // console.log(userDocs[0]._id, "<<<<<<");
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          // console.log(res.body.topics[0], "<<<<<<<<<<<,");
          expect(res.body.topics.length).to.eql(2);
          expect(res.body.topics[0].title).equal("Mitch");
        });
    });
    it("Get returns all articles for a certain topic", () => {
      // console.log(topicDocs[0].slug, "lllllllllllll");
      return request
        .get(`/api/topics/${topicDocs[0].slug}/articles`)
        .expect(200)
        .then(res => {
          console.log(res.body.article[0], "kkkkkkkk");
          expect(res.body.article.length).to.equal(2);
          expect(res.body.article[0].title).to.equal(
            "Living in the shadow of a great man"
          );
        });
    });
    it.only("Get returns a 400 all articles for a certain topic", () => {
      // console.log(topicDocs[0].slug, "lllllllllllll");
      return request
        .get(`/api/topics/noTopic/articles`)
        .expect(400)
        .then(res => {
          console.log(res, "$$$$$$");
        });
    });
    it("Post Add a new article to a topic", () => {
      console.log(articleDocs, "<<<<<<<<<<<,");
      const newArticle = {
        title: "Living in the shadow of a great man",
        created_by: userDocs[0]._id,
        body: "I find this existence challenging",
        belongs_to: "mitch"
      };
      return request
        .post(`/api/topics/${topicDocs[0].slug}/articles`)
        .send(newArticle)
        .then(res => {
          console.log(res.body, "************");
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
        });
    });
  });
  describe("/api/articles", () => {
    it("get all of the articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          console.log(res.body.articles, "ededede");
          expect(res.body.articles.length).to.eql(4);
        });
    });
    it("get an individual article", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(res => {
          console.log(res.body.article, "lllllllllll");
          expect(res.body.article.belongs_to).to.equal("mitch");
        });
    });
    it("get 404 when article doesnt exist an individual article", () => {
      return request
        .get(`/api/articles/noarticle`)
        .expect(404)
        .then(res => {
          console.log(res.body, "^^^^^^^");
          expect(res.body.mess).to.equal(
            'Cast to ObjectId failed for value "noarticle" at path "_id" for model "articles"'
          );
        });
    });
    it("Get all the comments for a individual article", () => {
      console.log(articleDocs[0], "rrrrrrrr");
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {
          console.log(res.body.comments, "kkkkkkkkk");
          expect(res.body.comments.length).to.eql(2);
        });
    });
    it("Add a new comment to an article.", () => {
      // console.log(commentDocs);
      const newComment = {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works.",
        created_by: userDocs[0]._id
      };
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .send(newComment)
        .expect(201)
        .then(comment => {
          console.log(res.body, "<<<<<<<<<<<<");
        });
    });
    it("Patch Increment or Decrement the votes of an article by one.", () => {
      return request
        .patch(`/api/articles/${articleDocs[0]._id}?vote=down`)
        .expect(201)
        .then(vote => {
          console.log(vote);
        });
    });
    it("Increment or Decrement the votes of a comment by one.", () => {
      return request
        .patch(`/api/comments/${commentDocs[0]._id}?vote=down`)
        .expect(201)
        .then(vote => {
          console.log(vote, "^^^^^^^^^");
        });
    });
  });
});
