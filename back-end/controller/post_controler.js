module.exports = {
  getPosts: (req, res) => {
    const app = require("../app");
    let query = "SELECT * FROM post";
    app.db.query(query, (err, results) => {
      if (err) {
        res.status(422).send();
      }
      res.send(results);
    });
  },
  getPost: (req, res) => {
    const app = require("../app");
    let { id } = req.params;
    let query = `SELECT * FROM post WHERE user_user_ID=${id}`;
    app.db.query(query, (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    });
  },

  createPost: (req, res) => {
    const app = require("../app");
    let { title, body } = req.body;
    let { id } = req.params;
    console.log(req);
    let query = "INSERT INTO post(title,body,user_user_ID)  VALUES (?,?,?) ";
    app.db.query(query, [title, body, id], (err, results) => {
      if (err) throw err;
      res.status(201).send(results);
    });
  },

  editPost: (req, res) => {
    const app = require("../app");
    let { id } = req.params;
    let { title, body } = req.body;
    let query = `UPDATE post SET post.title=?,post.body=? WHERE post_id=${id}`;
    app.db.query(query, [title, body], (err, results) => {
      if (err) throw err;
      res.status(204).send();
    });
  },

  deletePost: (req, res) => {
    const app = require("../app");
    let { id } = req.params;
    let query = `DELETE FROM post WHERE post_id=${id}`;
    app.db.query(query, (err, results) => {
      if (err) throw err;
      res.status(204).send();
    });
  },
};
