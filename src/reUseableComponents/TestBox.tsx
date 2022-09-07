import { Radio } from '@mui/material';
import React from 'react'
interface props{
    testBox:any;
    key:number;
    handleTestType:(data:any)=>void;
    selectedTestType:any;
}
const TestBox:React.FC<props> = ({testBox,key,handleTestType, selectedTestType}) => {
  return (
    <div className="relative w-full h-full xl:w-23p lg:w-23p md:w-full sm:w-full" key={key} >
        <div className="absolute left-5 max-h-max" style={{ top: '50%', transform: 'translateY(-50%)' }} >
        <Radio name="radio" id={`${testBox.title}`} disabled={testBox.disabled} onChange={()=>handleTestType(testBox)} checked={testBox.id === selectedTestType}  className="h-5 w-5" style={{ top: '35%' }} sx={{
          color: 'black',
          '&.Mui-checked': {
            color: 'white',
          },
        }} />
        {/* <input type="radio"/> */}
        </div>
        <label htmlFor={`${testBox.title}`}>
        <div style={{minHeight:115}} className={`border cursor-pointer min-h-max rounded-xl gap-2 flex flex-row items-center justify-between lg:flex-col lg:items-start lg:justify-center ${testBox.id !== selectedTestType ?'shadow-btn text-black':'bg-dark text-white'} ${testBox.disabled ? 'bg-gray cursor-not-allowed':''}` }>
            <div className="ml-14">
                <p className="my-2 f-7">{testBox.title}</p>
                {!testBox.disabled && testBox.isDuretionVisible && ( <p className="my-2 f-6">({testBox.testDuration})</p>)}
                {testBox.disabled && ( <p className="my-2 f-6 text-orange text-sm">Not Available</p> )}
            </div>
            <div className="ml-14 mr-2">
                {!testBox.disabled && testBox.isCostLabelVisibile && (<p className="mr-3 mb-2 f-7">${testBox.prices}</p> )}
            </div>
        </div>
        </label>
    </div>
  )
}

export default TestBox;