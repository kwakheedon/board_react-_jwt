import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePostStore } from '../stores/usePostStore';
import { useAuthStore } from '../stores/useAuthStore';
import UpdateView from '../components/posts/UpdateView';

const UpdatePostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { postDetail, loadPostById, updatePostById, loading, error } = usePostStore();
  const { user } = useAuthStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/'); 
      return;
    }
    // 페이지 진입 시 게시글 데이터를 불러옵니다.
    loadPostById(Number(postId));
  }, [postId, loadPostById, user, navigate]);

  useEffect(() => {
    // 게시글 상세 데이터(postDetail)가 로드되면 실행됩니다.
    if (postDetail && Number(postDetail.postId) === Number(postId)) {
      if (Number(postDetail.writerId) !== Number(user?.userId)) {
        alert('수정 권한이 없습니다.');
        navigate(`/posts/${postId}`); 
        return;
      }
      
      // 권한이 확인되면, 수정 폼에 기존 내용을 채워줌
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
      await updatePostById(Number(postId), { title: title.trim(), content: content.trim() });
      alert('수정이 완료되었습니다!');
      navigate(`/posts/${postId}`);
    } catch (err) {
      alert(err.message || '수정에 실패했습니다.');
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }
  
  if (!isAuthorized) {
    return <div>권한을 확인 중이거나 수정 권한이 없습니다...</div>;
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

export default UpdatePostPage;