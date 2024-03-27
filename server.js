const app = require("./app");
const db = require("./db/client");

require("dotenv").config();

const createSQL = `CREATE TABLE if not exists clients (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL)`;

db.query(createSQL)
  .then(() => {
    console.log('Table "clients" created or already exists');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Server running. Use our API on port: ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });
