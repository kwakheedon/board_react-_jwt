import React, { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import Button from '../common/Button';
import TextField from '../common/TextField';

const CommentForm = ({ postId, parentId = null, initialContent = '', onSubmit, onCancel, submitLabel = "등록" }) => {
    const [content, setContent] = useState(initialContent);
    const { isLoggedIn } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {

            alert('댓글 내용을 입력하세요.');
            return;
        }
        await onSubmit({ postId, parentId, content });

        setContent('');
    };

    if (!isLoggedIn) {
        return <p>댓글을 작성하려면 로그인이 필요합니다.</p>
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="댓글을 입력하세요..."
                multiline  
            />
            <div>
                {onCancel && <Button type="button" onClick={onCancel}>취소</Button>}
                <Button type="submit">{submitLabel}</Button>
            </div>
        </form>
    );
};

export default CommentForm;