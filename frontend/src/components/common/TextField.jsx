import React from 'react';

const TextField = ({
  multiline = false,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  ...rest
}) => {
  const commonProps = {
    name,
    value,
    onChange,
    placeholder,
    required,
    disabled,
    className: `text-field ${className}`, // 'text-field' 클래스 추가
    ...rest
  };

  if (multiline) {
    return <textarea {...commonProps} />;
  }

  return <input type={type} {...commonProps} />;
};

export default TextField;