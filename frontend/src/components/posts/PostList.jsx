import React from 'react';

const PostList = ({ posts }) => {
    console.log(" posts 상태:", posts);
    
  if (posts.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;