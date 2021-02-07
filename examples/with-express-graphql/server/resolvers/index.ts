import { buildSchemaSync } from 'type-graphql'
import UserResolver from './user'

export default buildSchemaSync({
  resolvers: [ UserResolver ],
  validate: false
})