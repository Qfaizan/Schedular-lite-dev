import React from 'react'
interface prop{
    title:string;
    error?:boolean;
    center?:boolean;
}
export const Heading:React.FC<prop> = ({title, error = false , center=false}:any) => {
  return (
    <div>
         <h2 className={`text-2xl my-4 capitalize relative f-6 ${center ?'text-center' :''}`}>{title}{error &&<span className='text-red-600 text-lg absolute right-0 top-0'> Required*</span>}</h2>    
    </div>
  )
}
