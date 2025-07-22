import React from 'react';
import { Link } from 'react-router-dom';
import MainListForm from '../components/posts/MainListForm';

const MainPage = () => {
return (
  <div>
  <h1>메인페이지</h1>

  <div>
  <h2>최근 게시글</h2>
  <MainListForm />
  <Link to="/posts">더보기</Link>
  </div>
  </div>
);
};

export default MainPage;