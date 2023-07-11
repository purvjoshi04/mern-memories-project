import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { commentPost } from '../../actions/posts'
import useStyles from "./Styles";

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const commentRef = useRef();
    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        commentRef.current.scrollIntoView({behavior: 'smooth'})
    };

    return (
        <div>
            {user?.result?.name && (
                <div className={classes.commentsOuterContainer}>
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6" style={{fontWeight: 'bold' }}>Write a Comment</Typography>
                        <TextField
                            fullWidth={true}
                            minRows={4}
                            variant="outlined"
                            label="Comment"
                            multiline={true}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}

                        />
                        <Button
                            style={{ marginTop: '10px' }}
                            fullWidth={true}
                            disabled={!comment}
                            variant="contained"
                            color="primary"
                            onClick={handleClick}>
                            Comment
                        </Button>
                    </div>
                </div>
            )}
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6" style={{fontWeight: 'bold' }}>Comments</Typography>
                {comments.map((c, i) => (
                    <Typography key={i} gutterBottom variant="subtitle1">
                     <strong>{c.split(': ')[0]}</strong>   
                     {c.split(':')[1]}
                    </Typography>
                ))}
                <div ref={commentRef}/>
            </div>

        </div>
    )
}

export default CommentSection;