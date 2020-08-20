import getCurrentUser from '../../helpers/getCurrentUser'

async function deleteUser(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)
    if (!currentUserID) { throw new Error("Please login first") }

    const isUserExisting = await prisma.exists.User({ id: currentUserID })
    if (!isUserExisting) { throw new Error("User doesn't exist") }

    return await prisma.mutation.deleteUser({
        where: { id: currentUserID }
    }, info)
}

export default deleteUser