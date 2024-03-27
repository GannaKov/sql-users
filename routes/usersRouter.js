const express = require("express");
const {
  getAllUsers,
  getUserById,
  putUser,
  deleteUser,
  postUser,
  checkUser,
} = require("../controllers/controllers");

const { body } = require("express-validator");

usersRouter = express.Router();

usersRouter.get("/", getAllUsers);

usersRouter.get("/:id", checkUser, getUserById);

usersRouter.put("/:id", checkUser, putUser);

usersRouter.delete("/:id", checkUser, deleteUser);

usersRouter.post(
  "/",
  body("firstname").notEmpty().escape(),
  body("lastname").notEmpty().escape(),
  postUser
);

module.exports = usersRouter;

//{firstname:'Aaaaa', 'lastname:'bbbbb'}
