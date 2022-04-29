import { axiosInstance } from "../../config/axios";
import { ADD_NEW_POST, DELETE_POST, SET_ALL_POSTS, UPDATE_POST } from "../types/postsTypes";

export const setAllPosts = (allPosts) => ({
  type: SET_ALL_POSTS,
  payload: allPosts,
});

export const loadAllPosts = (searchValue) => async (dispatch) => {
  const response = await axiosInstance.get("posts/search/", {
    params: {
      query: searchValue,
    },
  });

  const postsFromApi = response.data;

  dispatch(setAllPosts(postsFromApi));
};

export const addNewPost = (allPosts) => ({
  type: ADD_NEW_POST,
  payload: allPosts,
});

export const queryNewPost = (post) => async (dispatch) => {

  const response = await axiosInstance.post("posts", post);

    if (response.status === 201) {
    const postFromApi = await response.data;
    dispatch(addNewPost(postFromApi));
    } else {
      alert(response.data.message)
    }
};

const deletePost = (_id) => ({
  type: DELETE_POST,
  payload: _id,
})

export const deletePostQuery = (_id) => async (dispatch) => {
  const response = await axiosInstance.delete(`posts/${_id}`, 
)
  if (response.status === 200) {
    dispatch(deletePost(_id))
    alert('Вы удалили свой пост')
  } 
}

const updatePost = (newPostData) => ({
  type: UPDATE_POST, 
  payload: newPostData,
})

export const updatePostQuery = (_id, formData, closeModal) => async (dispatch) => {
const response = await axiosInstance.patch(`posts/${_id}`,
formData
)

  if (response.status === 200) {
  const updatedPostFromServer = await response.data
  dispatch(updatePost(updatedPostFromServer))
  closeModal()
  } 
}