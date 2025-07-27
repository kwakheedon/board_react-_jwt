import React, { useEffect } from 'react';
import { usePostStore } from '../../stores/usePostStore';
import PostListView from './PostListView'; 

const PostListForm = () => {
  const { posts, loading, error, loadPosts } = usePostStore();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  
  return <PostListView posts={posts} />;
}

export default PostListForm;