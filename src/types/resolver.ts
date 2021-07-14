import type { ServerResponse, ServerRequest } from '@typeDefs/server'
import type { User } from '@typeDefs/user'

export type ResolverContext = {
    res: ServerResponse
    req: ServerRequest
    user?: User
}
