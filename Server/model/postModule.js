const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Plese Provide the title name"],
    },
    category: {
      type: String,
      require: [true, "Please provide category name"],
    },
    description: {
      type: String,
      require: [true, "Please provide the decription"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
