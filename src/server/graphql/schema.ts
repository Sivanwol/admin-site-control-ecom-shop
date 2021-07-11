import { objectType, queryType, mutationType, makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import path from 'path'

const User = objectType({
    name: 'User',
    definition(t) {
        t.int('id', { description: 'Id of the user' })
        t.field('name', { type: 'string', description: 'name of the user' })
    },
})

const Query = queryType({
    definition(t) {
        t.list.field('allUsers', {
            type: 'User',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.user.findMany({})
            },
        })
    },
})

const Mutation = mutationType({
    definition(t) {
        t.field('bigRedButton', {
            type: 'String',
            async resolve(_parent, _args, ctx) {
                const { count } = await ctx.prisma.user.deleteMany({})
                return `${count} user(s) destroyed. Thanos will be proud.`
            },
        })
    },
})
console.log(path.join(__dirname, '../../generated', 'nexus-typegen.ts'))
console.log(path.join(__dirname, '../../generated', 'schema.graphql'))
console.log(path.join(__dirname, 'context.ts'))
export const schema = makeSchema({
    types: [User, Query, Mutation],
    plugins: [nexusPrisma({ experimentalCRUD: true })],
    outputs: {
        typegen: path.join(__dirname, '../../generated', 'nexus-typegen.ts'),
        schema: path.join(__dirname, '../../generated', 'schema.graphql'),
    },
})
