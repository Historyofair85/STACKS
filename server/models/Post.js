const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    postText: {
      type: String
    },
    sneakerName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    }
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);


const Post = model('Post', postSchema);

module.exports = Post;