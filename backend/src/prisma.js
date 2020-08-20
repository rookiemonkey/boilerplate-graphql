import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/_resolvers'

const prisma = new Prisma({
    // generated schema from ./prisma/datamodel.graphql
    // generated using get-graphql-schema
    typeDefs: './src/generated/prisma.graphql', // relative to root dir
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    fragmentReplacements
})

export default prisma
