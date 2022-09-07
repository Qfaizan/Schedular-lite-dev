import React from 'react';
import { TextField } from '@mui/material';
import { InputBoxSize } from '../utils';

const Input = ({
  lable,
  name,
  value,
  onChange,
  type,
  defaultValue = '',
  required,
  disabled = false,
  error = false,
  helperText = null,
  focused,
  placeHolder = '',
  onBlur,
  onFocus,
}: any) => {
  return (
    <TextField
      size={InputBoxSize}
      onFocus={onFocus}
      onBlur={onBlur}
      id={type + name}
      autoFocus={focused}
      name={name}
      defaultValue={defaultValue}
      type={type}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeHolder}
      required={required}
      label={lable}
      variant="outlined"
      className={`w-full shadow-md text-black font-600`}
      style={{ color: 'white' }}
      error={error}
      helperText={helperText}
      value={value}
    />
  );
};

export default Input;
