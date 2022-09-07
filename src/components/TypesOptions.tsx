/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Heading } from './Heading'
import { setModal } from '../redux/formReducer'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { Divider } from '@mui/material'
import CheckBoxItems from './CheckBox'
import { BsPlusLg } from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'
import Button from '../reUseableComponents/Button'
import { GrCheckboxSelected } from 'react-icons/gr'
const
    TypesOptions = ({ optionTypeFor }: any) => {
        const dispacth = useAppDispatch();
        const { form }: any = useAppSelector(state => state.form);
        const { location } = form;
        if (optionTypeFor === 'address') {
            const ENTER_ADDRESS_MANUALLY = location?.schedularLite?.address?.address ?? false;
            const PROVIDE_GOVT_PROOF = location?.schedularLite?.address?.drivingLicence ?? false;
            if (!(ENTER_ADDRESS_MANUALLY || PROVIDE_GOVT_PROOF)) {
                return (<>
                    <div className='pt-1'>
                        <Heading title={'There is No Address Options Available for this Location'} center={true} />
                    </div>
                    <Divider className='pt-6 divider' orientation='horizontal' flexItem />
                </>)
            }

            return (
                <>
                    <div className='flex flex-wrap gap-4 items-center w-60 lg:w-full md:w-60'>
                        {ENTER_ADDRESS_MANUALLY && PROVIDE_GOVT_PROOF && <Heading title={optionTypeFor} />}
                        {ENTER_ADDRESS_MANUALLY && PROVIDE_GOVT_PROOF &&<h4 className="">Choose which one to add:</h4>}
                        <div style={{width:500}} className={`relative w-full flex items-center gap-4 flex-wrap xl:w-2/12 lg:w-3/12 md:w-full sm:w-full ${!(ENTER_ADDRESS_MANUALLY && PROVIDE_GOVT_PROOF) ? 'mt-2' : ''}`}>
                            {!(ENTER_ADDRESS_MANUALLY && PROVIDE_GOVT_PROOF) && <Heading title={optionTypeFor} />}
                            {ENTER_ADDRESS_MANUALLY && <div className='flex items-center h-full '>
                                <Button text={`${form.isAddress ? 'Edit Address' : 'Add Address'}`}
                                    type='button'
                                    disabled={form?.isGovtProof}
                                    icon={{position:'left', icon:form.isAddress ? <BiEditAlt /> : <BsPlusLg />}}
                                    onClick={() => dispacth(setModal({ open: true, type: 'address', title: 'Enter Address' }))}  
                                    className={`font-bold p-4 mb-4 rounded-full flex justify-center h-10 items-center btn ${form?.isAddress ? 'text-btn':'elevated-btn' }`} 
                                />
                            </div>}
                            {ENTER_ADDRESS_MANUALLY && PROVIDE_GOVT_PROOF}
                            {PROVIDE_GOVT_PROOF && <div>
                                <Button text={`${form.isAddress ? 'Edit Government ID' : 'Upload Government ID'}`}
                                    type='button'
                                    disabled={form?.isAddress && !form.isGovtProof}
                                    icon={{position:'left', icon:form.isGovtProof ? <BiEditAlt /> : <BsPlusLg />}}
                                    onClick={() => dispacth(setModal({ open: true, type: 'govtProof', title: 'Upload Government Proof' }))}  
                                    className={`font-bold p-4 mb-4 rounded-full flex justify-center h-10 items-center btn ${form?.isGovtProof ? 'text-btn':'elevated-btn' }`} />
                            </div>}
                        </div>
                    </div>
                    {(ENTER_ADDRESS_MANUALLY || PROVIDE_GOVT_PROOF) && <Divider className='pt-4 divider' orientation='horizontal' flexItem />}
                </>
            )
        }
        if (optionTypeFor === 'Payment Method') {
            const CREDIT_CARD = location?.schedularLite?.payment?.credit;
            const ENTER_INSURANCE_DETAILS = location?.schedularLite?.payment?.insurance;
            const ALLOW_NO_INSURANCE = form?.location?.schedularLite?.noInsurance;
            if (ENTER_INSURANCE_DETAILS || CREDIT_CARD || ALLOW_NO_INSURANCE)
                return (
                    <>
                        {(ENTER_INSURANCE_DETAILS && CREDIT_CARD) && <Heading title={optionTypeFor} />}
                        {ENTER_INSURANCE_DETAILS && CREDIT_CARD && <h4 className="my-3">Choose how to pay:</h4>}
                        <div className={`relative w-full p-2 xl:w-2/12 lg:w-3/12 md:w-full sm:w-full ${!(ENTER_INSURANCE_DETAILS && CREDIT_CARD) ? 'mt-4' : ''}`}>
                            {!(ENTER_INSURANCE_DETAILS && CREDIT_CARD) && <Heading title={optionTypeFor} />}

                            {CREDIT_CARD && <div>
                                <Button text={`${form?.payingMethod === 'Credit Card' ? 'Credit Card Applied' : 'Credit Card'}`}
                                type='button'
                                disabled={form?.iDontHaveInsurance || form.payingMethod ==='Insurance'}
                                icon={{position:'left', icon:(form.payingMethod === 'Credit Card' && !form.iDontHaveInsurance) ? <GrCheckboxSelected className='bg-white'/> : <BsPlusLg />}}
                                onClick={() => dispacth(setModal({ open: true, type: 'payment', title: 'Credit Card' }))}
                                className={`font-bold p-4 mb-4 rounded-full flex justify-center h-10 items-center btn ${(form.payingMethod === 'Credit Card' && !form.iDontHaveInsurance) ? 'bg-dark text-white':'elevated-btn' }`} />
                            </div>}
                            {(ENTER_INSURANCE_DETAILS && CREDIT_CARD)}
                            {ENTER_INSURANCE_DETAILS && <div>
                                <Button text={`${form?.payingMethod === 'Insurance' ? 'Edit Insurance' : 'Insurance'}`}
                                type='button'
                                disabled={form?.iDontHaveInsurance || form.payingMethod ==='Credit Card'}
                                icon={{position:'left', icon:(form.payingMethod === 'Insurance' && !form.iDontHaveInsurance) ? <BiEditAlt /> : <BsPlusLg />}}
                                onClick={() => dispacth(setModal({ open: true, type: 'insurance', title: 'Insurance' }))}
                                className={`font-bold p-4 mb-4 rounded-full flex justify-center h-10 items-center btn ${(form.payingMethod === 'Insurance' && !form.iDontHaveInsurance) ? 'text-btn':'elevated-btn' }`} />
                            </div>}


                            {/* {!(ENTER_INSURANCE_DETAILS || CREDIT_CARD) && <CheckBoxItems type='NoInsurance' />} */}
                        </div>
                        <Divider className='divider' orientation='horizontal' flexItem />
                        { ALLOW_NO_INSURANCE && <CheckBoxItems type='NoInsurance' className="mt-6" />}
                        {/* {(ENTER_INSURANCE_DETAILS || CREDIT_CARD || ALLOW_NO_INSURANCE)
                            // && <Divider className='pt-4 divider' orientation='horizontal' flexItem/>
                        } */}

                    </>
                )
            else
                return <></>
        }
        return <></>
    }

export default TypesOptions