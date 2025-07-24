import React from 'react';
import PostListForm from '../components/posts/PostListForm';

const PostListPage = () => {
  return (
    <div  className="page-container">
      <h1 className="page-title" >전체 게시글</h1>
      <PostListForm />
    </div>
  );
};

export default PostListPage;