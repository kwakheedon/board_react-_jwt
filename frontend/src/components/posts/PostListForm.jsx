import React, { useEffect } from 'react';
import { usePostStore } from '../../stores/usePostStore';
import PostList from './PostList';

const PostListForm = () => {
  const { posts, loading, error, loadPosts } = usePostStore();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
   console.log(" MainPage posts:", posts); 
  return <PostList posts={posts} />;
};


export default PostListForm