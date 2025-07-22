// components/posts/PostListView.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore'; 

const PostListView = ({ posts }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore(); 

  // 수정 페이지로 이동하는 함수
  const handleEdit = (postId) => {
    navigate(`/posts/edit/${postId}`);
  };

  // 삭제를 처리하는 함수 (실제 로직은 store에 구현)
  const handleDelete = (postId) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      // usePostStore의 deletePost(postId) 같은 함수를 호출
      console.log(`${postId}번 게시글 삭제 로직 실행`);
    }
  };

  if (!posts || posts.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <ul>
      {posts.map(post => (
        <li key={post.postId}>
          <Link to={`/posts/${post.postId}`}>
            <h3>{post.title}</h3>
            <p>작성자: {post.writerNickname}</p>
          </Link>

          {/* 권한 처리: 로그인했고, 작성자 ID와 내 ID가 같을 때만 버튼 노출 */}
          {isLoggedIn && user?.userId === post.writerId && (
            <div>
              <button onClick={() => handleEdit(post.postId)}>수정</button>
              <button onClick={() => handleDelete(post.postId)}>삭제</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PostListView;