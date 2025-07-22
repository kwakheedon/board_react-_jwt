import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePostStore } from '../../stores/usePostStore';
import { useAuthStore } from '../../stores/useAuthStore'; // 인증 스토어 추가
import UpdateView from '../../components/posts/UpdateView';

const UpdateForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const {
    postDetail,
    loadPostById,
    updatePostById,
    loading,
    error,
  } = usePostStore();

  const { user } = useAuthStore(); // 현재 로그인한 사용자 정보

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 로그인 확인
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    loadPostById(postId);
  }, [postId, loadPostById, user, navigate]);

  useEffect(() => {
    if (postDetail) {
      // 작성자 권한 확인
      if (postDetail.authorId !== user?.id) {
        alert('수정 권한이 없습니다.');
        navigate(`/posts/${postId}`);
        return;
      }

      setIsAuthorized(true);
      setTitle(postDetail.title);
      setContent(postDetail.content);
    }
  }, [postDetail, user, postId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await updatePostById(postId, { title: title.trim(), content: content.trim() });
      alert('수정이 완료되었습니다!');
      navigate(`/posts/${postId}`);
    } catch (error) {
      const errorMessage = error.response?.status === 403 
        ? '수정 권한이 없습니다.' 
        : '수정에 실패했습니다.';
      alert(errorMessage);
    }
  };

  // 권한이 없거나 로딩 중일 때
  if (!isAuthorized && !loading) {
    return <div>권한을 확인하는 중...</div>;
  }

  return (
    <UpdateView
      title={title}
      content={content}
      onChangeTitle={(e) => setTitle(e.target.value)}
      onChangeContent={(e) => setContent(e.target.value)}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default UpdateForm;