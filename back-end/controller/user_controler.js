module.exports = {
  getUsers(req, res) {
    const app = require("../app");
    let query =
      "SELECT first_name,last_name,email,phone_number,password FROM user ";
    app.db.query(query, (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    });
  },

  getUser(req, res) {
    const app = require("../app");
    const userId = req.params.id;
    let query =
      "SELECT first_name,last_name,email,phone_number FROM user WHERE user_ID = ?";
    app.db.query(query, [userId], (err, user) => {
      if (err) {
        console.log(err);
      }
      res.status(200).send(user);
    });
  },

  createUser(req, res) {
    const app = require("../app");
    const { hashSync, genSaltSync } = require("bcrypt");

    let { first_name, last_name, email, phone_number, password } = req.body;
    const salt = genSaltSync(10);
    password = hashSync(password, salt);
    let query =
      "INSERT INTO user (first_name,last_name,phone_number,email,password) VALUES (?,?,?,?,?)";
    app.db.query(
      query,
      [first_name, last_name, phone_number, email, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).send(result);
        }
      }
    );
  },

  loginUser(req, res) {
    const app = require("../app");
    const jwt = require("jsonwebtoken");
    const bcrypt = require("bcrypt");

    let query = "SELECT * FROM user WHERE email=?";
    let { password, email } = req.body;
    console.log(password, email);
    app.db.query(query, [email], (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results[0]) {
        res.send({ success: 0, message: "Invalid Email OR Password" });
      }
      const comparePassword = bcrypt.compareSync(password, results[0].password);
      if (comparePassword) {
        const jsonToken = jwt.sign(
          {
            data: results[0],
          },
          "secret",
          { expiresIn: "1h" }
        );
        return res.send({
          success: 1,
          message: "login successfully",
          token: jsonToken,
        });
      } else {
        res.send({
          success: 0,
          message: "Invalid Email OR Password",
        });
      }
    });
  },
};
