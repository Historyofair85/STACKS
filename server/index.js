const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  formatError(error) {
    console.log(error);
    return error;
  }
});

const serverStart = async () => {
  await server.start()
  
  server.applyMiddleware({ app });
}

serverStart()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});