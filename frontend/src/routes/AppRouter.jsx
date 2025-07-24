import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// 레이아웃 및 페이지
import MainLayout from "../components/layouts/MainLayout";
import MainPage from "../pages/MainPage";
import PostDetailPage from "../pages/PostDetailPage";
import CreatePostPage from "../pages/CreatePostPage";
import PostListPage from "../pages/PostListPage";

const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100vw" },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const AppRouter = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <AnimatedPage key={location.pathname}>
                <MainPage />
              </AnimatedPage>
            }
          />
          <Route
            path="posts"
            element={
              <AnimatedPage key={location.pathname}>
                <PostListPage />
              </AnimatedPage>
            }
          />
          <Route
            path="posts/create"
            element={
              <AnimatedPage key={location.pathname}>
                <CreatePostPage />
              </AnimatedPage>
            }
          />
          <Route
            path="posts/:postId"
            element={
              <AnimatedPage key={location.pathname}>
                <PostDetailPage />
              </AnimatedPage>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;