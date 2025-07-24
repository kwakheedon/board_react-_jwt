import React from 'react';
import { Link } from 'react-router-dom';
import MainListForm from '../components/posts/MainListForm';
import Button from '../components/common/Button';

const MainPage = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">최근 게시글</h1>

      <MainListForm />

    
      <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
        <Link to="/posts">
          <Button className="toss-button-secondary">
            더보기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;