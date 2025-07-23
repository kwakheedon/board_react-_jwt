// src/components/posts/UpdateView.js (변경 없음)

import React from 'react';
import TextField from '../common/TextField';
import Button from '../common/Button';

const UpdateView = ({
  title,
  content,
  onChangeTitle,
  onChangeContent,
  onSubmit,
  loading,
  error,
}) => {
  return (
    <div>
      <h2>게시글 수정</h2>
      <form onSubmit={onSubmit}>
        
        <div>
          <label htmlFor="title">제목</label>
          <TextField
            id="title"
            value={title}
            onChange={onChangeTitle}
            
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={onChangeContent}
            
          />
        </div>
        <div>
          <Button type="submit" disabled={loading}>
            {loading ? '수정 중...' : '수정 완료'}
          </Button>
          <Button type="button" onClick={() => window.history.back()} disabled={loading}>
            취소
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateView;