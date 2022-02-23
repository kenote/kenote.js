import { ApolloServer } from 'apollo-server-express'
import { IModule } from '@kenote/core'
import { buildSchemaSync, NonEmptyArray } from 'type-graphql'
import * as resolvers from '~/resolvers'
import { Context } from '@kenote/express'

const server = new ApolloServer({
  schema: buildSchemaSync({
    resolvers: <NonEmptyArray<Function>> Object.entries(resolvers).map<unknown>(([, val]) => val),
    validate: false
  }),
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  },
  introspection: true,
  context: ({ req, res }) => new Context(req, res)
})

export default <IModule.ssrPlugin> {
  prefix: '/test',
  handler: [
    server.getMiddleware({ path: '/graphql' })
  ]
}
