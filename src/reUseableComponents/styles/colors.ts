import { hexToRGB } from '../../utils';

const green = '#4AB175';
const grey = '#B4B4BB';
const lightGrey = '#E4E3E3';
const darkBlue = '#2A5F87';
const fullBlack = '#000000'
const orange = "#F29A4E" 
const blueLight = "#1E93D1"
const navBlue = "#0f0b35"
// const backblue ='#2282cc'
const lightOrange = '#f29a4e'

const colors = {
  white: '#FFFFFF',
  dark600: '#ECECEC',
  navBlue,
  black: hexToRGB('#000000', 1),
  fullBlack,
  grey,
  lightGrey,
  grey80: hexToRGB(grey, 0.8),
  grey20: hexToRGB(grey, 0.2),
  blueLight,
  blue50: hexToRGB(blueLight, 0.5),
  blue8: hexToRGB(blueLight, 0.08),
  lightOrange50:hexToRGB(lightOrange, 1),
  lightOrange,
  darkBlue,
  darkBlue50: hexToRGB(darkBlue, 0.5),
  green,
  green50: hexToRGB(green, 0.5),
  red: '#FF5A60',
  orange,
};
export enum Breakpoints {
    lsm = 220,
    sm = 576,
    md = 768,
    lg = 992,
    xl = 1200,
    xxl = 1500,
}
export { colors };
