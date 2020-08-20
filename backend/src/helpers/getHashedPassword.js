import bcrypt from 'bcrypt'

const getHashedPassword = async password => {
    if (password.length < 8) {
        throw new Error("Password must be 8 characters or longer")
    }

    return await bcrypt.hash(password, 10)
}

export default getHashedPassword