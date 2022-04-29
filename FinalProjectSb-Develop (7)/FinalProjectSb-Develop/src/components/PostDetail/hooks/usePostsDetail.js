import { useLayoutEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { updatePostQuery } from "../../../redux/actions/postsAC"

const usePostsDetail = ({closeModal, _id}) => {
  
    const postsId = useParams()
    const dispatch = useDispatch()
    const post = useSelector((state) => state.posts.find((el)=> el._id === postsId._id)) || {}
    useLayoutEffect(()=>{
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target).entries())
        dispatch(updatePostQuery(postsId, formData, closeModal))
      }
    return {
      post,
      submitHandler,
    }
}

export default usePostsDetail