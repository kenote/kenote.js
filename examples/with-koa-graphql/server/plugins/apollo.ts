import { ApolloServer } from 'apollo-server-koa'
import schema from '~/resolvers'

const server = new ApolloServer({
  schema,
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  },
  introspection: true,
  context: ({ ctx }) => ctx
})

export default [ server.getMiddleware({ path: '/graphql' }) ]