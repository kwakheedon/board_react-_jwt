import apiClient from './apiClient';  

//게시글 조회
export const loadPosts = async () => {
  const response = await apiClient.get('/posts');  // apiClient로 요청
  console.log("fetchPosts 응답 데이터:", response.data);
  return response.data;
};

//게시글 상세조회
export const loadPostById = async (postId) => {
  const response = await apiClient.get(`/posts/${postId}`);
  console.log("fetchPostById 응답 데이터:", response.data);
  return response.data;
};

//게시글생성
export const createPost = async (postData) => {
  const response = await apiClient.post('/posts', postData);
  console.log("createPost 응답 데이터:", response.data);
  return response.data;
};

//게시글수정
export const updatePostById = async (postId, updateData) => {
  const response = await apiClient.put(`/posts/${postId}`, updateData);
  return response.data; 
};