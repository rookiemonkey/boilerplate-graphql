import { GraphQLServer } from 'graphql-yoga'
import { resolvers, fragmentReplacements } from './resolvers/_resolvers'
import prisma from './prisma'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', // relative to root dir
    resolvers,
    fragmentReplacements,
    context(request) {
        return {
            prisma,
            request
        }
    }
})

export default server