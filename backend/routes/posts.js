const router = require("express").Router();
const Post = require("../model/posts");

router.post("/api/posts", async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({
          success: true,
          message: "Title and Content fields are required",
        });
    }

    const newPost = new Post({ title, content, tags });
    const savePost = await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: {
        create: savePost
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
});

module.exports = router;