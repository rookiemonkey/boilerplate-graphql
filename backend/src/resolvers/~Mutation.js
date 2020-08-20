import mutate from './mutations/_mutations'
const {
    createUser, deleteUser, updateUser, loginUser,
    createPost, deletePost, updatePost,
    createComment, deleteComment, updateComment
} = mutate

const Mutation = {
    createUser, deleteUser, updateUser, loginUser,
    createPost, deletePost, updatePost,
    createComment, deleteComment, updateComment
}

export default Mutation