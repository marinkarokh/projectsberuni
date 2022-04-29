import Modal from "../Modal/Modal"
import { usePostsDetailContext } from "./PostDetail"


const PostsDetailModal = () => {

    const {viewModal, closeModal, post, submitHandler} = usePostsDetailContext()
    
    return(
        <Modal
            state={viewModal}
            onClose={closeModal}
            onSubmit={submitHandler}
            {...post}
            >
        </Modal>
    )
}

export default PostsDetailModal