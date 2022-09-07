import React, { useEffect } from 'react';
import { GoLocation } from 'react-icons/go';
import { getHippaContent } from './../redux/asyncThunk';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateForm } from '../redux/formReducer';
import { Divider } from '@mui/material';
import { getUpcommingDatefromWeek } from '../commonFunctions';
import Input from '../reUseableComponents/Input';

const Location = ({ location }: any) => {
  const dispacth = useAppDispatch();
  const { form }:any = useAppSelector(state=>state.form)
  useEffect(() => {
    if(form?.location?.schedularLite?.weeklyTestingAppointment?.isActive)
    {
        const apptDate = getUpcommingDatefromWeek(form?.location?.schedularLite?.weeklyTestingAppointment?.week)
        dispacth(updateForm({classroom:form?.location?.schedularLite?.weeklyTestingAppointment?.classroom ?? '', countOfRecursiveAppt: 1,recuringAppointment:true, scheduledAppt:true,uniqueID: Math.round(Math.random()*Math.random()*10000000000000), date:apptDate ,slot:{...form.slot, locationId:form?.location?.qbenchCustomerId, date:apptDate, label:form?.location?.schedularLite?.weeklyTestingAppointment?.time }}))
    }else{
        dispacth(updateForm({slot: {...form.slot, locationId:form?.location?.qbenchCustomerId}}))
    }
    if(form?.location && !form?.payingMethod)
    {
        if(!(form?.location?.schedularLite?.payment?.insurance || form?.location?.schedularLite?.payment?.credit || form?.location?.schedularLite?.noInsurance))
        {
            dispacth(updateForm({payingMethod:"No Payment"}))
        }
    }
    if(location?.schedularLite?.hippaInfo !== 'Disable')
    dispacth(getHippaContent(location?.schedularLite?.hippaInfo ? location?.schedularLite?.hippaInfo : 'WSL001' ));
  }, []);
  return (
    <>
        <div className="w-full flex items-center">
            <div className="w-full mb-3 mt-6 bg-dark text-white rounded-md p-2 flex gap-5 shadow-btn">
                <GoLocation className="ml-4 text-2xl mt-1"/>
                <div>
                    <p className="text-2xl font-semibold mb-1">{location.name}</p>
                    <p className="text-lg f-3">{location.address1}{location.address2 ? `.${location.address2}` :''}</p>
                </div>
            </div>
        </div>
        { location?.schedularLite?.enableSubLocation && 
            <div className="mt-4">
                <Input
                    value={form?.subLocation}
                    defaultValue={form?.subLocation}
                    onChange={(ee: any) =>
                        dispacth(updateForm({ [ee.target.name]: ee.target.value }))
                    }
                    lable={'Sub Location Name'}
                    required={true}
                    name='subLocation'
                    type={'text'}
                />
            </div>
        }
        <Divider className='pt-4 divider' orientation='horizontal' flexItem/>
    </>
  );
};

export default Location;
