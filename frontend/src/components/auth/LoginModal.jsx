import React from 'react';
import TextField from '../common/TextField';
import Button from '../common/Button';

const LoginModal = ({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  loading,
  error
}) => {
  // isOpen이 false면 아무것도 그리지 않음
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>로그인</h2>
        
        {/* onSubmit 이벤트는 form 태그에 직접 연결 */}
        <form onSubmit={onSubmit}>
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
          {error && <p>{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
        
        <Button type="button" onClick={onClose} style={{ marginTop: '12px' }}>
          닫기
        </Button>
      </div>
    </div>
  );
};

export default LoginModal;