import { axiosInstance } from '../../config/axios'
import { LIKE_POST } from "../types/postsTypes"

export const setLikePost = (_id) => ({
  type: LIKE_POST,
  payload: _id,
})

export const setLikePostQuery = (_id) => async (dispatch) => {
  const response = await axiosInstance.put(
    `posts/likes/${_id}`,
  )
  const likesFromApi = await response.data
  dispatch(setLikePost(likesFromApi))
}

export const deleteLikePost = (likesFromApi) => ({
  type: LIKE_POST,
  payload: likesFromApi,
})

export const deleteLikePostQuery = (_id) => async (dispatch) => {
    const response = await axiosInstance.delete(
    `posts/likes/${_id}`,
  )
  const likesFromApi = await response.data
  dispatch(deleteLikePost(likesFromApi))
}