const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Post {
    _id: ID
    title: String!
    createdAt: String
    postText: String!
    sneakerName: String!
    image: String
  }
  type Sneaker {
    name: String!
    image: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    getPost(_id: ID!): Post
    getAllPosts(order: Int, limit: Int): [Post]
  }
  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    createPost(title:String!, postText:String!, sneakerName:String!,image:String): Post
  }
`;

module.exports = typeDefs;