import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  children,
  ...rest
}) => {
  return (
    <motion.button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`toss-button ${className}`}
      style={{ padding: '8px 16px', fontSize: 15 }} 
      whileHover={{ scale: 1.05}} // 마우스를 올렸을 때 5% 커짐
      whileTap={{ scale: 0.95 }}   // 클릭했을 때 5% 작아짐
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;
