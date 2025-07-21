
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { usePostStore } from '../../stores/usePostStore';
import PostDetailView from './PostDetailView';

const PostDetailForm = () => {
  const { id: postId } = useParams();
  const { postDetail, loading, error, loadPostById } = usePostStore();

 useEffect(() => {
  const idNum = Number(postId);
  if (postId && !isNaN(idNum)) {
    loadPostById(idNum);
  } else {
    console.error('Invalid postId:', postId);
  }
}, [postId, loadPostById]);

  return (
    <PostDetailView post={postDetail} loading={loading} error={error} />
  );
};

export default PostDetailForm;
