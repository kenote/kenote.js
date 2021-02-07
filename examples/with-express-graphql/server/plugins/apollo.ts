import { ApolloServer } from 'apollo-server-express'
import schema from '~/resolvers'

const server = new ApolloServer({
  schema,
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  },
  introspection: true
})

export default [ server.getMiddleware({ path: '/graphql' }) ]