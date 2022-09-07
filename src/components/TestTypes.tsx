import { Divider } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allTestTypesPresent } from '../commonFunctions';
import { handleDilogModal, updateForm } from '../redux/formReducer';
import TestBox from '../reUseableComponents/TestBox';
import { Heading } from './Heading';
const TestTypes = ({ testTypeItems }: any) => {
  const dispacth = useDispatch();
  const [checkedCard, setcheckedCard] = useState<string>('');

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
      dispacth(
        handleDilogModal({
          open: true,
          title: 'Warning',
          body: 'Test Types are either Not Available or Disabled, Booking Cannot be done Without Test Types',
        })
      );
    } else {
      handleTestType(
        testTypeItems
          .filter((e: any) => !e.hidden)
          .filter((e: any) => !e.disabled)?.[0]
      );
    }
  }, []);

  if (allTestTypesPresent(form))
    return (
      <>
        <Heading title="No Test Types are Available" center={true} />{' '}
        <Divider className="divider" orientation="horizontal" flexItem />
      </>
    );
  // let handleClick = () => {
  //   setbgcolor((prevState) => !prevState);
  // };
  return testTypeItems.filter((e: any) => !e.hidden).length > 1 ? (
    <>
      <Heading title="Test Type" />
      {/* <div
        className="my-2 flex flex-wrap justify-between gap-3 content-center relative"
        style={{ left: '50%', transform: `translate(-50%)`, width: '100%' }}
      >
        {testTypeItems
          .filter((e: any) => !e.hidden)
          .map((testBox: any, i: number) => (
            <TestBox testBox={testBox} handleTestType={handleTestType} key={i} selectedTestType={selectedTestType}/>
          ))}
      </div> */}

      {/* trial */}
      <div className="flex gap-5 w-full flex-wrap">
        <div className="relative w-full p-2 xl:w-2/12 lg:w-3/12 md:w-full sm:w-full">
          <div
            className="absolute left-5 max-h-max"
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <input
              type="radio"
              name="radio"
              id="testing"
              checked={checkedCard === 'key1'}
              onChange={(e) => setcheckedCard('key1')}
              className="h-5 w-5"
              style={{ top: '35%' }}
            />
          </div>
          <label htmlFor="testing">
            <div
              style={{
                backgroundColor: checkedCard === 'key1' ? '#A9A9A9' : '',
                color: checkedCard === 'key1' ? 'white' : '#000000',
              }}
              className="border cursor-pointer rounded-xl shadow-2xl gap-2 flex flex-wrap justify-between items-center"
            >
              <div className="ml-10">
                <p className="my-2 f-7">Rapid NAAT RT-PCR</p>
                <p className="my-2 f-6">(Results in 90min)</p>
              </div>
              <div className="mr-7">
                <p className="ml-10 my-2 f-7">$250</p>
              </div>
            </div>
          </label>
        </div>
        <div className="relative w-full p-2 xl:w-2/12 lg:w-3/12 md:w-full sm:w-full">
          <div
            className="absolute left-5 max-h-max"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <input
              type="radio"
              name="radio"
              id="testing"
              checked={checkedCard === 'key2'}
              onChange={(e) => setcheckedCard('key2')}
              className="h-5 w-5"
              style={{ top: '35%' }}
            />
          </div>
          <label htmlFor="testing">
            <div
              style={{
                backgroundColor: checkedCard === 'key2' ? '#A9A9A9' : '',
                color: checkedCard === 'key2' ? 'white' : '#000000',
              }}
              className="border cursor-pointer rounded-xl shadow-2xl gap-2 flex flex-wrap justify-between items-center"
            >
              <div className="ml-10">
                <p className="my-2">Express NAAT RT-PCR</p>
                <p className="my-2">(Results in 12 Hrs)</p>
              </div>
              <div className="mr-7">
                <p className="ml-10 my-2 ">$150</p>
              </div>
            </div>
          </label>
        </div>
        <div className="relative w-full p-2 xl:w-2/12 lg:w-3/12 md:w-full sm:w-full">
          <div
            className="absolute left-5 max-h-max"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <input
              type="radio"
              name="radio"
              id="testing"
              checked={checkedCard === 'key3'}
              onChange={(e) => setcheckedCard('key3')}
              className="h-5 w-5"
              style={{ top: '35%' }}
            />
          </div>
          <label htmlFor="testing">
            <div
              style={{
                backgroundColor: checkedCard === 'key3' ? '#A9A9A9' : '',
                color: checkedCard === 'key3' ? 'white' : '#000000',
              }}
              className="border cursor-pointer rounded-xl shadow-2xl gap-2 flex flex-wrap justify-between items-center"
            >
              <div className="ml-10">
                <p className="my-2 font-semibold">Standard NAAT RT-PCR</p>
                <p className="my-2">(Results in 24 Hrs)</p>
              </div>
              <div className="mr-7">
                <p className="ml-10 my-2 ">$90</p>
              </div>
            </div>
          </label>
        </div>
        <div className="relative w-full p-2 xl:w-2/12 lg:w-3/12 md:w-full sm:w-full">
          <div
            className="absolute left-5 max-h-max"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <input
              type="radio"
              name="radio"
              id="testing"
              checked={checkedCard === 'key4'}
              onChange={(e) => setcheckedCard('key4')}
              className="h-5 w-5"
              style={{ top: '35%' }}
            />
          </div>
          <label htmlFor="testing">
            <div
              style={{
                backgroundColor: checkedCard === 'key4' ? '#A9A9A9' : '',
                color: checkedCard === 'key4' ? 'white' : '#000000',
              }}
              className="border cursor-pointer rounded-xl shadow-2xl gap-2 flex flex-wrap justify-between items-center"
            >
              <div className="ml-10">
                <p className="my-2">Antigen BinaxNow</p>
                <p className="my-2">(Results in 30min)</p>
              </div>
              <div className="mr-7">
                <p className="ml-10 my-2 ">$70</p>
              </div>
            </div>
          </label>
        </div>
      </div>
      {/* trial */}

      <Divider className="pt-4 divider" orientation="horizontal" flexItem />
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
            <TestBox
              testBox={testBox}
              handleTestType={handleTestType}
              key={i}
              selectedTestType={selectedTestType}
            />
          ))}
      </div>
      <Divider className="pt-4 divider" orientation="horizontal" flexItem />
    </>
  );
};

export default TestTypes;
