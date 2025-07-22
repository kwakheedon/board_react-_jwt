import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateView from './CreateView';
import { usePostStore } from '../../stores/usePostStore'; 

const CreateForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const createPost = usePostStore((state) => state.createPost); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content }); 
      alert('게시글이 등록되었습니다');
      navigate('/');
    } catch (error) {
      alert('게시글 등록에 실패했습니다');
    }
  };

  return (
    <CreateView
      title={title}
      content={content}
      onChangeTitle={(e) => setTitle(e.target.value)}
      onChangeContent={(e) => setContent(e.target.value)}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateForm