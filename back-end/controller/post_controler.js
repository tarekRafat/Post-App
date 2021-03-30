module.exports = {
  getPosts: (req, res) => {
    const app = require("../app");
    let query = "SELECT * FROM posts";
    app.db.query(query, (err, results) => {
      if (err) {
        res.status(422);
      }
      res.send(results);
    });
  },

  createPost: (req, res) => {
    const app = require("../app");
    let { title, body } = req.body;
    console.log(req);
    let query = "INSERT INTO posts(title,body)  VALUES (?,?)";
    app.db.query(query, [title, body], (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  },

  editPost: (req, res) => {
    const app = require("../app");
    let { id } = req.params;
    let { title, body } = req.body;
    let query = `UPDATE posts SET posts.title=?,posts.body=? WHERE id=${id}`;
    app.db.query(query, [title, body], (err, results) => {
      if (err) throw err;
      res.status(200).send(results);
    });
  },

  deletePost: (req, res) => {
    const app = require("../app");
    let { id } = req.params;
    console.log(req.params);
    let query = `DELETE FROM posts WHERE id=${id}`;
    app.db.query(query, (err, results) => {
      if (err) throw err;
      res.status(200);
    });
  },
};
