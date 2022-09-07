import styled from 'styled-components';
import { colors } from './colors';
import { Breakpoints } from '../../utils';
interface ButtonProps {
    libraryType: 'primary' | 'default';
    accentColor?: string;
    size?: 'sm' | 'lg';
  }
export const Button = styled.button`
  border: 1px solid
    ${({ accentColor }: ButtonProps) => accentColor || colors.darkBlue};
  font-size: ${({ size }: ButtonProps) => (size === 'sm' ? '14px' : '20px')};
  line-height: 1.6;
  border-radius: 5px;
  padding: ${({ size }: ButtonProps) =>
    size === 'sm' ? '4px 15px' : '9px 20px'};
  font-weight: ${({ size }: ButtonProps) =>
    size === 'sm' ? 'normal' : 'bold'};
  width: 100%;
  color: ${({ libraryType, accentColor }: ButtonProps) => {
    return libraryType === 'primary'
      ? colors.white
      : accentColor || colors.darkBlue;
  }};
  background: ${({ libraryType, accentColor }: ButtonProps) =>
    libraryType === 'primary' ? accentColor || colors.darkBlue : colors.white};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:disabled {
    cursor: not-allowed;
    background: ${({ libraryType, accentColor }: ButtonProps) =>
    libraryType === 'primary'
      ? colors.lightOrange50 || colors.darkBlue50
      : colors.white};
    border: 1px solid transparent;
    color: ${({ libraryType, accentColor }: ButtonProps) => {
    return libraryType === 'primary'
      ? colors.white
      : accentColor || colors.darkBlue50;
  }};
  }
  @media (max-width: ${Breakpoints.sm}px) {
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    font-size:16px;
  }
`;
export const ErrorText = styled.div`
  font-size: 13px;
  color: ${colors.red};
  opacity: ${({ hasError }: { hasError: boolean }) => (hasError ? 1 : 0)};
  transition: opacity 0.15s ease-in-out;
`;