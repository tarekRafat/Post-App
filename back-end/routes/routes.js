const express = require("express");
const router = express.Router();
const post_controller = require("../controller/post_controler");

router.get("/posts", post_controller.getPosts);
router.post("/posts", post_controller.createPost);
router.put("/posts/:id", post_controller.editPost);
router.delete("/posts/:id", post_controller.deletePost);

module.exports = router;
