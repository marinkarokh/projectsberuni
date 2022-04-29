import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { deleteCommentQuery } from '../../redux/actions/commentsAC';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Typography } from '@mui/material';

export default function CommentItem({_id}) {
    const dispatch = useDispatch()
    const postId = useParams()
    const comments = useSelector((store) => store.comment)
    const currentComment = comments.find((comment) => comment._id === _id)
  const deleteHandler = () => dispatch(deleteCommentQuery(postId._id, currentComment._id))
  
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="avatar" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={currentComment.text}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {currentComment.author?.name.slice(0, 1)} 
              </Typography>
              <IconButton 
              aria-label="delete" 
              // color="primary"
              variant="contained"
              style={{ fill: '#F44336' }}
              onClick={deleteHandler} 
              >
                <DeleteIcon />
              </IconButton>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}