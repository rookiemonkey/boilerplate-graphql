import getCurrentUser from '../../helpers/getCurrentUser'

async function me(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)
    if (!currentUserID) { throw new Error("Please login first") }

    const currentUser = await prisma.query.user({
        where: { id: currentUserID }
    }, info)

    return currentUser
}

export default me