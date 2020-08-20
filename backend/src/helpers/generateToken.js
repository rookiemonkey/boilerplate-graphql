import jwt from 'jsonwebtoken'

const generateToken = userID => {
    return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: '7 days' })
}

export default generateToken