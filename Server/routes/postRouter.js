const express = require("express");
const router = express.Router();
const {
  getUserPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controller/postController");
const upload = require("../middleware/fileupload");

router.get("/", getUserPost);
router.post("/", upload.single("image"), createPost);
router.patch("/update/:id", upload.single("image"), updatePost);
router.delete("/delete/:id", deletePost);

module.exports = router;
