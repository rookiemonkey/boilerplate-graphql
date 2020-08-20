import getCurrentUser from '../../helpers/getCurrentUser'

async function updatePost(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)
    if (!currentUserID) { throw new Error("Please login first") }

    const isPostExisting = await prisma.exists.Post({ id: args.postID })
    if (!isPostExisting) { throw new Error("Post doesn't exists") }

    const foundPost = await prisma.query.post({ where: { id: args.postID } }, `{ author { id }}`)
    if (foundPost.author.id !== currentUserID) { throw new Error("Invalid action") }

    // delete all comments if post is about to be unpublished @relation directive is not helpful
    // !negate will lead all mutation to delete since undefined is also negative
    if (args.data.published === false) {
        await prisma.mutation.deleteManyComments({
            where: { post: { id: args.postID } }
        })
    }

    return await prisma.mutation.updatePost({
        where: { id: args.postID },
        data: { ...args.data }
    }, info)
}

export default updatePost