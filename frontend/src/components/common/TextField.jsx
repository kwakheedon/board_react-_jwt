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
  if (multiline) {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`text-field ${className}`}
        {...rest}
      />
    );
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`text-field ${className}`}
      {...rest}
    />
  );
};

export default TextField;
