function comments(parent, args, { prisma }, info) {
    const operationArguments = {
        first: args.first,
        skip: args.skip,
        after: args.after,
        orderBy: args.orderBy
    }


    return prisma.query.comments(operationArguments, info)
}

export default comments