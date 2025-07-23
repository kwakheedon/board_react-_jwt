import React, { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useCommentStore } from '../../stores/useCommentStore';
import CommentForm from './CommentForm';
import Button from '../common/Button';

const CommentItem = ({ comment, postId }) => {
    const { user: currentUser } = useAuthStore();
    
    const { deleteComment, createComment } = useCommentStore();

    const [isReplying, setIsReplying] = useState(false);

    // 로그인 상태와 작성자 여부를 명확하게 확인하는 로직으로 수정
    const isLoggedIn = !!currentUser; 
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

    return (
        <div style={{ marginLeft: comment.parentId ? '20px' : '0', borderLeft: comment.parentId ? '2px solid #eee' : 'none', paddingLeft: '10px', marginTop: '10px' }}>
            <div>
                <div>
                    <p><strong>{comment.writerNickname}</strong></p>
                    <p>{comment.content}</p>
                </div>

                {isAuthor && (
                    <div>
                        <Button onClick={handleDelete}>삭제</Button>
                    </div>
                )}
            </div>

            {/* 로그인한 사용자만 답글을 달 수 있도록 버튼을 제어합니다. */}
            {currentUser && (
                <Button onClick={() => setIsReplying(!isReplying)}>
                    {isReplying ? '답글 취소' : '답글 달기'}
                </Button>
                
            )}

            {isReplying && (
                <div>
                    <CommentForm
                        postId={postId}
                        parentId={comment.commentId}
                        onSubmit={handleReplySubmit}
                        onCancel={() => setIsReplying(false)}
                        submitLabel="답글 등록"
                    />
                </div>
            )}

            {/* 자식 댓글(대댓글)이 있으면 재귀적으로 렌더링합니다. */}
            {comment.children && comment.children.length > 0 && (
                <div>
                    {comment.children.map(childComment => (
                        <CommentItem key={childComment.commentId} comment={childComment} postId={postId} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;