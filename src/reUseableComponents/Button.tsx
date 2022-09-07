import React from 'react'
interface buttonProps {
    text:string;
    onClick?:()=>void;
    icon?:{position:'right'|'left', icon:React.ReactNode };
    className?:string;
    type?:'button'|'reset'|'submit';
    disabled?:boolean
}
const Button:React.FC<buttonProps> = ({text, onClick, className='btn fill', icon, type='button',disabled=false}) => {
  return (
    <button 
        className={`${className}${disabled?'-d':''} flex justify-center items-center gap-6`} 
        type={type} 
        onClick={onClick}
        disabled={disabled}
    >
        {icon?.position === 'left' ? icon.icon :''} {text} {icon?.position === 'right' ? icon.icon :''}
    </button>
  )
}

export default Button;