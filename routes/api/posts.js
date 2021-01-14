const express = require("express");
const router = express.Router();
const User = require("../../schemas/UserSchema");
const Post = require("../../schemas/PostSchema");

router.get("/", (req, res, next) => {
  Post.find()
    .populate("author")
    .sort({ createdAt: -1 })
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

router.post("/", async (req, res, next) => {
  if (!req.body) {
    console.log("Content param not sent with request");
    return res.sendStatus(400);
  }

  var postData = {
    content: req.body.content,
    author: req.session.user,
  };

  Post.create(postData)
    .then(async (newPost) => {
      newPost = await User.populate(newPost, { path: "author" });
      res.status(201).send(newPost);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

router.put("/:id/like", async (req, res, next) => {
  var postId = req.params.id;
  var userId = req.session.user._id;

  var isLiked =
    req.session.user.likes && req.session.user.likes.includes(postId);

  // Insert user like
  // Insert post like

  res.status(200).send("Yahoo");
});
module.exports = router;
