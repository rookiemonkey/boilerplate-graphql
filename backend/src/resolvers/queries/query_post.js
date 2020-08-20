import getCurrentUser from '../../helpers/getCurrentUser'

async function post(parent, args, { prisma, request }, info) {
    const currentUserID = await getCurrentUser(request)

    let queryKey;
    if (!currentUserID) { queryKey = 'published' }
    else { queryKey = 'OR' }


    let options = {
        id: args.postID,
        [queryKey]: undefined
    }
    if (queryKey === 'published') {
        // show all but only published
        options[queryKey] = true
    }
    else {
        // show all but for unpublished, show only intended for the currentUser
        options[queryKey] = [
            { published: true },
            { author: { id: currentUserID } }
        ]
    }

    // used query.posts since query.post is limited by only ID w/o any filter
    const foundPost = await prisma.query.posts({ where: options }, info)

    if (!foundPost.length) { throw new Error("Post doesn't exist") }

    return foundPost[0]
}

export default post