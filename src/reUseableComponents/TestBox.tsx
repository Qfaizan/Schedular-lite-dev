import React from 'react'
interface props{
    testBox:any;
    key:number;
    handleTestType:(data:any)=>void;
    selectedTestType:any;
}
const TestBox:React.FC<props> = ({testBox,key,handleTestType, selectedTestType}) => {
const classForTestType = 'w-32 h-32 relative md:w-36 sm:w-36 flex justify-center flex-col items-center p-1 rounded-lg shadow-lg cursor-pointer';
  return (
    <button
        type="button"
        key={key}
        onClick={() => handleTestType(testBox)}
        disabled={testBox.disabled}
        className={`${classForTestType} ${
        testBox.id !== selectedTestType
            ? `bg-white text-dark textType hover:shadow-2xl`
            : `bg-dark text-white`
        } ${
        testBox.disabled
            ? `cursor-not-allowed fill-btn-d shadow-none hover:shadow-none`
            : ``
        }`}
    >
        <p className="text-xl font-bold mb-2">{testBox.title}</p>
        {!testBox.disabled && testBox.isCostLabelVisibile && (
        <p className="text-lg font-bold mb-2">${testBox.prices}</p>
        )}
        {testBox.disabled ? (
        <p className="text-orange text-sm text-center">Not Available</p>
        ) : (
        testBox.isDuretionVisible && (
            <p className="text-center">{testBox.testDuration}</p>
        )
        )}
    </button>
  )
}

export default TestBox