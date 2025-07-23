import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { usePostStore } from '../../stores/usePostStore';
import Button from '../common/Button'; 

const PostListView = ({ posts }) => {

    if (!posts || posts.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }


  return (
    <ul>
      {posts.map(post => (
        <li key={post.postId}>
          <Link to={`/posts/${post.postId}`}>
            <h3>{post.title}</h3>
            <p> 작성자: {post.writerNickname}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostListView;