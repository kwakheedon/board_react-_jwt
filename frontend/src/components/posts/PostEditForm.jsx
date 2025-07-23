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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">제목</label>
                <TextField
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="content">내용</label>
                <TextField
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div>
                <Button type="button" onClick={onCancel} >취소</Button>
                <Button type="submit" >저장</Button>
            </div>
        </form>
    );
};

export default PostEditForm;