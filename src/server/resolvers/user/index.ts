import {
    ObjectType,
    Field,
    Ctx,
    Resolver,
    Query,
    UseMiddleware,
} from 'type-graphql'

import type { ResolverContext } from '@typeDefs/resolver'
import { isAuthenticated } from '@middlewares/server/resolvers/isAuthenticated'

@ObjectType()
class User {
    @Field()
    uid: string

    @Field()
    email: string

    @Field()
    username: string

    @Field((type) => [String])
    roles: string[]
}

@Resolver()
export default class UserResolver {
    @Query(() => User)
    @UseMiddleware(isAuthenticated)
    async me(@Ctx() ctx: ResolverContext): Promise<User> {
        const rolesObject = ctx.user!.customClaims || {}

        const roles = Object.keys(rolesObject).filter((key) => rolesObject[key])

        return {
            uid: ctx.user!.uid,
            email: ctx.user!.email || '',
            username: ctx.user!.displayName || '',
            roles,
        }
    }
}
