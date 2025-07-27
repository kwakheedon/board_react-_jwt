import React, { useState } from 'react';
import Button from '../common/Button'; 
import TextField from '../common/TextField'; 


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
                        multiline 
                        required
                        style={{ minHeight: '250px' }} 
                    />
                </div>
                <div className="form-actions">
                    <Button type="button" onClick={onCancel} className="toss-button-secondary">취소</Button>
                    <Button type="submit">저장하기</Button>
                </div>
            </form>
        </div>
    );
};

export default PostEditForm;