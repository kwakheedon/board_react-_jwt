import React from 'react';
import { Link } from 'react-router-dom';

const MainListView = ({ posts }) => {

    console.log(" posts 상태:", posts);

  // slice()를 사용해 배열의 첫 5개 요소만 가져옵니다.
  const recentPosts = posts.slice(0, 5);

  if (recentPosts.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }


  return (
    <ul>
      {recentPosts.map(post => (
        <li key={post.postId}>
          <Link to={`/posts/${post.postId}`}>
            <h3>{post.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MainListView


