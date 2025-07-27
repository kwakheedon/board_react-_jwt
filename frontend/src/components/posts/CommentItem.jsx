import React, { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useCommentStore } from '../../stores/useCommentStore';
import CommentForm from './CommentForm';
import Button from '../common/Button';


const CommentItem = ({ comment, postId }) => {

  const { user: currentUser } = useAuthStore();
  const { deleteComment, createComment } = useCommentStore();
  

  const [isReplying, setIsReplying] = useState(false);

 
  const isLoggedIn = !!currentUser;
  
  // 현재 로그인한 사용자가 이 댓글의 작성자인지 확인.
  // (반드시 로그인 상태여야 하고, 사용자 ID가 일치)
  const isAuthor = isLoggedIn && currentUser.userId === comment.writerId;
    

  const handleDelete = () => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      deleteComment({ commentId: comment.commentId, postId });
    }
  };

 
  const handleReplySubmit = async (replyData) => {
    await createComment(replyData);
    setIsReplying(false); 
  };

 
  const toggleReplyForm = () => {
    setIsReplying(!isReplying);
  };


  return (

    <div  className="comment-item" >
      <div>
        <p className="comment-content" >{comment.content}</p>
      </div >
      <div className="comment-actions" >

        {isLoggedIn && (
          <Button onClick={toggleReplyForm}>
            {isReplying ? '댓글 취소' : '댓글 달기'}
          </Button>
        )}

        {isAuthor && (
          <Button onClick={handleDelete}>댓글삭제</Button>
        )}
      </div >

      {isReplying && (
        <div className="comment-item-header" >
          <CommentForm
            postId={postId}
            parentId={comment.commentId}
            onSubmit={handleReplySubmit}
            onCancel={toggleReplyForm}
            submitLabel="댓글 등록"
          />
        </div>
      )}

      {/* 자식 댓글 (대댓글) 목록 (재귀 호출) */}
      {comment.children && comment.children.length > 0 && (
        <div className="comment-list" >
          {comment.children.map(childComment => (
            <CommentItem key={childComment.commentId} comment={childComment} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
};
export default CommentItem;