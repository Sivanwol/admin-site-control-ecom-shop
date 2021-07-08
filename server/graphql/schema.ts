import { makeSchema, objectType, queryType } from 'nexus'
import { join } from 'path'
export const Query = queryType({
    definition(t) {
        t.list.field('albums', {
            type: 'Album',
            args: {
                first: 'Int',
            },
            resolve(_root: any, args: any, ctx: any) {
                return ctx.prisma.album.findMany({ take: args.first })
            },
        })
    },
})

export const Artist = objectType({
    name: 'Artist',
    definition(t: any) {
        t.int('id')
        t.string('name')
        t.string('url')
    },
})

export const Album = objectType({
    name: 'Album',
    definition(t: any) {
        t.int('id')
        t.string('name')
        t.string('year')
        t.field('artist', {
            type: 'Artist',
            async resolve(album: any, _args: any, ctx: any) {
                const artist = await ctx.prisma.artist.findFirst({
                    where: { id: album.artistId },
                })
                // The ! tells TypeScript to trust us, it won't be null
                return artist!
            },
        })
    },
})
export const schema = makeSchema({
    types: [Query, Artist, Album],
    shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
    outputs: {
        schema: join(process.cwd(), 'schema.graphql'),
        typegen: join(process.cwd(), 'nexus.ts'),
    },
    sourceTypes: {
        modules: [{ module: '.prisma/client', alias: 'prisma' }],
        debug: process.env.NODE_ENV === 'development',
    },
    contextType: {
        module: join(process.cwd(), 'src', 'context.ts'),
        export: 'Context',
    },
    nonNullDefaults: {
        input: true,
        output: true,
    },
})
