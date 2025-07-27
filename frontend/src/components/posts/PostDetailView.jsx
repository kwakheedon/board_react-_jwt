import React from 'react';
import Button from '../common/Button'; 


const PostDetailView = ({ post, isAuthor, onEditClick, onDeleteClick }) => {
    return (
        
        <div className="post-detail-view">
            <div className="post-detail-header">
                <h1 className="post-detail-title">{post.title}</h1>
                <div className="post-detail-meta">
                    <span>작성자: {post.writerNickname || '익명'}</span>
                </div>
            </div>
    
            <div className="post-detail-content">
                <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
            </div>
            {isAuthor && (
                <div className="post-detail-actions">
                    <Button onClick={onEditClick} className="toss-button-secondary">게시글수정</Button>
                    <Button onClick={onDeleteClick}>삭제</Button>
                </div>
            )}
        </div>
    );
};
export default PostDetailView;