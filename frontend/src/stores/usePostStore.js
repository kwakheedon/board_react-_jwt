import { create } from 'zustand';
import {
  loadPosts as loadPostsAPI,
  loadPostById as loadPostByIdAPI,
  createPost as createPostAPI,
  updatePostById as updatePostByIdAPI,
  deletePostById as deletePostByIdAPI,
} from '../api/postsApi';

export const usePostStore = create((set) => ({
  posts: [],
  postDetail: null,
  loading: false,
  error: null,

  loadPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await loadPostsAPI();
      set({ posts: Array.isArray(response.data) ? response.data : [], loading: false });
    } catch (error) {
      set({ error: error.message || '게시글 로드 실패', loading: false });
    }
  },

  loadPostById: async (postId) => {
    set({ loading: true, error: null });
    try {
      const response = await loadPostByIdAPI(postId);
      set({ postDetail: response.data, loading: false });
    } catch (error) {
      set({ error: error.message || '게시글 상세 로드 실패', loading: false });
    }
  },
  
  createPost: async (postData) => {
    set({ loading: true, error: null });
    try {
      const newPost = await createPostAPI(postData);
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

  updatePostById: async (postId, updateData) => {
    set({ loading: true, error: null });
    try {
      const updatedPost = await updatePostByIdAPI(postId, updateData);
      set((state) => ({
        posts: state.posts.map(post =>
          post.postId === postId ? updatedPost : post
        ),
        postDetail: state.postDetail?.postId === postId ? updatedPost : state.postDetail,
        loading: false,
      }));
      return updatedPost;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || '게시글 수정 실패';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  deletePost: async (postId) => {
    set({ loading: true, error: null });
    try {
      await deletePostByIdAPI(postId);
      set((state) => ({
        posts: state.posts.filter((post) => post.postId !== postId),
        postDetail: null,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message || '게시글 삭제 실패', loading: false });
      throw error;
    }
  },
}));