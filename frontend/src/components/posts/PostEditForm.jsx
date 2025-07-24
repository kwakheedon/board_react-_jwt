import React, { useState } from 'react';
import Button from '../common/Button'; // 공용 버튼 컴포넌트 임포트
import TextField from '../common/TextField'; // 공용 텍스트 필드 컴포넌트 임포트


// 게시글 수정을 담당하는 폼 컴포넌트
const PostEditForm = ({ post, onSave, onCancel }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, content });
    };

    return (
        <div className="create-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>제목</label>
                    <TextField
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>내용</label>
                    <TextField
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        multiline // 여러 줄 입력이 가능한 textarea로 변경
                        required
                        style={{ minHeight: '250px' }} // 높이를 글쓰기 폼과 유사하게 설정
                    />
                </div>
                {/* 버튼을 감싸는 div 추가 */}
                <div className="form-actions">
                    <Button type="button" onClick={onCancel} className="toss-button-secondary">취소</Button>
                    <Button type="submit">저장하기</Button>
                </div>
            </form>
        </div>
    );
};

export default PostEditForm;