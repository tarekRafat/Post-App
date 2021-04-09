const jwt = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      jwt.verify(token, "secret", (err, decoded) => {
        // decoded contains all info about token
        if (err) {
          res.send({
            success: 0,
            message: "Invalid token",
          });
        } else {
          next();
        }
      });
    } else {
      res.send({
        success: 0,
        message: "Acces denaid unautharized user",
        idToken: token,
      });
    }
  },
};
