import React from 'react';
import styled from 'styled-components';
import check from './../assets/check.svg';
import { colors } from './styles/colors';

enum Breakpoints {
    lsm = 220,
    sm = 576,
    md = 768,
    lg = 992,
    xl = 1200,
    xxl = 1500,
}
export const Label = styled.label`
  display: inline-flex;
  cursor: pointer;
  position: relative;
  margin-bottom: 10px;
  padding-left: 17px;
  @media (max-width: ${Breakpoints.sm}px) {
    margin-top: 10px;
  }
`;

export const Input = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  height: 19px;
  width: 19px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid ${colors.blueLight};
  border-radius: 0px;
  outline: none;
  transition-duration: 0.3s;
  cursor: pointer;
  margin: 0;
  background-color: ${colors.white};
  &:checked {
    background-color: ${colors.blueLight};

    + span:before {
      content: '';
      display: block;
      text-align: center;
      background: url(${check}) no-repeat center center;
      background-size: 15px 15px;
      position: absolute;
      height: 18px;
      width: 18px;
      left: 1px;
      top: 0;
    }
  }
  
  &:disabled {
    background-color: ${colors.grey20};
    border: 1px solid ${colors.grey20};
  }
`;

export const Span = styled.span`
  margin: -1px 0 0 20px;
`;

interface Props {
  name: string;
  children: React.ReactNode | string;
  onChange?: (checked: boolean) => void;
  type?: 'checkbox' | 'radio';
  value?: string;
  isRequired?: boolean;
  disabled?: boolean;
  defaultCheck?:boolean;
}

interface NonFormikCheckboxProps extends Props {
  checked: boolean;
}

export const NonFormikCheckbox: React.FC<NonFormikCheckboxProps> = ({
  children,
  onChange,
  checked,
  name,
  type,
  disabled,
  defaultCheck
}) => {
  return (
    <Label className="checkbox">
      <Input
        name={name}
        type={type}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.checked);
          }
        }}
        checked={checked}
        disabled={disabled}
      />
      <Span>{children}</Span>
    </Label>
  );
};

NonFormikCheckbox.defaultProps = {
  type: 'checkbox',
};

const Checkbox: React.FC<Props> = ({
  isRequired,
  children,
  name,
  onChange,
  type,
  disabled,
  defaultCheck,
}) => {
  return (
    
    <Label className="checkbox">
        <Input
        type={type}
        name={name}
        onChange={(e) => {
            if (onChange) {
                onChange(e.target.checked);
            }
        }}
        checked={defaultCheck}
        disabled={disabled}
        />
        <Span>{children}</Span>
    </Label>
  );
};

Checkbox.defaultProps = {
  type: 'checkbox',
};

export default Checkbox;
