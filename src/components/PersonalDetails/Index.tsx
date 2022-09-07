import { Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { updateForm } from '../../redux/formReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Input from '../../reUseableComponents/Input';
import SelectComponent from '../../reUseableComponents/Select';
import { moreDetails, PersonalInfo } from '../../utils';
import DOB from '../DOB';
import { Heading } from '../Heading';

const Index:React.FC = () => {
  const dispacth = useAppDispatch();
  const state:any = useAppSelector((state:any)=>state);
  const { form, submit } = state.form;
  return( 
  	<div className="my-4 w-full">
        <Heading title="Personal Details" />
        {PersonalInfo.map((e, i) => (
            e.type !== 'date' ? <div key={i} className="w-full my-5 flex justify-around gap-2 items-center">
                <Input
                    value={form[e.name]}
                    onChange={(event: any) =>
                        dispacth(updateForm({ [event.target.name]: event.target.value }))
                    }
                    lable={e.label}
                    required={e.required}
                    name={e.name}
                    type={e.type}
                    error={submit && e.required && !form[e.name]}
                />
            </div>
            :
            <>
                <DOB name={e.name} altName={'DOB'} label={e.label} validation={submit}/>
            </>
        ))}
        {moreDetails.filter(e=>form?.location?.schedularLite?.moreDetails?.[e.name]).map((e, i) => (
            <div key={i} className="w-full my-5 flex justify-around gap-2 items-center">
                {e?.list ? 
                    <SelectComponent e={e} form={form} dispacth={dispacth} submit={submit} />
                :
                    <div className="w-full flex justify-around gap-2 items-center">
                        <Input
                            onChange={(ee:any)=>
                                dispacth(updateForm({ [e.name]:ee.target.value }))
                            }
                            lable={e.label}
                            name={e.name}
                            type={e.type}
                            value={form?.[e.name] ?? ''}
                            error={submit && !form?.[e.name] }
                        />
                    </div>
                }
            </div>
        ))}
        <Divider className='divider' orientation='horizontal' flexItem/>
	</div>);
};

export default Index;
