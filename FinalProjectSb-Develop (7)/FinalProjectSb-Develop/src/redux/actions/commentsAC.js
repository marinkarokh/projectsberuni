import { axiosInstance } from "../../config/axios";
import { ADD_COMMENT, DELETE_COMMENT, SET_COMMENTS } from "../types/commentTypes";

export const setAllComments = (allComments) => ({
	type: SET_COMMENTS,
	payload: allComments
})

export const loadAllComments = (_id) => async (dispatch) => {
	const response = await axiosInstance.get(`posts/comments/${_id}`
	)

	const commentsFromApi = await response.data

	dispatch(setAllComments(commentsFromApi))
}

export const addNewComment = (allComments) => ({
	type: ADD_COMMENT,
	payload: allComments
})

export const queryNewComment = (comment, _id) => async (dispatch) => {

	const response = await axiosInstance.post(`posts/comments/${_id}`,
	comment
	)

	const commentFromApi = await response.data

	dispatch(addNewComment(commentFromApi))

}

export const deleteComment = (_id) => ({
    type: DELETE_COMMENT,
    payload: _id
})
export const deleteCommentQuery = (postId, _id) => async (dispatch) => {
    const response = await axiosInstance.delete(`posts/comments/${postId}/${_id}`
	)

    if (response.status === 200) {
      dispatch(deleteComment(_id))
    }
}