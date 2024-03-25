const { Pool } = require("pg");
require("dotenv").config();
const { USER_NAME, HOST, DATABASE, PASSWORD } = process.env;
console.log(PASSWORD, USER_NAME);
const pool = new Pool({
  user: USER_NAME,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: 5432,
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

module.exports = { query };
