const express = require("express");
const { checkToken } = require("../token/token_validation");
const router = express.Router();
const post_controller = require("../controller/post_controler");
const user_controler = require("../controller/user_controler");

router.post("/users", user_controler.createUser);
router.get("/users", user_controler.getUsers);
router.get("/users/:id", user_controler.getUser);
router.post("/users/login", user_controler.loginUser);
// router.delete("/users/logout", user_controler.logout);

//posts
router.get("/posts", post_controller.getPosts);
router.get("/users/:id/posts", checkToken, post_controller.getPost);
router.post("/users/:id/posts", checkToken, post_controller.createPost);
router.put("/users/:id/posts", checkToken, post_controller.editPost);
router.delete("/users/:id/posts", checkToken, post_controller.deletePost);

module.exports = router;
