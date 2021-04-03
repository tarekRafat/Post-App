require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
});

db.connect((err) => {
  if (err) throw err;
  console.log("mysql connected");
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});

module.exports = { app, db };
// app.get("/createposttable", (req, res) => {
//   let sql =
//     " CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255))";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send("post is created");
//     console.log(result);
//   });
// });

// app.get("/create", (req, res) => {
//   let sql = "CREATE DATABASE nodemysql";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send("database created");
//     console.log(result);
//   });
// });
//create table
