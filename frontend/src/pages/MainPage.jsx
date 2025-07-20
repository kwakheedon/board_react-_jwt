import React from 'react';
import PostListForm from '../components/posts/PostListForm';
const MainPage = () => {
  return (
    <main>
      <h1>메인 페이지</h1>
      <PostListForm />  {/* 여기서 게시글 목록 렌더링 */}
    </main>
  );
};

export default MainPage;