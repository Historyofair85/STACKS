const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id }).populate('posts');
    },
    me: async (_, args, context) => {
      if (context.user) {
        const me = await User.findOne({ _id: context.user._id }).populate('posts');
        return me;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getPost: async (_, args, context) => {
      const post = await Post.findOne({ _id: args._id })
      return post;
    },
    getAllPosts: async (_, { order = -1, limit = 5 }, context) => {
      return await Post.find({}).sort({ createdAt: order }).limit(limit)
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createPost: async (_, {title, postText, sneakerName, image}, context) => {
      if (context.user) {
        const post = await Post.create({title: title, postText: postText, sneakerName: sneakerName, image: image});
        const user = await User.findOne({ _id: context.user._id });
        user.posts.push(post._id);
        user.save();
        return post
      }
    }
  }
}


module.exports = resolvers;