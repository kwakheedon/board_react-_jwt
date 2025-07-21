import { BrowserRouter, Routes, Route } from "react-router-dom";
// import '../assets/styles/global.css'; //  global.css가 있다면 경로 맞게 조정

// 레이아웃 컴포넌트
import MainLayout from '../components/layouts/MainLayout'; 

// 페이지 컴포넌트
import MainPage from '../pages/MainPage';
import PostDetailPage from '../pages/PostDetailPage';
import CreatePostPage from "../pages/CreatePostPage";
const AppRouter = () => {
  return (
  <BrowserRouter>
    <Routes>
      {/* 로그인 레이아웃 없이 별도 */}


      {/* 공통 레이아웃이 필요한 페이지들 */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
          <Route path="posts/create" element={<CreatePostPage />} />
          <Route path="posts/:id" element={<PostDetailPage />} />
        {/* 기타 페이지들... */}
      
        
      </Route>
    </Routes>
  </BrowserRouter>
  );
};
export default AppRouter;


