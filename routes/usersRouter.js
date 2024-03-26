const express = require("express");
const db = require("../db/client");
const {
  query,
  matchedData,
  validationResult,
  body,
} = require("express-validator");

usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM clients");

    if (result.rows.length === 0) {
      throw { status: 404, message: "Not found" };
    }

    res.send(result.rows);
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
usersRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    if (!firstName || !lastName) {
      throw { status: 400, message: "Bad Request" };
    }
    const user = await db.query(`SELECT * FROM clients
 WHERE id = ${id} `);
    if (!user) {
      throw { status: 404, message: "Not Found" };
    }
    text = `UPDATE clients
SET firstname = $1, lastname = $2 
WHERE id=${id} RETURNING *`;
    const values = [firstName, lastName];
    const resultPut = await db.query(text, values);

    res.send(resultPut.rows[0]);
  } catch (error) {
    next(error);
  }
});
// usersRouter.post("/", async (req, res, next) => {
//   const firstName = req.body.firstname;
//   const lastName = req.body.lastname;

//   console.log(firstName, lastName);

//   //const queryString = `INSERT INTO clients (firstname, lastname) VALUES ('${firstName}', '${lastName}')`;
//   try {
//     // const result = await db.query(queryString);
//     if (!firstName || !lastName) {
//       throw { status: 400, message: "Bad Request" };
//     }
//     const result = await db.query(
//       "INSERT INTO clients (firstname, lastname) VALUES ($1, $2)",
//       [firstName, lastName]
//     );

//     res.send(`Inserted ${result.rowCount} rows successfully`);
//   } catch (error) {
//     console.error("Error inserting client:", error);
//     next(error);
//   }
// });

usersRouter.post(
  "/",
  body("firstname").notEmpty().escape(),
  body("lastname").notEmpty().escape(),
  async (req, res, next) => {
    try {
      const result = validationResult(req);

      if (result.isEmpty()) {
        const data = matchedData(req);

        const resultPost = await db.query(
          "INSERT INTO clients (firstname, lastname) VALUES ($1, $2)",
          [data.firstname, data.lastname]
        );
        return res.send(`Inserted ${resultPost.rowCount} rows successfully`);
      } else {
        throw { status: 400, message: "Bad Request", errors: result.array() };
      }
    } catch (error) {
      next(error);
    }
  }
);
// body("email")
//   .isEmail()
//   .custom(async (value) => {
//     const existingUser = await Users.findByEmail(value);
//     if (existingUser) {
//       // Will use the below as the error message
//       throw new Error("A user already exists with this e-mail address");
//     }
// });
module.exports = usersRouter;

//{firstname:'Aaaaa', 'lastname:'bbbbb'}
