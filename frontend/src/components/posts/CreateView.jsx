import React from 'react';
import TextField from '../common/TextField';
import Button from '../common/Button';

const CreateView = ({ title, content, onChangeTitle, onChangeContent, onSubmit }) => {
  return (
    <div className="create-form-container" >
      <h2>게시글 작성</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group" >
          <label>제목</label>
          <TextField
            name="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력하세요"
            required
          />
        </div>
        <div className="form-group" >
          <label>내용</label>
          <textarea
            name="content"
            value={content}
            onChange={onChangeContent}
            placeholder="내용을 입력하세요"
            required
          />
        </div>
        <Button type="submit">전송</Button>
      </form>
    </div>
  );
};

export default CreateView;