import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import Button from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Logout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, openLogoutModal, setOpenLogoutModal } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    setOpenLogoutModal(false);
    navigate('/');
  };
  
  const handleClose = () => setOpenLogoutModal(false);

  return (
    <AnimatePresence>
      {openLogoutModal && isLoggedIn && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="modal-content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title" style={{ textAlign: 'center' }}>로그아웃</h2>
            <p className="modal-body" style={{ textAlign: 'center', marginBottom: '24px' }}>정말 로그아웃 하시겠습니까?</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button onClick={handleClose} className="toss-button-secondary">취소</Button>
              <Button onClick={handleLogout}>확인</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Logout;