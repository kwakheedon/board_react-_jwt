import React, { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useCommentStore } from '../../stores/useCommentStore';
import CommentForm from './CommentForm';
import Button from '../common/Button';


const CommentItem = ({ comment, postId }) => {

  const { user: currentUser } = useAuthStore();
  const { deleteComment, createComment } = useCommentStore();
  
  // '답글' 폼을 열고 닫기 위한 상태
  const [isReplying, setIsReplying] = useState(false);

  // 사용자가 현재 로그인 상태인지 확인합니다.
  const isLoggedIn = !!currentUser;
  
  // 현재 로그인한 사용자가 이 댓글의 작성자인지 확인.
  // (반드시 로그인 상태여야 하고, 사용자 ID가 일치)
  const isAuthor = isLoggedIn && currentUser.userId === comment.writerId;
    
  // '삭제' 버튼 클릭 시 실행될 함수
  const handleDelete = () => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      deleteComment({ commentId: comment.commentId, postId });
    }
  };

  // '댓글 등록' 버튼 클릭 시 실행될 함수
  const handleReplySubmit = async (replyData) => {
    await createComment(replyData);
    setIsReplying(false); // 댓글 작성 후 폼을 닫습니다.
  };

  // '답글 달기/취소' 버튼 클릭 시 실행될 함수
  const toggleReplyForm = () => {
    setIsReplying(!isReplying);
  };


  return (

    <div  className="comment-item" >
      <div>
        <p className="comment-content" >{comment.content}</p>
      </div >
      <div className="comment-actions" >
        {/* 로그인한 모든 사용자에게 '답글 달기' 버튼이 보입니다. */}
        {isLoggedIn && (
          <Button onClick={toggleReplyForm}>
            {isReplying ? '댓글 취소' : '댓글 달기'}
          </Button>
        )}
        {/* 로그인한 작성자 본인에게만 '삭제' 버튼이 보입니다. */}
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

      {/* Part 4: 자식 댓글 (대댓글) 목록 (재귀 호출) */}
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