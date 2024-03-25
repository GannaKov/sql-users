const express = require("express");
const db = require("../db/client");

usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM clients");

    if (result.rows.length === 0) {
      throw { status: 404, message: "Not found" };
    }
    res.send(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await db.query(`SELECT * FROM clients
 WHERE id = ${id} `);

    if (!result.rows[0]) {
      throw { status: 404, message: "Not found" };
    }
    res.send(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;

  console.log(firstName, lastName);
  //const queryString = `INSERT INTO clients (firstname, lastname) VALUES ('${firstName}', '${lastName}')`;
  try {
    // const result = await db.query(queryString);
    const result = await db.query(
      "INSERT INTO clients (firstname, lastname) VALUES ($1, $2)",
      [firstName, lastName]
    );
    console.log("res", result);
    res.send(`Inserted ${result.rowCount} rows successfully`);
  } catch (error) {
    console.error("Error inserting client:", error);
    next(error);
  }
});

module.exports = usersRouter;

//{firstname:'Aaaaa', 'lastname:'bbbbb'}
