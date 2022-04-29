import * as React from 'react';
import { createContext, useMemo } from "react"
import { useContext } from "react"
import PostDetailCard from "./PostDetailCard";
import PostsDetailModal from "./PostsDetailModal";
import usePostsDetailModal from "./hooks/usePostsDetailModal";
import usePostsDetail from "./hooks/usePostsDetail";

const PostsDetailContext = createContext()

const PostDetail = () => {
  const { viewModal, openModal, closeModal } = usePostsDetailModal()
  const { post, submitHandler } = usePostsDetail(closeModal)

  const sharedValues = useMemo(() => ({
    viewModal, openModal, closeModal, post, submitHandler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [post, viewModal])

    return (
      <PostsDetailContext.Provider value={sharedValues}>
      <div className="d-flex justify-content-center p-3">
      <PostDetailCard />
      <PostsDetailModal />
      </div>
      </PostsDetailContext.Provider>
    )
}

export default PostDetail
export const usePostsDetailContext = () => useContext(PostsDetailContext)