import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments, postId }) => {
    return (
        <div className="comment-list" >
            <h3>{comments?.length || 0}개의 댓글</h3>
            {comments && comments.map(comment => (
                <CommentItem key={comment.commentId} comment={comment} postId={postId} />
            ))}
        </div>
    );
};

export default CommentList;
