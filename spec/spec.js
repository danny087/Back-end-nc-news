process.env.NODE_ENV = "test";
const seedDB = require("../seed/seed");
const app = require("../app");
const { expect } = require("chai");
const testData = require("../seed/testData/index");
const request = require("supertest")(app);

describe("/api", () => {
  let topicDocs, userDocs, commentDocs, articleDocs;
  beforeEach(function() {
    this.timeout(5000);
    return seedDB(testData).then(docs => {
      [articleDocs, topicDocs, userDocs, commentDocs] = docs;
      console.log(userDocs[0], "ooooooo");
    });
  });
  describe("/topics", () => {
    it("GET returns the topics", () => {
      // console.log(userDocs[0]._id, "<<<<<<");
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics.length).to.eql(2);
        });
    });
  });
  it("Return all the articles for a certain topic", () => {
    return request
      .get(`/api/topics/${topicDocs[0].slug}/articles`)
      .expect(200)
      .then(res => {
        // console.log(res.body, "hhhhhhhh");
        expect(res.body.articles.length).to.eql(2);
      });
  });
  it("Post a article relating to a certain topic", () => {
    // console.log(userDocs[0], "<<<<<<");
    const newArticle = {
      title: "They're not exactly dogs, are they?",
      topic: "cats",
      created_by: userDocs[0]._id,
      body: "Well? Think about it.",
      created_at: 1500659650346
    };

    return request
      .post(`/api/topics/${topicDocs[0].slug}/articles`)
      .send(newArticle)
      .expect(201)
      .then(res => {
        console.log("??????", res.body, "<<<<<<<<<<<<<<<<lll");
        expect(res.body.articles).has.all.keys(
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
          expect(res.body.article.belongs_to).to.eql("mitch");
        });
    });
    it.only("add a new comment to an article", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments.length).to.eql(2);
        });
    });
    it("add new comment to an article", () => {
      return request
        .post(`/api/articles${articleDocs[0]._id}/commments`)
        .send(newComment)
        .expect(201)
        .then(res => {
          const newArticle = {
            title: "They're not exactly dogs, are they?",
            topic: "cats",
            created_by: userDocs[0]._id,
            body: "Well? Think about it.",
            created_at: 1500659650346
          };
        });
    });
  });
});
