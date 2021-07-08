import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../server/graphql/schema'
import { context } from '../../server/graphql/context'

const server = new ApolloServer({ schema, context })
const handler = server.createHandler({ path: '/api/graphql' })

export default handler
