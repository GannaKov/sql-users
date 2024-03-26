const db = require("../db/client");
const { matchedData, validationResult } = require("express-validator");

//all users
const getAllUsers = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM clients");

    if (result.rows.length === 0) {
      throw { status: 404, message: "Not found" };
    }

    res.send(result.rows);
  } catch (error) {
    next(error);
  }
};
//by Id
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await db.query(
      `SELECT * FROM clients
 WHERE id = $1 `,
      [id]
    );

    if (!result.rows[0]) {
      throw { status: 404, message: "Not found" };
    }
    res.send(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//change user
const putUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    if (!firstName || !lastName) {
      throw { status: 400, message: "Bad Request" };
    }
    const user = await db.query(
      `SELECT * FROM clients
 WHERE id = $1 `,
      [id]
    );
    if (!user) {
      throw { status: 404, message: "Not Found" };
    }
    text = `UPDATE clients
SET firstname = $1, lastname = $2 
WHERE id=$3 RETURNING *`;
    const values = [firstName, lastName, id];
    const resultPut = await db.query(text, values);

    res.send(resultPut.rows[0]);
  } catch (error) {
    next(error);
  }
};

//delete userSelect:

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await db.query(`SELECT * FROM clients
 WHERE id = ${id} `);
    if (!user) {
      throw { status: 404, message: "Not Found" };
    }
    const resultDelete = await db.query(
      `DELETE FROM clients WHERE id=$1 RETURNING *`,
      [id]
    );

    res.send(resultDelete.rows[0]);
  } catch (error) {
    next(error);
  }
};
//post userSelect:
const postUser = async (req, res, next) => {
  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const data = matchedData(req);

      const resultPost = await db.query(
        "INSERT INTO clients (firstname, lastname) VALUES ($1, $2)  RETURNING *",
        [data.firstname, data.lastname]
      );
      console.log(resultPost);
      return res.send(resultPost.rows[0]);
    } else {
      throw { status: 400, message: "Bad Request", errors: result.array() };
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllUsers, getUserById, putUser, deleteUser, postUser };
