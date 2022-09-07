import { Divider } from '@mui/material';
import { hover } from '@testing-library/user-event/dist/hover';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allTestTypesPresent } from '../commonFunctions';
import { handleDilogModal, updateForm } from '../redux/formReducer';
import TestBox from '../reUseableComponents/TestBox';
import { Heading } from './Heading';
const TestTypes = ({ testTypeItems }: any) => {
  const dispacth = useDispatch();
  const handleTestType = (item: any) => {
    if (item) {
      dispacth(
        updateForm({
          testType: item?.testType,
          isExpress: item.isExpress,
          isAntigen: item.isAntigen,
          isRapid: item.isRapid,
          standardTest: item.standardTest,
          price: item.prices,
          testDuration: item.testDuration,
          selectedTestType: item.id,
        })
      );
    }
  };

  

  const { form } = useSelector((state: any) => state.form);
  const selectedTestType =
    form?.selectedTestType ??
    testTypeItems
      .filter((e: any) => !e.hidden)
      .filter((e: any) => !e.disabled)[0]?.id;
  React.useEffect(() => {
    if (allTestTypesPresent(form)) {
      dispacth(handleDilogModal({ open: true, title: 'Warning', body: 'Test Types are either Not Available or Disabled, Booking Cannot be done Without Test Types' }))
    }
    else {
      handleTestType(
        testTypeItems
          .filter((e: any) => !e.hidden)
          .filter((e: any) => !e.disabled)?.[0]
      );
    }
  }, []);

  if (allTestTypesPresent(form))
    return <><Heading title="No Test Types are Available" center={true} /> <Divider className='divider' orientation='horizontal' flexItem /></>

  return testTypeItems.filter((e: any) => !e.hidden).length > 1 ? (
    <>
        <div className='flex flex-wrap gap-5 items-center'>
        <Heading title="Test Type" />
        <h4 className="my-2">Select test type:</h4>
        <div className="flex gap-5 w-full flex-wrap">
            {testTypeItems
            .filter((e: any) => !e.hidden)
            .map((testBox: any, i: number) => (
                <TestBox testBox={testBox} handleTestType={handleTestType} key={i} selectedTestType={selectedTestType}/>
            ))}
            </div>
        </div>
        <Divider className='pt-4 divider' orientation='horizontal' flexItem />
    </>
  ) : (
    <>
      <div
        className="mt-4 flex flex-wrap justify-between gap-3 items-center relative"
        style={{ left: '50%', transform: `translate(-50%)`, width: '100%' }}
      >
        <Heading title="Test Type" />
        {testTypeItems
          .filter((e: any) => !e.hidden)
          .map((testBox: any, i: number) => (
            <TestBox testBox={testBox} handleTestType={handleTestType} key={i} selectedTestType={selectedTestType} />
          ))}
      </div>
      <Divider className='pt-4 divider' orientation='horizontal' flexItem />
    </>
  );
};

export default TestTypes;
