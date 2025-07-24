import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const PostListView = ({ posts }) => {

    if (!posts || posts.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }


 return (
 
    <motion.ul
      className="post-list"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map(post => (
        <Link to={`/posts/${post.postId}`} key={post.postId}>
          <motion.li
            className="post-list-item" 
            variants={itemVariants}
          >
          <div className="post-detail-header">
              <h3 className="post-detail-title">{post.title}</h3>
              <p className="post-detail-meta">작성자: {post.writerNickname}</p>
            </div>
          </motion.li>
        </Link>
      ))}
    </motion.ul>
  );
};

export default PostListView;