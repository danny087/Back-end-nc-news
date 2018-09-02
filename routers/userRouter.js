const userRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/userController");

userRouter.get("/:username", getUserByUsername);

module.exports = { userRouter };
