import jwt from 'jsonwebtoken'

const getCurrentUser = async request => {
    try {
        let authHeader;
        if (request.request) { authHeader = request.request.headers.authorization } // for http req
        else { authHeader = request.connection.context.Authorization } // for subs (web socket)

        if (!authHeader) { throw new Error() }

        const token = authHeader.replace('Bearer ', '')
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded.userID) { throw new Error() }

        return decoded.userID
    }

    catch (error) {
        return null
    }
}

export default getCurrentUser