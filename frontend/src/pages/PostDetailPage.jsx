import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { usePostStore } from '../stores/usePostStore';
import { useCommentStore } from '../stores/useCommentStore';
import PostEditForm from '../components/posts/PostEditForm'; 
import PostDetailView from '../components/posts/PostDetailView'; 
import CommentForm from '../components/posts/CommentForm';
import CommentList from '../components/posts/CommentList';

const PostDetailPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

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
    
    const [isEditingPost, setIsEditingPost] = useState(false);

    useEffect(() => {
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

    //  로그인한 유저(currentUser)와 게시글 작성자(postDetail.writerId)를 비교
    console.log('postDetail:', postDetail);
    const isPostAuthor = !!(currentUser && postDetail.writerId  && currentUser.userId === postDetail.writerId );
    
    const handlePostSave = async (updateData) => {
        await updatePostById(Number(postId), updateData);
        setIsEditingPost(false); 
        alert("수정이 완료 되었습니다.")
        await loadPostById(Number(postId));
    };


    const handlePostDelete = async () => {
        if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
            await deletePost(Number(postId));
            navigate('/'); 
        }
    };

    return (
        <div className="page-container" >
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
            <div className="comment-section">
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