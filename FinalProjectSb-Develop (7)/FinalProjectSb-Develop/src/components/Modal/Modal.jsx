import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './modal.module.css'
import { modalWrVariants, modalInnerVariants } from './modalAnimation'
import { updatePostQuery } from '../../redux/actions/postsAC'
import { Button, IconButton, Paper, Stack, TextField } from '@mui/material'
import Close from "@mui/icons-material/Close";
import { useParams } from 'react-router-dom'
import { usePostsDetailContext } from '../PostDetail/PostDetail'
import { useDispatch } from 'react-redux'

function Modal({ children, state, ...rest }) {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {state && <ModalInner {...rest}>{children}</ModalInner>}
    </AnimatePresence>,
    document.getElementById('modal-root'),
  )
}

const ModalInner = ({ children, onClose }) => {
  const escHandler = (e) => {
    if (e.code === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    window.document.addEventListener('keydown', escHandler)

    return () => {
      window.document.removeEventListener('keydown', escHandler)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const closeClickHandler = () => {
    onClose()
  }

  const innerClickHandler = (e) => {
    e.stopPropagation()
  }
  
  const postId = useParams()

  // eslint-disable-next-line no-unused-vars
  const {post, openModal} = usePostsDetailContext()

  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [image, setImage] = useState(post.image);
  const [tags, setTags] = useState(post.tags);

  const dispatch = useDispatch()
  const submitHandler = () => {
    const preparedPostQuery = {
      title,
      text,
      image,
      tags,
    };

    const body = preparedPostQuery;

    dispatch(updatePostQuery(postId._id, body, onClose()));
  };

  const isTitleError = false;

  return (
    <motion.div
      variants={modalWrVariants}
      initial="start"
      animate="show"
      exit="end"
      onClick={closeClickHandler}
      className={styles.wrapper}
    >
      <motion.div
        variants={modalInnerVariants}
        onClick={innerClickHandler}
        className={styles.inner}
      >
      <IconButton
        onClick={closeClickHandler}
        color="inherit"
        >
        <Close />
      </IconButton>

      <Stack
      component="div"
      direction="column"
      alignItems="center"
    >
    
      <Paper elevation={3} sx={{width: 400}}>
        <Stack
          component="form"
          alignItems="center"
          spacing={2}
          noValidate
          sx={{ py: 5, px: 2 }}
          autoComplete="off"
        >
        <div>
            <TextField
              error={isTitleError}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              helperText={isTitleError && "Title must have min 3 symbols"}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="filled-basic"
              label="Text"
              variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Image"
              variant="outlined"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Tags"
              variant="outlined"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <Button 
            onClick={submitHandler}
            variant="contained"
            sx={{ mt: 1, mb: 1 }}>
            Обновить пост
          </Button>
          </Stack>
          </Paper>
          </Stack>

        {children}
      </motion.div>
    </motion.div>
  )
}

export default Modal
