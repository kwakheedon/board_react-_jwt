import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { usePostStore } from '../stores/usePostStore';
import { useCommentStore } from '../stores/useCommentStore';
import PostEditForm from '../components/posts/PostEditForm'; // 수정 폼 컴포넌트
import PostDetailView from '../components/posts/PostDetailView'; // 상세 보기 컴포넌트
import CommentForm from '../components/posts/CommentForm';
import CommentList from '../components/posts/CommentList';

const PostDetailPage = () => {
    // 1. URL에서 postId를 가져옵니다. (react-router-dom)
    const { postId } = useParams();
    const navigate = useNavigate();

    // 2. 필요한 스토어에서 상태와 액션을 가져옵니다.
    const { user: currentUser, initializeAuth } = useAuthStore();
    const { 
        postDetail, 
        loading: postLoading, 
        error: postError, 
        loadPostById, 
        updatePostById, 
        deletePost 
    } = usePostStore();
    const { 
        comments, 
        loading: commentsLoading, 
        loadComments, 
        createComment 
    } = useCommentStore();
    
    // '보기 모드'와 '수정 모드'를 전환하기 위한 상태
    const [isEditingPost, setIsEditingPost] = useState(false);

    useEffect(() => {
        // 페이지가 로드될 때 인증 상태와 게시글, 댓글 데이터를 불러옵니다.
        initializeAuth();
        if (postId) {
            const numericPostId = Number(postId);
            loadPostById(numericPostId);
            loadComments(numericPostId);
        
        }
    }, [postId, initializeAuth, loadPostById, loadComments]);

    // 로딩 및 에러 상태 처리
    if (postLoading) return <div>게시글을 불러오는 중...</div>;
    if (postError) return <div>오류 발생: {postError}</div>;
    if (!postDetail) return <div>게시글이 없거나 삭제되었습니다.</div>;

    // 3. 핵심 로직: 로그인한 유저(currentUser)와 게시글 작성자(postDetail.writerId)를 비교합니다.
    console.log('postDetail:', postDetail);
    const isPostAuthor = !!(currentUser && postDetail.writerId  && currentUser.userId === postDetail.writerId );
   
    
    // 수정 내용 저장 핸들러
    const handlePostSave = async (updateData) => {
        await updatePostById(Number(postId), updateData);
        setIsEditingPost(false); // 저장 후 '보기 모드'로 전환
    };

    // 게시글 삭제 핸들러
    const handlePostDelete = async () => {
        if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
            await deletePost(Number(postId));
            navigate('/'); // 삭제 후 홈으로 이동
        }
    };

    return (
        <div>
            {/* 4. isEditingPost 상태에 따라 '수정 모드' 또는 '보기 모드'를 렌더링합니다. */}
            {isEditingPost ? (
                <PostEditForm 
                    post={postDetail} 
                    onSave={handlePostSave} 
                    onCancel={() => setIsEditingPost(false)} 
                />
            ) : (
                <PostDetailView 
                    post={postDetail} 
                    isAuthor={isPostAuthor} // isPostAuthor 값을 props로 전달
                    onEditClick={() => setIsEditingPost(true)} // '수정 모드'로 전환
                    onDeleteClick={handlePostDelete} 
                />
            )}
            
            {/* --- 댓글 섹션 --- */}
            <div >
                <CommentForm postId={Number(postId)} onSubmit={createComment} />
                {commentsLoading ? (
                    <p>댓글 로딩 중...</p>
                ) : (
                    <CommentList comments={comments} postId={Number(postId)} />
                )}
            </div>
        </div>
    );
};

export default PostDetailPage;