import React from 'react';

const Button = ({
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
