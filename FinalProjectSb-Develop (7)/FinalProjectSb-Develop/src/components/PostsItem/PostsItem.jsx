import * as React from 'react';
import {useState} from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import { deleteLikePostQuery, setLikePostQuery } from '../../redux/actions/likesPostsAC';
import { deletePostQuery } from '../../redux/actions/postsAC';
import { Badge, Button, Stack } from '@mui/material';
import LinkMUI from '@mui/material/Link'
import Delete from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostsItem({image, title, author, text, likes, _id, tags, comments, created_at}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const date = new Date(created_at).toLocaleString()

  const description = text.length > 200 ? text.slice(0, 200) + '...' : text

  const dispatch = useDispatch()
  const userId = useSelector((store) => store.person._id)

  const deleteHandler = () => {
    dispatch(deletePostQuery(_id))
  }

  const setLike = likes.includes(userId)

  const likePostHandler = () => {
    if (!likes.includes(userId)) {
      dispatch(setLikePostQuery(_id))
    } else {
      dispatch(deleteLikePostQuery(_id))
    }
  }

  return (
		<Grid item direction='column' xs={6}>
		
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {author?.name.slice(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={date}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
					{description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <IconButton 
          aria-label="add to favorites"
          onClick={likePostHandler}>
          {setLike ? <FavoriteIcon style={{ fill: '#F44336' }} /> : <FavoriteBorderIcon style={{ fill: '#F44336' }} />}
          <p>{likes.length}</p>
        </IconButton>
        
        <Stack direction="row" spacing={2}>
            <Button 
            aria-label="delete"
            onClick={deleteHandler} 
            variant="contained" 
            color="error">
              <Delete />
          </Button>
            
          <LinkMUI component={Link} to={`/posts/${_id}`}>
            <Button 
              type="submit"
              fullWidth
              variant="contained">
              Детали
            </Button>
          </LinkMUI>
        </Stack>

        <Badge badgeContent={comments?.length} color="primary">
          <MailIcon color="action" />
        </Badge>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

          <Typography paragraph>
						{text}
            <hr />
            tags: {tags}
          </Typography>
         
        </CardContent>
      </Collapse>
    </Card>
		</Grid>
  );
}

