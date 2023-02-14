const Post = require("../model/postModule");

// get all post
const getUserPost = async (req, res) => {
  const post = await Post.find();

  if (!post) {
    return res.status(404).json("data not found");
  }

  const { title, category, description, image } = post;
  res.status(200).json(post);
};

// create a post
const createPost = async (req, res) => {
  const { title, category, description } = req.body;
  let filedata;
  try {
    if (req.file) {
      filedata = req.file.path;
    }
    if (!title || !category || !description) {
      return res.status(400).json("please fill all the detailse");
    }
    const post = await Post.create({
      title,
      category,
      description,
      image: filedata,
    });

    if (!post) {
      res.status(400).json("please fill all fields");
    }

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

//update post
const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, category, description } = req.body;
  let filedata;

  if (req.file) {
    filedata = req.file.path;
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json("Post not found");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      {
        title: title || post.title,
        category: category || post.category,
        description: description || post.description,
        image: filedata || post.image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost) {
      res.status(500).json("invalide requiest");
    }

    res.status(200).json(updatedPost);
  } catch (error) {}
};

// delete post

const deletePost = async (req, res) => {
  const id = req.params.id;

  const post = await Post.findById(id);
  if (!post) {
    res.status(404).json("Post not found");
  }

  await post.delete();
  res.status(200).json("Post deleted");
};

module.exports = {
  getUserPost,
  createPost,
  updatePost,
  deletePost,
};
