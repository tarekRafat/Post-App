const express = require("express");
const router = express.Router();
const post_controller = require("../controller/post_controler");
const user_controler = require("../controller/user_controler");

router.get("/posts", post_controller.getPosts);
router.get("/posts/:id", post_controller.getPost);
router.post("/posts", post_controller.createPost);
router.put("/posts/:id", post_controller.editPost);
router.delete("/posts/:id", post_controller.deletePost);

router.post("/users", user_controler.createUser);
router.get("/users", user_controler.getUsers);
router.get("/users/:id", user_controler.getUser);
router.post("/users/login", user_controler.loginUser);
module.exports = router;
