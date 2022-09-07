import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { colors } from "../reUseableComponents/styles/colors";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CloseButton from "../reUseableComponents/CloseButton";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getPaymentIntentId } from "../redux/asyncThunk";
import config from "../config";
import { isValidEmail } from "../validation";
import { updateForm } from "../redux/formReducer";
import Button from "../reUseableComponents/Button";
const PaymentModal = ({ open, Close }: any) => {
    const {form,payment}:any = useAppSelector((state)=>state.form);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(getPaymentIntentId( {
            amount: parseInt(form.price) * 100,
            currency: config.currency,
            metadata: {
                location: form?.location?.name ?? '',
                location_Id: form?.location?.qbenchCustomerId ?? 0,
                coupon_Id: form?.couponId ?? '',
                discountAmount: form?.discountAmount ?? ''
            },
            description: 'COVID-19 Test',
            customer: ''
        }))
    }, [])
    
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const submitHandler = async(e:any)=>{
        e.preventDefault();
        setProcessing(true)
        if (!stripe || !elements) {
            setError('Payment failed !!');
            setProcessing(false)
            return;
        }
        try {
            const cardElement:any = elements.getElement(CardElement);
            if (!cardElement || !payment) {
                setError('Payment failed !!');
                setProcessing(false)
                return
            }
            if (!( form?.totalEmailCount > 1 ? true : isValidEmail.test(form.email))) {
                setError('Please enter valid email address');
                setProcessing(false);
            } else {
                setError('');
                const payload = await stripe.confirmCardPayment(
                    payment.client_secret,
                    {
                        payment_method: {
                            card: cardElement,
                            billing_details: {
                                name: form.firstName + " " + form.lastName,
                                phone: form.phone,
                                email: form.email,
                            },
                        },
                        receipt_email: form.email,
                    }
                );
                if (!payload.error) {
                    setError(null);
                    dispatch(updateForm({ hasInsurance : false,
                        payingMethod : 'Credit Card',
                        insuranceBackCard: '',
                        insuranceFrontCard : '',
                        subscriberFirstName : '',
                        subscriberLastName : '',
                        insuranceId : '',
                        paymentIntentId: payment.id,
                        termsAndConditions:false
                    }))
                    setProcessing(false);
                    await new Promise<void>((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 500);
                    });
                    Close()
                } else {
                    setProcessing(false);
                    setError(`Payment failed: ${payload.error.message}`);
                }
            }
            } catch (error) {
                setError('Payment failed !!');
                setProcessing(false)   
        }
    }
	return (
		<Modal open={open} onClose={(event,reason)=>{
            if (reason !== 'backdropClick') {
                Close()
            }
        }} disableEscapeKeyDown>
            <form onSubmit={submitHandler} className='overflow-auto h-screen w-screen bg-transparent'>
                <div
                    className="rounded-md absolute w-11/12 md:w-6/12 left-2/4 top-2/4 -translate-x-2/4 outline-none -translate-y-2/4"
                    style={{ backgroundColor: "rgb(42, 95, 135)" }}>
                            <div className="flex justify-end relative right-2 top-2">
                                <CloseButton Close={Close}/>
                            </div>
                        <div className="flex justify-center">
                            <img src={config.PaymentModalImage} alt="Not Found" className="h-40 text-white" />
                        </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="bg-white rounded-md flex flex-col my-6 justify-center w-11/12 py-2 md:w-8/12">
                            <div className="w-full flex ">
                                <div className="w-3/12 ml-3 p-2">
                                    <label>Name</label>
                                </div>
                                <div className="w-9/12 font-semibold p-2 capitalize"> {form.firstName + " " + form.lastName}</div>
                            </div>
                            <hr />
                            <div className="w-full flex ">
                                <div className="w-3/12 ml-3  p-2">
                                    <label>Email</label>
                                </div>
                                <div className="w-9/12 font-semibold  p-2 lowercase"> {form.totalEmailCount>1 ?  form.emails.join(', '):form.email}</div>
                            </div>
                            <hr />
                            <div className="w-full flex ">
                                <div className="w-3/12 ml-3  p-2">
                                    <label>Phone</label>
                                </div>
                                <div className="w-9/12 font-semibold  p-2"> {form.phone}</div>
                            </div>
                        </div>
                        <div className="bg-white rounded-md p-4 text-black w-11/12 md:w-8/12 mb-5">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: colors.black,
                                            "::placeholder": {
                                                color: colors.grey,
                                            },
                                            backgroundColor: colors.white,
                                            fontFamily: "Quicksand, sans-serif",
                                        },
                                        invalid: {
                                            color: colors.red,
                                        },
                                    }
                                }}
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <Button type='submit' className="btn fill-btn p-2 font-bold w-11/12 md:w-8/12" text={processing ? 'Processing...' : `Pay $${form.price}`} />
                        </div>
                        <div className="mb-12 mt-4">
                            {error&&<p className="text-red-600">{error}</p>}
                        </div>
                    </div>
                </div>
            </form>
		</Modal>
	);
};

export default PaymentModal;
