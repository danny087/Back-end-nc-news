process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const config = {
  dev: { DB_URL: "mongodb://localhost:27017/NC_news" },
  test: { DB_URL: "mongodb://localhost:27017/NC_news_test" },
  production: {
    DB_URL:
      "mongodb://danny087:northcoders087@ds119663.mlab.com:19663/northcoders-news-new"
  }
};

module.exports = config[process.env.NODE_ENV];

// "mongodb://danny087:formby087@ds143262.mlab.com:43262/northcoders-news"
