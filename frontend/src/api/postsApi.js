import apiClient from './apiClient';

export const loadPosts = async () => {
  const response = await apiClient.get('/posts');
  return response.data;
};

export const loadPostById = async (postId) => {
  const response = await apiClient.get(`/posts/${postId}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await apiClient.post('/posts', postData);
  return response.data;
};

export const updatePostById = async (postId, updateData) => {
  const response = await apiClient.put(`/posts/${postId}`, updateData);
  return response.data;
};

export const deletePostById = async (postId) => {
  const response = await apiClient.delete(`/posts/${postId}`);
  return response.data;
};
