import bcrypt from 'bcrypt'
import generateToken from '../../helpers/generateToken'
import getCurrentUser from '../../helpers/getCurrentUser'

async function loginUser(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)
    if (currentUserID) { throw new Error("You are already logged in and has an account") }

    const user = await prisma.query.user({
        where: { email: args.email }
    })

    if (!user) { throw new Error("Email and Password is incorrect") }

    const isMatch = await bcrypt.compare(args.password, user.password)

    if (!isMatch) { throw new Error("Email and Password is incorrect") }

    return {
        user,
        token: generateToken(user.id)
    }
}

export default loginUser