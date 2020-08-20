import getCurrentUser from '../../helpers/getCurrentUser'

async function deleteComment(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)
    if (!currentUserID) { throw new Error("Please login first") }

    const isCommentExisiting = await prisma.exists.Comment({
        id: args.commentID, author: { id: currentUserID }
    })
    if (!isCommentExisiting) { throw new Error("Comment doesn't exists") }

    return await prisma.mutation.deleteComment({
        where: { id: args.commentID }
    }, info)
}

export default deleteComment