function posts(parent, args, { prisma }, info) {
    let operationArguments = {
        where: { published: true },
        first: args.first,
        skip: args.skip,
        after: args.after,
        orderBy: args.orderBy
    }

    if (args.query) {
        operationArguments.where.OR = [
            { title_contains: args.query },
            { body_contains: args.query }
        ]
    }

    return prisma.query.posts(operationArguments, info)
}

export default posts