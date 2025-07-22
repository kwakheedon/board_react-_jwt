import { create } from 'zustand';
import { loadPosts as loadPostsAPI} from '../api/postsApi';
import { loadPostById as loadPostByIdAPI } from '../api/postsApi';
import { createPost as createPostAPI } from '../api/postsApi';
import { updatePostById} from '../api/postsApi';

export const usePostStore = create((set) => ({
  posts: [],        // 전체 게시글 목록 저장 배열
  postDetail: null, // 선택한 게시글 상세 저장 객체
  loading: false,   // API 호출 중 상태 표시용
  error: null,      // 에러 발생 시 메시지 저장


 // 전체 게시글 불러오는 함수
loadPosts: async () => {  
    set({ loading: true, error: null });
  try {
  const response = await loadPostsAPI(); 
set({ posts: response.data, loading: false }); 
} catch (error) {set({ error: error.message || '게시글 로드 실패', loading: false });
    }
  },


// 특정 게시글 상세 불러오는 함수
loadPostById: async (postId) => { 
    // 요청 시작: 로딩 상태 true, 에러 초기화
  set({ loading: true, error: null });
  try {
    // API 호출: postData를 createPostAPI로 전송, 인자값(postId) 
    const response = await loadPostByIdAPI(postId);
    // set 게시글 상세 조회 후 로딩끝났으니 false
    set({ postDetail: response.data, loading: false }); 
    //에러 발생 시 에러 메시지 설정하고 다시 던짐
  } catch (error) {
    set({ error: error.message || '게시글 상세 로드 실패', loading: false });
  }
},



//게시글 생성 함수
createPost: async (postData) => {
  try {
    set({ loading: true, error: null });
    const newPost = await createPostAPI(postData); 
    // set 으로 상태 갱신: 기존 posts 배열 앞에 새 게시글 추가
    set((state) => ({
      posts: [newPost, ...state.posts],
      loading: false,  
    }));
    return newPost;
  } catch (err) {
    set({ loading: false, error: err.message || '게시글 생성 실패' });
    throw err;  
  }
},


//게시글 수정함수
updatePostById: async (postId, updateData) => {
  console.log('updatePostById called with:', { postId, updateData }); 
  set({ loading: true, error: null });
  try {
    const updatedPost = await updatePostById(postId, updateData); // API 함수명 수정
    
    set((state) => ({
      posts: state.posts.map(post =>
        post.id === postId ? updatedPost : post
      ),
      postDetail: updatedPost,
      loading: false,
    }));
    
    return updatedPost; // 성공 시 결과 반환
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || '게시글 수정 실패';
    set({
      error: errorMessage,
      loading: false,
    });
    throw error; // 에러를 다시 던져서 컴포넌트에서 처리할 수 있게 함
  }
},


}));




