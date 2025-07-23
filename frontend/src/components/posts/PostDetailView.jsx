import React from 'react';
import Button from '../common/Button'; // 공용 버튼 컴포넌트 임포트

// 상세 보기 UI를 담당하는 컴포넌트
const PostDetailView = ({ post, isAuthor, onEditClick, onDeleteClick }) => {
  console.log('isAuthor in PostDetailView:', isAuthor);
    return (
        <div>
            <h1>{post.title}</h1>
            <div>
                <span>작성자: {post.writerNickname}</span>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            
            {/* isAuthor가 true일 때만 수정/삭제 버튼이 보입니다. */}
            {isAuthor && (
                <div>
                    <Button onClick={onEditClick}>수정</Button>
                    <Button onClick={onDeleteClick}>삭제</Button>
                </div>
            )}

            <div>
                {post.content}
            </div>
        </div>
    );
};

export default PostDetailView;