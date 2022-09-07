/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Forms from "./components/Forms";
import Location from "./components/Location";
import TestTypes from "./components/TestTypes";
import Modal from "./reUseableComponents/Modal";
import { GoogleAnalytics, URL } from "./utils";
import TypesOptions from "./components/TypesOptions";
import PaymentModal from "./components/PaymentModal";
import { setModal, validateOTP, setSubmit, updateForm, handleSubmit, handleDilogModal } from "./redux/formReducer";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { verifyOTP, getLocation, createAppointment, getPostalcodesThunk } from "./redux/asyncThunk";
import Loader from "./reUseableComponents/Loader";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent, Divider } from "@mui/material";
import CheckBoxItems from "./components/CheckBox";
import { handleValidate, validateForm } from "./commonFunctions";
import Header from "./components/Header";
import Button from "./reUseableComponents/Button";
const App = () => {
	const dispacth = useAppDispatch();
	const state = useAppSelector((state: any) => state);
	const { form, loading, otp, modal, optValidating, appointment, locationId, alertBox } = state.form;
    console.log('KC form',form);
    
	const handleModal = (type: string) => {
		if (modal.type === "verify") {
			dispacth(validateOTP(true));
			dispacth(verifyOTP({ type: loading, data: form[loading], otp }));
		}
        if(type==='address'){
            dispacth(updateForm({isAddress:true,govtIdFrontCard:'',govtIdBackCard:''}))
            dispacth(setModal({open:false}))
            dispacth(getPostalcodesThunk(form.zipCode));
        }
        if(type === 'insurance'){
            dispacth(updateForm({payingMethod:'Insurance', hasInsurance:true, paymentIntentId:''}))
            dispacth(setModal({open:false}))
        }
	};
    const handleSubmitForm = ()=>{
        if(!validateForm(form))
            dispacth(setSubmit(true));
        if(validateForm(form)){ 
            dispacth(handleSubmit({process:true,submit:false}))
            dispacth(createAppointment(form))
        }
        else
        {
            dispacth(handleSubmit({process:false}))
            dispacth(handleDilogModal({open:true,title:'Warning',body:handleValidate(form,true)}))
        }
    }
	React.useEffect(() => {
        GoogleAnalytics(form,'/Schedular - Lite','Lite-'+locationId);
		dispacth(getLocation());
	}, []);
	return (
		<div style={{ width: "100%" }}>
			{form.location !== null && form?.location?.schedularLite?.isActive && !(appointment?.ack !== 'error' && appointment?.ack !== '') ? (
				<>
                    <Header location={form?.location ?? {}} />
					<div className="flex w-full justify-center">
						<div className="w-10/12">
							<Location location={form.location}/>
							<Forms type={"ContactDetails"} />
							<Forms type={"PersonalDetails"} />
                            <TypesOptions optionTypeFor="address" />
                            <TestTypes testTypeItems={form.location.schedularLite.testTypes} />        
							<TypesOptions optionTypeFor="Payment Method" />
                            <CheckBoxItems type='termsAndConditions' handleValidate={handleValidate}/>
							<Button
                                // disabled={!validateForm(form)}
                                text={appointment.process? 'Processing... ' : 'Book Appointment'}
								onClick={handleSubmitForm}
								className="w-full btn my-6 font-bold shadow-lg fill-btn"/>
                            {appointment.ack ==='error' && <p className="text-red-600 mb-5 text-lg text-center">Something Went Wrong</p>}
						</div>
					</div>
                    {alertBox?.open && <Dialog open={alertBox?.open} onClose={()=>dispacth(handleDilogModal({open:false,title:'',body:''}))}>
                        <DialogTitle className="font-extrabold f-9">{alertBox?.title}</DialogTitle>
                        <DialogContent><ul>{alertBox?.body?.split(', ').map((e:any,index:number)=><li className={(index===0) ? `font-semibold mb-3` : ``}>{e}</li>)}</ul></DialogContent>
                    </Dialog>}
					{modal.open && modal.type === "payment" && (
						<PaymentModal
							open={modal.open}
							Close={() => dispacth(setModal({ ...modal, open: false }))}
						/>
					)}
					{modal.open && modal.type !== "payment" && (
						<Modal
							open={modal.open}
							title={modal.title}
							Close={() => dispacth(setModal({ ...modal, open: false }))}
							okFun={handleModal}
							okText={
								modal.type !== "verify"
									? "Next"
									: optValidating
									? "Verifying"
									: "Verify"
							}
							type={modal.type}
						/>
					)}
				</>
			) : (
				<div style={{ height: "100vh" }}>
					<div className="flex w-screen h-full justify-center items-center relative">
						{form.location === null ? (
							<div>
								<Loader />
							</div>
						) : (
                            <>
                                {/* <div className="block">
                                    <div className="flex w-full absolute top-0">
                                        <img src={URL} className="w-80 md:w-96 p-2" alt="Image Not Found" />
                                        <Divider style={{borderWidth:3, backgroundColor:'rgb(36, 61, 77)'}} />
                                    </div>
                                </div> */}
                                <Header location={form?.location} overrideStyle/>
    							{appointment?.ack ? (<div className="bg-slate-200 shadow-lg p-10 rounded-md">
                                    <p className="text-3xl mb-5">Your Appointment Successfully Placed</p>
                                    <p className="text-3xl font-semibold uppercase underline mt-5">{appointment?.conf ? '# Confirmation ID' : '# Acknowledgement ID' }</p>
                                    <p className="text-2xl font-bold mt-5">{appointment.conf ? appointment.conf : appointment.ack}</p>
                                </div>) : (<div className="text-4xl md:text-6xl uppercase">Invalid QR Code</div>)}
                            </>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
