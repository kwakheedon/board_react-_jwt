import React, { useEffect } from 'react';
import { usePostStore } from '../../stores/usePostStore';
import MainListView from './MainListView';

const MainListForm = () => {
  const { posts, loading, error, loadPosts } = usePostStore();

    useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
   console.log(" MainPage posts:", posts); 
   
  return  <MainListView posts={posts} />;
}

export default MainListForm
