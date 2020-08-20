import getHashedPassword from '../../helpers/getHashedPassword'
import getCurrentUser from '../../helpers/getCurrentUser'

async function updateUser(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)
    if (!currentUserID) { throw new Error("Please login first") }

    if (args.data.email === '') { throw new Error("Please provide a valid email") }
    if (args.data.name === '') { throw new Error("Please provide a valid name") }

    if (args.data.password) {
        args.data.password = await getHashedPassword(args.data.password)
    }

    const isEmailTaken = await prisma.exists.User({ email: args.data.email })
    if (isEmailTaken) { throw new Error('Email is already taken') }

    return await prisma.mutation.updateUser({
        data: { ...args.data },
        where: { id: currentUserID }
    }, info)
}

export default updateUser