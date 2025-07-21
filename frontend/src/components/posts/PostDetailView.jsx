import React from 'react';

const PostDetailView = ({ post, loading, error }) => {
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;
  if (!post) return <p>게시글이 없습니다.</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>작성자: {post.writerNickname || '작성자 없음'}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetailView;