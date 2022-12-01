import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();

// Importing the combined type and resolver definitions to import to Apollo Server
import { typeDefs, resolvers } from './graphql/modelsSetup';
// Type definitions
import { MyContext } from './types';

/*
This function defines the logic needed to initiate an Apollo GraphQL Server
Apollo here builds on top of an express server
*/
async function startApolloServer() {
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    res.status(200);
    next();
  });
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.ww
  // We pass our merged type and resolvers definitions here
  const server = new ApolloServer<MyContext>({
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
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { user: res.locals };
      },
    })
  );

  app.get('/', (req, res) => {
    res.send('hi');
  });
  // Modified server startup
  await new Promise<void>(resolve =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  // Display a log to notify that the GQL server is up and running
  console.log('DOES THIS LOG', process.env.QUIL_DB_CONNECTION_STRING);
  console.log(`🪶 GraphQL server ready at http://localhost:4000/  🪶`);
}

startApolloServer();

export { startApolloServer };
