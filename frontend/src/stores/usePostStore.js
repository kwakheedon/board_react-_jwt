import { create } from 'zustand';
import { loadPosts as loadPostsAPI} from '../api/postsApi';
import { loadPostById as loadPostByIdAPI } from '../api/postsApi';
import { createPost as createPostAPI } from '../api/postsApi';

export const usePostStore = create((set) => ({
  posts: [],  // 전체 게시글 목록 저장 배열
  postDetail: null, // 선택한 게시글 상세 저장 객체
  loading: false,   // API 호출 중 상태 표시용
  error: null,      // 에러 발생 시 메시지 저장

 
loadPosts: async () => {  // 전체 게시글 불러오는 함수
    set({ loading: true, error: null });
  try {
  const response = await loadPostsAPI(); 
set({ posts: response.data, loading: false }); 
} catch (error) {set({ error: error.message || '게시글 로드 실패', loading: false });
    }
  },


loadPostById: async (postId) => { // 특정 게시글 상세 불러오는 함수
  set({ loading: true, error: null });
  try {
    const response = await loadPostByIdAPI(postId);
    set({ postDetail: response.data, loading: false }); 
  } catch (error) {
    set({ error: error.message || '게시글 상세 로드 실패', loading: false });
  }
},


createPost: async (postData) => {
  try {
    set({ loading: true, error: null });
    const newPost = await createPostAPI(postData); // API 호출
    set((state) => ({
      posts: [newPost, ...state.posts],
      loading: false,
    }));
    return newPost;
  } catch (err) {
    set({ loading: false, error: err.message || '게시글 생성 실패' });
    throw err;  // 컴포넌트가 에러를 알 수 있도록 던짐
  }
},


}));




