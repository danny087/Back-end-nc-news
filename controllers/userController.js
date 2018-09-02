const { User, Article } = require("../models/index");

const getUserByUsername = (req, res, next) => {
  return User.find({ username: req.params.username })
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(err => next(err));
};

module.exports = { getUserByUsername };
