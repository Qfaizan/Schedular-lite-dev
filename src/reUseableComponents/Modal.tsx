/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { address, Insurance, policyHolder } from '../utils';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import AddressForm from '../components/ModalContents/AddressForm';
import GovtProof from '../components/ModalContents/GovtProof';
import InsuranceForm from '../components/ModalContents/InsuranceForm';
import ConsentsDetails from '../components/ModalContents/ConsentsDetails';
import VerifyOtp from '../components/ModalContents/VerifyOtp';
import { updateForm } from '../redux/formReducer';
import Button from './Button';
import { isValidateDate } from '../commonFunctions';

export default function BasicModal({
    open,
    Close,
    title,
    okText,
    okFun,
    type,
}: any) {
    const dispacth = useAppDispatch();
    const state = useAppSelector((state: any) => state);
    const { form,  hippaConsent, optValidating } = state.form;
    console.log('KC ',optValidating);
    
    const [clicked, setClicked] = React.useState(false);
    
    const handleSubmit = () => {
        if (
            type === 'address' &&
            address.filter((e) => e.required && !form[e.name]).length
        ) {
            setClicked(true);
            return;
        }
        if (
            type === 'insurance' &&
            ((Insurance.filter((e) => e.required && !form[e.name]).length) ||
            (form?.insuranceFor !== "i'm" ?
            policyHolder.filter((e) => e.required && e.type === 'date' ? isValidateDate(form[e.name]) : !form[e.name]).length : false))
        ) {
            setClicked(true);
            return;
        }
        if (type === 'insurance')
            dispacth(
                updateForm({
                    hasInsurance: type === 'insurance',
                    payingMethod: 'insurance',
                    paymentIntentId: '',
                })
            );
        okFun(type);
    };
    return (
        <Modal
            open={open}
            onClose={(event: any, reason: any) => {
                if (reason !== 'backdropClick') {
                    Close();
                }
            }}
            disableEscapeKeyDown={true}
        >
            <div className="overflow-auto h-screen w-screen bg-transparent">
                <div
                    className={`flex outline-none justify-center items-center pb-40 ${type === 'verify' ? `h-5/6 my-10` : (type === 'consent' && hippaConsent?.length === 0) ? ` h-5/6 mt-10 mb-28` : ` mt-10 mb-28`
                        }`}
                >
                    <div className="bg-white w-11/12 md:w-6/12 p-4 rounded-md">
                        {type !== 'consent' && (
                            <div className={`flex items-center ${type === 'govtProof' ? 'mb-5 justify-center' : 'justify-start'}`}>
                                <div className={`${type === 'govtProof' ? 'text-3xl font-semibold' : 'text-2xl'}`}>{title}</div>
                            </div>
                        )}
                        {type==='address' && <AddressForm clicked={clicked} />}
                        {type==='govtProof' && <GovtProof Close={Close} />}
                        {type==='insurance' && <InsuranceForm clicked={clicked} />}
                        {type==='verify' && <VerifyOtp clicked={clicked}  />}
                        {type==='consent' && <ConsentsDetails  Close={Close} />}
                        {(type !== 'govtProof' && type !== 'consent' ) && 
                            <div className="flex justify-end gap-3">
                                <Button text='Cancel' onClick={Close} disabled={optValidating} className='btn shadow-xl font-semibold elevated-btn' />
                                <Button text={okText} onClick={handleSubmit} disabled={optValidating} className='btn shadow-lg font-semibold fill-btn'/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Modal>
    );
}
