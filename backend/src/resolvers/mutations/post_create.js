import getCurrentUser from '../../helpers/getCurrentUser'

async function createPost(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)
    if (!currentUserID) { throw new Error("Please login first") }

    const isUserExisting = await prisma.exists.User({ id: currentUserID })
    if (!isUserExisting) { throw new Error("Please login first") }

    const { title, body, published } = args.data
    return await prisma.mutation.createPost({
        data: { title, body, published, author: { connect: { id: currentUserID } } }
    }, info)
}

export default createPost