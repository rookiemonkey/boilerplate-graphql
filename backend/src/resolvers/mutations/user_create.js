import generateToken from '../../helpers/generateToken'
import getCurrentUser from '../../helpers/getCurrentUser'
import getHashedPassword from '../../helpers/getHashedPassword'

async function createUser(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)
    if (currentUserID) { throw new Error("You are already logged in and has an account") }

    const isEmailTaken = await prisma.exists.User({ email: args.data.email })
    if (isEmailTaken) { throw new Error('Email is already taken') }

    const hashedPassword = await getHashedPassword(args.data.password)

    const user = await prisma.mutation.createUser({
        data: { ...args.data, password: hashedPassword }
    })

    return {
        user,
        token: generateToken(user.id)
    }
}

export default createUser