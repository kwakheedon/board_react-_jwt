import { create } from 'zustand';
import {
  fetchByPostId,
  create as createCommentApi,
  deleteComment,
} from '../api/commentApi';

// 대댓글 추가 헬퍼 함수
const addReplyToComment = (comments, parentId, newReply) => {
    return comments.map(comment => {
        //  comment.id 대신 comment.commentId 를 사용하도록 수정
        if (comment.commentId === parentId) {
            return { ...comment, children: [newReply, ...(comment.children || [])] };
        }
        if (comment.children && comment.children.length > 0) {
            return { ...comment, children: addReplyToComment(comment.children, parentId, newReply) };
        }
        return comment;
    });
};

const removeCommentFromTree = (comments, commentId) => {
    return comments.map(comment => {
        if (comment.commentId === commentId) return null;
        if (comment.children) return { ...comment, children: removeCommentFromTree(comment.children, commentId).filter(Boolean) };
        return comment;
    }).filter(Boolean);
};



export const useCommentStore = create((set) => ({
  comments: [],
  loading: false,
  error: null,
  loadComments: async (postId) => {
    set({ loading: true, error: null });
    try {
      const commentsData = await fetchByPostId(postId);
      set({ comments: commentsData.data || [], loading: false });
    } catch (error) {
      set({ error: error.message || '댓글 로드에 실패했습니다.', loading: false });
    }
  },
  createComment: async (commentData) => {
    try {
      const response = await createCommentApi(commentData);
      const newComment = response.data;
      

      //  newComment가 유효한 객체일 때만 상태를 업데이트하도록 검증
      if (newComment && typeof newComment === 'object' && newComment.commentId) {
        if (commentData.parentId) {
          set(state => ({ comments: addReplyToComment(state.comments, commentData.parentId, newComment) }));
        } else {
          set(state => ({ comments: [newComment, ...state.comments] }));
        }
        return newComment;
      } else {
        // 유효하지 않은 응답에 대한 처리
        console.error("댓글 생성 API는 성공했으나, 유효하지 않은 데이터가 반환되었습니다.", response);
        throw new Error('서버로부터 유효한 댓글 데이터를 받지 못했습니다.');
      }

    } catch (error) {
      console.error("댓글 생성 실패:", error);
      throw error;
    }
  },
  deleteComment: async ({ commentId, postId }) => {
    try {
      await deleteComment({ commentId, postId });
      set(state => ({ comments: removeCommentFromTree(state.comments, commentId) }));
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      throw error;
    }
  },
}));