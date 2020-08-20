import getCurrentUser from '../helpers/getCurrentUser'

const subscription = {
    comment: {
        subscribe(parent, args, { prisma }, info) {
            console.log(args.postID)
            return prisma.subscription.comment({
                where: {
                    node: {
                        post: {
                            id: args.postID
                        }
                    }
                }
            }, info)
        }
    },
    post: {
        subscribe(parent, args, { prisma }, info) {
            return prisma.subscription.post({
                where: {
                    node: {
                        published: true
                    }
                }
            }, info)
        }
    },
    myPost: {
        async subscribe(parent, args, { prisma, request }, info) {
            const currentUserID = await getCurrentUser(request)
            if (!currentUserID) { throw new Error("Please login first") }

            return prisma.subscription.post({
                where: {
                    node: {
                        author: { id: currentUserID }
                    }
                }
            }, info)
        }
    }
}

export default subscription 