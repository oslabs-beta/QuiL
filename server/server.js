const { ApolloServer } = require('@apollo/server');
const { typeDefs, resolvers } = require('./schema');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),

    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  app.get('/visualizer', (req, res) => {
    res.status(200).json('Response');
  });

  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🪶 GraphQL server ready at http://localhost:4000/  🪶`);
}

startApolloServer();
