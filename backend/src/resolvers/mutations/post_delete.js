import getCurrentUser from '../../helpers/getCurrentUser'

async function deletePost(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)
    if (!currentUserID) { throw new Error("Please login first") }

    const isPostExisting = await prisma.exists.Post({
        id: args.postID, author: { id: currentUserID }
    })
    if (!isPostExisting) { throw new Error("Post doesn't exists") }

    return await prisma.mutation.deletePost({
        where: { id: args.postID }
    }, info)
}

export default deletePost