import getCurrentUser from '../../helpers/getCurrentUser'

async function createComment(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)
    if (!currentUserID) { throw new Error("Please login first") }

    const isUserExisting = await prisma.exists.User({ id: currentUserID })
    const foundPost = await prisma.query.post({
        where: { id: args.data.post }
    }, `{ published }`)

    if (!isUserExisting) { throw new Error("User doesn't exist") }
    if (!foundPost || !foundPost.published) { throw new Error("Post doesn't exist") }

    const { text, post } = args.data
    return await prisma.mutation.createComment({
        data: {
            text,
            author: { connect: { id: currentUserID } },
            post: { connect: { id: post } }
        }
    }, info)
}

export default createComment