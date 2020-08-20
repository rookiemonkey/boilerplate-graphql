import getCurrentUser from '../../helpers/getCurrentUser'

async function updateComment(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)
    if (!currentUserID) { throw new Error("Please login first") }

    const isCommentExisiting = await prisma.exists.Comment({
        id: args.commentID, author: { id: currentUserID }
    })
    if (!isCommentExisiting) { throw new Error("Comment doesn't exists") }

    return await prisma.mutation.updateComment({
        where: { id: args.commentID },
        data: { text: args.text }
    }, info)
}

export default updateComment