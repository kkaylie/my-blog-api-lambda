import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

import { resolvers } from './resolvers';

const typeDefs = loadFilesSync(path.join(__dirname, './graphql'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);