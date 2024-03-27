const { Pool } = require("pg");

require("dotenv").config();

const { USER_NAME, HOST, DATABASE, PASSWORD } = process.env;

// const pool = new Pool({
//   user: USER_NAME,
//   host: HOST,
//   database: DATABASE,
//   password: PASSWORD,
//   port: 5432,
// });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connect to PostgreSQL successfully!");
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

module.exports = { query };
