module.exports = {
  getUsers(req, res) {
    const app = require("../app");
    let query =
      "SELECT user_ID,first_name,last_name,email,phone_number,password FROM user ";
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

    app.db.query(
      "SELECT * FROM user WHERE email =?",
      [email],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length === 1) {
          return res.status(401).send({
            success: 0,
            message: "User is already existed",
          });
        } else {
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
                const jwt = require("jsonwebtoken");

                const jsonToken = jwt.sign(
                  {
                    data: result[0],
                  },
                  process.env.SECRETKEY,
                  { expiresIn: "1hr" }
                );
                return res.status(201).send({
                  success: 1,
                  message: "User has been created successfully",
                  token: jsonToken,
                });
              }
            }
          );
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
    app.db.query(query, [email], (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results[0]) {
        return res
          .status(401)
          .send({ success: 0, message: "Coudn't find account with this mail" });
      }
      const comparePassword = bcrypt.compareSync(password, results[0].password);

      if (comparePassword) {
        const jwt = require("jsonwebtoken");

        const jsonToken = jwt.sign(
          {
            data: results[0],
          },
          process.env.SECRETKEY,
          { expiresIn: "1hr" }
        );
        res.cookie("SESSIONID", jsonToken, { httpOnly: true, secure: true });
        return res.send({
          success: 1,
          message: "login successfully",
          token: jsonToken,
          results: results[0],
        });
      } else {
        res.status(401).send({
          success: 0,
          message: "Invalid Password",
        });
      }
    });
  },

  logout(req, res) {
    let token = req.get("authorization");
    token = token.slice(7);
    res.send(token);
  },
};
