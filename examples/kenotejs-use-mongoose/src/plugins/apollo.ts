import { ApolloServer } from 'apollo-server-koa'
import { IModule } from '@kenote/core'
import { buildSchemaSync, NonEmptyArray } from 'type-graphql'
import * as resolvers from '~/resolvers'
import { Context } from '@kenote/koa'

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
  // introspection: true,
  context: ({ ctx }) => new Context(ctx)
})

export default <IModule.ssrPlugin> {
  handler: [
    server.getMiddleware({ path: '/graphql' })
  ]
}
