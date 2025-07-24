import React from 'react';
import Button from '../common/Button'; // 공용 버튼 컴포넌트 임포트

// 상세 보기 UI를 담당하는 컴포넌트
const PostDetailView = ({ post, isAuthor, onEditClick, onDeleteClick }) => {
    return (
        <div>
            <h1>{post.title}</h1>
            <div>
            </div>
            
            {/* isAuthor가 true일 때만 수정/삭제 버튼이 보입니다. */}
            {isAuthor && (
                <div>
                    <Button onClick={onEditClick}>게시글수정</Button>
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