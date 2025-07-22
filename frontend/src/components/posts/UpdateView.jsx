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
            name="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력하세요"
            required
            disabled={loading}
            maxLength={100} // 제목 길이 제한
          />
        </div>

        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={onChangeContent}
            placeholder="내용을 입력하세요"
            required
            rows={10}
            disabled={loading}
            maxLength={2000} // 내용 길이 제한
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            오류: {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="submit" disabled={loading}>
            {loading ? '수정 중...' : '수정 완료'}
          </Button>
          <Button 
            type="button" 
            onClick={() => window.history.back()}
            disabled={loading}
            style={{ backgroundColor: '#gray' }}
          >
            취소
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateView;