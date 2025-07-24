import React from 'react';
import Button from '../common/Button'; // 공용 버튼 컴포넌트 임포트

// 상세 보기 UI를 담당하는 컴포넌트
const PostDetailView = ({ post, isAuthor, onEditClick, onDeleteClick }) => {
    return (
        // 전체 뷰를 감싸는 div
        <div className="post-detail-view">
            {/* 제목과 작성자 정보를 담는 헤더 */}
            <div className="post-detail-header">
                <h1 className="post-detail-title">{post.title}</h1>
                <div className="post-detail-meta">
                    <span>작성자: {post.writerNickname || '익명'}</span>
                    {/* 필요하다면 여기에 작성일 등을 추가할 수 있습니다. */}
                </div>
            </div>
            
            {/* 게시글 본문 내용 */}
            <div className="post-detail-content">
                {/* pre-wrap을 사용하면 엔터(줄바꿈)나 스페이스(공백)를 그대로 보여줍니다. */}
                <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
            </div>

            {/* isAuthor가 true일 때만 보이는 수정/삭제 버튼 영역 */}
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