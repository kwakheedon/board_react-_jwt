import { create } from 'zustand';
import { fetchPosts } from '../api/postsApi';

export const usePostStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,

  loadPosts: async () => {
    set({ loading: true, error: null });
  try {
  const response = await fetchPosts(); 
set({ posts: response.data, loading: false }); 
} catch (error) {set({ error: error.message || '게시글 로드 실패', loading: false });
    }
  },
}));


  