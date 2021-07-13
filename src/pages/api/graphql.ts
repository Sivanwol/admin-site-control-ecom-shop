import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../server/graphql/schema'
import { createContext } from './../../server/graphql/context'

const apolloServer = new ApolloServer({
    context: createContext,
    schema,
    tracing: process.env.NODE_ENV !== 'production',
})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({
    path: '/api/graphql',
})
