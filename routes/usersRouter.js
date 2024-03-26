const express = require("express");
const {
  getAllUsers,
  getUserById,
  putUser,
  deleteUser,
  postUser,
} = require("../services/services");

const { body } = require("express-validator");

usersRouter = express.Router();

usersRouter.get("/", getAllUsers);

usersRouter.get("/:id", getUserById);

usersRouter.put("/:id", putUser);

usersRouter.delete("/:id", deleteUser);

usersRouter.post(
  "/",
  body("firstname").notEmpty().escape(),
  body("lastname").notEmpty().escape(),
  postUser
);

module.exports = usersRouter;

//{firstname:'Aaaaa', 'lastname:'bbbbb'}
