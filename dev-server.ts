import 'dotenv/config'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'

import { expressMiddleware } from '@as-integrations/express5'

import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'

import { resolvers } from './src/resolvers'

async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)

  const schemaPath = path.join(process.cwd(), 'src', 'graphql')
  const typeDefs = loadFilesSync(schemaPath)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await server.start()

  app.use('/graphql', cors(), express.json(), expressMiddleware(server))

  const port = process.env.PORT || 4000
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))

  console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
}

startApolloServer()
