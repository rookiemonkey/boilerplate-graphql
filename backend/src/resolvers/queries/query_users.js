function users(parent, args, { prisma }, info) {
    let operationArguments = {
        first: args.first,
        skip: args.skip,
        after: args.after,
        orderBy: args.orderBy
    }

    if (args.query) {
        operationArguments.where = {
            OR: [
                { name_contains: args.query }
            ]
        }
    }

    return prisma.query.users(operationArguments, info)
}

export default users