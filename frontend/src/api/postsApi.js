import apiClient from './apiClient';  

//게시글 조회
export const fetchPosts = async () => {
  const response = await apiClient.get('/posts');  // apiClient로 요청
  console.log("fetchPosts 응답 데이터:", response.data);
  return response.data;
};