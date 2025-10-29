const express = require("express");
const middleware = require("../middleware/middleware");
const userDb = require("./users-model");
const postDb = require("../posts/posts-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await userDb.get();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", middleware.validateUserId, (req, res, next) => {
  res.json(req.user);
});

router.post("/", middleware.validateUser, async (req, res, next) => {
  try {
    const user = await userDb.insert({ name: req.body.name });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  middleware.validateUserId,
  middleware.validateUser,
  async (req, res, next) => {
    try {
      await userDb.update(req.params.id, { name: req.body.name });
      const lastUser = await userDb.getById(req.params.id);
      res.status(200).json(lastUser);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", middleware.validateUserId, async (req, res, next) => {
  try {
    await userDb.remove(req.params.id);
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/posts", middleware.validateUserId, async (req, res, next) => {
  try {
    const posts = await userDb.getUserPosts(req.params.id);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/:id/posts",
  middleware.validateUserId,
  middleware.validatePost,
  async (req, res, next) => {
    try {
      const post = await postDb.insert({
        user_id: parseInt(req.params.id),
        text: req.body.text,
      });
      res.json(post);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
