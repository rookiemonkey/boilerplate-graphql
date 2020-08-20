import getCurrentUser from '../../helpers/getCurrentUser'

async function myPosts(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)
    if (!currentUserID) { throw new Error("Please login first") }

    let optionalArguments = {
        where: {},
        first: args.first,
        skip: args.skip,
        after: args.after,
        orderBy: args.orderBy
    }
    if (args.query) {
        optionalArguments.where.author = { id: currentUserID }
        optionalArguments.where.OR = [
            { title_contains: args.query },
            { body_contains: args.query }
        ]
    }
    else {
        optionalArguments.where.author = { id: currentUserID }
    }

    return await prisma.query.posts(optionalArguments, info)
}

export default myPosts