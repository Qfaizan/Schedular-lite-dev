import React from 'react'
import { BsPlusLg } from 'react-icons/bs';
import { MdOutlineVerified } from 'react-icons/md';
import { sendOtp } from '../../redux/asyncThunk';
import { setOTPSending, updateForm,  } from '../../redux/formReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Button from '../../reUseableComponents/Button';
import Input from '../../reUseableComponents/Input';
import { Contacts, InputBoxSize } from '../../utils';
import { isValidEmail } from '../../validation';
import { Heading } from '../Heading';
import { FaMinus } from 'react-icons/fa';
import { disabledButton, isDisabledPhoneAndEmail, isErrorField } from './validation';
import { Divider } from '@mui/material';
interface prop{
}
const Index:React.FC<prop> = () => {
    const dispacth = useAppDispatch()
    const state:any = useAppSelector(state=>state);
    const {form, loading, otpSending,submit,error} = state.form;
    const { location } = form;
    const [count, setCount] = React.useState(parseInt(form?.location?.schedularLite?.noOfEmailFields ?? 1));    
    React.useEffect(() => {
        dispacth(updateForm({totalEmailCount: count}))
    }, [count])
  return (
    <>
        <div className="my-4 w-full">
				<Heading title="Contact Details" />
				{Contacts.map((e, i) => !(count>1 && e.name==='email')? (
					<div className="my-5" key={i}>
                        {console.log('KC ',loading)}
						<div className="w-full flex justify-around gap-2 items-center">
							<Input
								value={(parseInt(form?.location?.schedularLite?.noOfEmailFields ?? 0)>1 || form?.location?.schedularLite?.allowUserToEnterDynamicEmails) && e.name==='email' ? form.emails?.[0] ? form.emails?.[0]  : form[e.name] : form[e.name]}
								disabled={isDisabledPhoneAndEmail(form,otpSending,(e.name===loading), e.name)}
								onChange={(ee: any) =>
                                    {
                                        if((parseInt(form?.location?.schedularLite?.noOfEmailFields ?? 0)>1 || form?.location?.schedularLite?.allowUserToEnterDynamicEmails) && e.name==='email'){
                                            let emails:any[] = [];
                                            emails[0] = ee.target.value;
                                            dispacth(updateForm({ emails }))
                                        }else{
                                            dispacth(updateForm({ [ee.target.name]: ee.target.value }))
                                        }
                                        if(count===1 &&e.name==='email'){
                                            dispacth(updateForm({ [ee.target.name]: ee.target.value }))
                                        }
                                    }
								}
								lable={e.label}
								required={e.required}
								name={e.name}
								type={e.type}
                                error={isErrorField(submit,e.name, form,error)}
							/>
							{((location.schedularLite.verification.phone && !form?.isPhnVerified && e.name === "phone" ) || (location.schedularLite.verification.email && !form?.isEmailVerified && e.name === "email" )) && 
                            (
                                <Button 
                                    text={loading === e.name ? otpSending ? "Sending OTP" : 'OTP Sent' : "Verify"} 
                                    onClick={()=>{dispacth(setOTPSending({otpSending:true,loading:e.name}));dispacth(sendOtp({type:e.name,data:form[e.name]}))}}
                                    disabled={disabledButton(form,e.name,otpSending, (e.name===loading))}
                                    className={`btn ${InputBoxSize==='small'?'':'h-55'} fill-btn`}
                                />
							)}
							{((form?.isPhnVerified && e.name === "phone") ||
								(form?.isEmailVerified && e.name === "email")) && (
								<MdOutlineVerified className={`text-${InputBoxSize==='small'?'5':'7'}xl text-orange`} />
							)}
						</div>
						{e.name === "phone" && location?.schedularLite?.countryCodeSuggesion && (
							<p className="text-xs mt-1">
								Please enter country code E.g: (15135676534)
							</p>
						)}
                        {(parseInt(form?.location?.schedularLite?.noOfEmailFields ?? 0) > 1 || form?.location?.schedularLite?.allowUserToEnterDynamicEmails) &&e.name!=='phone' &&
                            <div className="flex w-full gap-4 justify-between mt-4 mb-8">
                                <Button onClick={()=>setCount(state=>state+1)} className="btn outline-btn w-full" icon={{position:'left', icon:(<BsPlusLg/>)}} text='Add Email Field'/>
                            </div>
                        }
					</div>
				):(
                    Array.from({length:count},(_,i)=>i).map((e:any)=>(
                        <div className="my-5" key={e}>
                        <div className="w-full flex justify-around gap-2 items-center">
                            <Input
                                onChange={(ee:any)=>
                                    {
                                        var emails:any[] = []
                                        emails =  [...form?.emails ?? []];
                                        emails[e] = ee.target.value;
                                        dispacth(updateForm({ emails:emails }))
                                    }
                                }
                                lable={'Email '+(e+1)}
                                name={"email"+e}
                                type={'text'}
                                value={form?.emails?.[e] ?? ''}
                                defaultValue=''
                                error={isErrorField(submit,'',form,error,false, e)}
                            />
                        </div>
                        {count-1 ===e && 
                        <>
                            <p className="text-xs mt-1">
                                Please Enter {count} Different Emails
                            </p>
                            {form?.location?.schedularLite?.allowUserToEnterDynamicEmails &&
                            <div className="flex w-full gap-4 justify-between mt-4 mb-8">
                                <Button onClick={()=>setCount(state=>state-1)} className={'btn outline-btn w-full'} text='Remove Email Field' icon={{position:'left', icon:(<FaMinus/>)}} />
                                {count<10 && 
                                <Button onClick={()=>{
                                    setCount(state=>state+1);
                                    try {
                                        const emails:any[] = [...form?.emails];
                                        emails[count]=''
                                        dispacth(updateForm({emails}))
                                    } catch (error) {
                                        console.log('error',error);
                                    }
                                }} className="btn outline-btn w-full" icon={{position:'left', icon:(<BsPlusLg/>)}} text='Add Email Field'/>}
                            </div>}
                        </>
                        }
                    </div> 
                    )
                )
                
                )
                )}
            <Divider className='divider' orientation='horizontal' flexItem/>
        </div>
    </>
  )
}

export default Index