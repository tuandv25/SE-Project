import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { prisma, pubsub } from './context.js';
import typeDefs from './schema.js';
import resolvers from './resolvers/index.js';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';


const cors = require('cors');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {
  graphqlUploadExpress,
} = require('graphql-upload');


async function startServer() {
  const app = express();
  app.use(graphqlUploadExpress());
  app.use(cors());
  app.use(express.static('public'))
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema,
    context: {
      prisma,
      pubsub
    }
  });
  await server.start();

  server.applyMiddleware({ app });
  SubscriptionServer.create({
    schema,
    execute,
    subscribe,
  }, {
    server: httpServer,
    path: '/graphql',
  });

  await new Promise(r => httpServer.listen({ port: process.env.PORT || 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();