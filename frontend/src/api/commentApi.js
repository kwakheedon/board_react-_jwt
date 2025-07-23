import apiClient from './apiClient';

export const fetchByPostId = async (postId) => {
  const response = await apiClient.get(`/posts/${postId}/comments`);
  return response.data;
};

export const create = async (commentData) => {
  const response = await apiClient.post('/comments', commentData);
  return response.data;
};


export const deleteComment = async ({ commentId, postId }) => {
  const response = await apiClient.delete(`/posts/${postId}/comments/${commentId}`);
  return response.data;
};