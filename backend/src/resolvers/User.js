import getCurrentUser from '../helpers/getCurrentUser'

// type User individual field resolver
// used fragments because we are using info on all the returned queries
// there is a high possibility that user will not query the id
// this query just the id and resolve it to the parent regardless
// if the the user's query queried the id or not
const User = {

    email: {
        fragment: 'fragment userId on User { id }',
        async resolve(parent, args, { request, prisma }, info) {
            const currentUserID = await getCurrentUser(request)

            if (currentUserID && currentUserID == parent.id) {
                return parent.email
            }

            return null
        }
    },

    posts: {
        fragment: 'fragment userId on User { id }',
        async resolve(parent, args, { request }, info) {
            const currentUserID = await getCurrentUser(request)

            if (currentUserID && currentUserID == parent.id) {
                return parent.posts.filter(post => {
                    return post.published
                })
            }

            return null
        }
    }

}

export default User