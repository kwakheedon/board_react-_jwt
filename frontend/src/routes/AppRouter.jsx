import { BrowserRouter, Routes, Route } from "react-router-dom";
// import '../assets/styles/global.css';

// 레이아웃 컴포넌트
import MainLayout from '../components/layouts/MainLayout'; 

// 페이지 컴포넌트
import MainPage from '../pages/MainPage';
import PostDetailPage from '../pages/PostDetailPage';
import CreatePostPage from "../pages/CreatePostPage";
import PostListPage from '../pages/PostListPage'; 


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 레이아웃이 필요한 페이지들 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="posts/create" element={<CreatePostPage />} />
          {/* PostDetailPage에서 useParams로 'postId'를 사용하므로, :id를 :postId로 변경하여 일관성을 맞춥니다. */}
          <Route path="posts/:postId" element={<PostDetailPage />} />
          <Route path="posts" element={<PostListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
