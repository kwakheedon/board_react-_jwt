import React from 'react';
import TextField from '../common/TextField';
import Button from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';

const LoginModal = ({ isOpen, onClose, formData, onChange, onSubmit, loading, error }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-button" onClick={onClose}>×</button>
            <h2 className="modal-title">로그인</h2>

            <form onSubmit={onSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TextField
                type="email"
                name="email"
                placeholder="이메일"
                value={formData.email || ''}
                onChange={onChange}
                required
              />
              <TextField
                type="password"
                name="password"
                placeholder="비밀번호"
                value={formData.password || ''}
                onChange={onChange}
                required
              />
              {error && <p style={{ color: '#FF8787', textAlign: 'center' }}>{error}</p>}
              <Button type="submit" disabled={loading}>
                {loading ? '로그인 중...' : '로그인'}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;