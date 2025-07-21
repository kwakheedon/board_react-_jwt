import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
    console.log(" posts 상태:", posts);
    
  if (posts.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <ul>
        {posts.map(post => (
        <li key={post.postId}>
            <Link to={`/posts/${post.postId}`}>
            <h3>{post.title}</h3>
            </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;