import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-micro'
import { buildSchema } from 'type-graphql'
import { applyMiddleware } from 'graphql-middleware'
import cors from 'micro-cors'
import type { ServerRequest, ServerResponse } from '@typeDefs/server'
import type { ResolverContext } from '@typeDefs/resolver'
import { schema } from '@server/graphql/schema'
import { createContext } from '@server/graphql/context'
import resolvers from '@server/resolvers'
import sentryMiddleware from '@middlewares/server/global/sentry'

const apolloServer = new ApolloServer({
    context: createContext,
    schema,
    tracing: process.env.NODE_ENV !== 'production',
})

const withCors = cors({
    origin: '*',
})
export const config = {
    api: {
        bodyParser: false,
    },
}
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: ServerRequest, res: ServerResponse) => {
    // const connection = await getConnection();
    const schema = await buildSchema({
        resolvers,
        dateScalarMode: 'isoDate',
    })

    const server = new ApolloServer({
        schema: applyMiddleware(schema, sentryMiddleware),

        context: async ({ req, res }): Promise<ResolverContext> => {
            return {
                req,
                res,
            }
        },
    })

    const handler = withCors(server.createHandler({ path: '/api/graphql' }))

    return handler(req, res)
}
