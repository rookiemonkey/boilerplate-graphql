import { extractFragmentReplacements } from 'prisma-binding';
import Mutation from './~Mutation'
import Query from './~Query'
import Subscription from './~Subscription'
import User from './User'

const resolvers = {
    Mutation,
    Subscription,
    Query,
    User
}

// fragments usually used in resolving a specific schema field
const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }
