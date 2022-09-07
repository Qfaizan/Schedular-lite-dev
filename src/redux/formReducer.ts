import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppSettings, formValue } from "./reducerUtils";
import { createAppointment, getHippaContent, getLocation, getPaymentIntentId, getPostalcodesThunk, sendOtp, verifyOTP } from "./asyncThunk";
import { isValidEmail } from "../validation";
export interface form {
	form: Object;
	modal: { open: boolean; type: string; title: string };
	loading: string;
	otpSending: boolean;
	otp: number | "";
	optValidating: boolean;
	hippaConsent: Object;
	payment: {
		id?: string | null;
		client_secret?: string | null;
		customer_id?: string | null;
	};
    submit:boolean;
    locationId:number;
    error:string;
    appointment:{
        process:boolean,
        ack:string,
        conf?:string
    },
    alertBox:{
        open:boolean,
        title:string,
        body:string
    },
    postalCodes:any[],
    subscriberName: {
        userFirstName: string,
        userLastName: string,
        othersFirstName: string,
        othersLastName: string
    }
}

const initialState: form = {
	form: formValue,
    postalCodes:[],
	modal: AppSettings.modal,
	otpSending: false,
	loading: "",
	otp: "",
	optValidating: false,
	hippaConsent: [],
	payment: { id: "", client_secret: "", customer_id: "" },
    submit:false,
    locationId:parseInt(Object.fromEntries(new URLSearchParams(window.location.search).entries())?.location ?? 0),
    error:"",
    appointment:{
        process:false,
        ack:"",
        conf:''
    },
    alertBox:{
        open:false,
        title:'',
        body:''
    },
    subscriberName: {
        userFirstName: '',
        userLastName: '',
        othersFirstName: '',
        othersLastName: ''
    }
};
export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		updateForm: (state, action: PayloadAction<Object>) => {
            console.log('payload',action.payload);
            
			state.form = { ...state.form, ...action.payload };
            if((state.error && (state.error in action.payload)) || state.otp){
                state.error="";
                state.otp = "";
            }
		},
        updateSubscriberName: (state, action: PayloadAction<Object>) => {
            console.log('subscriber',action.payload);
            
			state.subscriberName = { ...state.subscriberName, ...action.payload };
            if((state.error && (state.error in action.payload)) || state.otp){
                state.error="";
                state.otp = "";
            }
		},
		setModal: (state:any, action: PayloadAction<{type?:string,open?:boolean,title?:string}>) => {
            state.loading = action.payload.open ? state.loading : ''
            if(action.payload.type==='payment' ? ((state.form.firstName + state.form.lastName) && state.form.totalEmailCount>1 ? state.form?.emails.filter((e:any)=>isValidEmail.test(e)).length === state.form?.totalEmailCount : isValidEmail.test(state.form.email) && state.form.phone?.length >=10)  : true){
                state.modal = { ...state.modal, ...action.payload };
            }else{
                state.alertBox = {open:true,title:'Alert',body:`Please enter below Details, First Name, Last Name, Valid Phone Number, Valid Email Field${state.form.totalEmailCount>1?'s':''}`}
            }
		},
		setOtp: (state, action: PayloadAction<number | "">) => {
			state.otp = action.payload;
            if(state.error)
                state.error=""
		},
		setSubmit: (state, action: PayloadAction<boolean>) => {
			state.submit = action.payload;
		},
		setOTPSending: (state, action: PayloadAction<{ otpSending: boolean; loading: string }>) => {
			state.otpSending = action.payload.otpSending;
			state.loading = action.payload.loading;
		},
		validateOTP: (state, action: PayloadAction<boolean>) => {
			state.optValidating = action.payload;
		},
        handleDilogModal:(state,action)=>{
            state.alertBox = action.payload;
        },
        handleSubmit:(state,action:PayloadAction<{
            submit?:boolean,
            process?:boolean,
            ack?:string
        }>)=>{
            state.submit = action.payload?.submit ?? state.submit;
            state.appointment.process = action.payload?.process ?? state.appointment.process;
            state.appointment.ack = action.payload?.ack ?? state.appointment.ack;
        }
	},
	extraReducers(builder) {
		builder
			.addCase(sendOtp.fulfilled, (state, action) => {
                if(!action.payload)
                {
                    state.error = state.loading;
                    state.otpSending = false;
                    state.loading = "";
                }    
                else{
                    state.modal = {
                        open: action.payload,
                        type: "verify",
                        title: state.loading === "email" ? "Verify Email" : "Verify Phone",
                    };
                    state.error="";
                    state.otpSending = false;
                }
			})
			.addCase(
				verifyOTP.fulfilled,
				(state, action: PayloadAction<{ status: boolean; data?: Object }>) => {
                    if (action.payload?.status) {
						state.optValidating = false;
						state.loading = "";
                        state.error = ""
						state.modal = { ...state.modal, open: false };
						state.otp = "";
						state.form = { ...state.form, ...action.payload?.data };
					}else {
                        state.error = state.loading;
                        state.optValidating = false;
                    }
				}
			)
			.addCase(getHippaContent.fulfilled, (state, action: PayloadAction<Object>) => {
				state.hippaConsent = action.payload ?? [];
			})
            .addCase(getPaymentIntentId.fulfilled,(state,action:PayloadAction<{ status:boolean,data:Object }>)=>{
                if(action.payload.status)
                state.payment = action.payload.data
            })
            .addCase(getLocation.fulfilled,(state:any,action:PayloadAction<any>)=>{
                if(action.payload.status)
                {
                    const location:any = action.payload.response.data.locationservice.filter((e:any)=>e.data.qbenchCustomerId===state.locationId)[0] ?? '';
                    state.form = {...state.form,location:location ? location.data : ''}
                }
                
            })
            .addCase(getPostalcodesThunk.fulfilled,(state:any,action:PayloadAction<any>)=>{
                state.form = {...state.form, county:action?.payload?.response?.data?.result[0]?.County ?? ''};
            })
            .addCase(createAppointment.fulfilled,(state:any,action:PayloadAction<any>)=>{
                if(action.payload.status){
                    if(action.payload?.response?.data?.result?.acknowledgementId)
                    {
                        state.appointment.ack = action.payload?.response?.data?.result?.acknowledgementId;
                        state.appointment.conf = action.payload?.response?.data?.result?.confirmationId;
                    }
                    else
                        state.appointment.ack = "error";
                }else{
                    state.appointment.ack = "error";
                }
                state.appointment.process = false;
                
            })
	},
});
export const { updateForm, setModal, setOTPSending, setOtp, validateOTP, setSubmit, handleSubmit, handleDilogModal, updateSubscriberName } = counterSlice.actions;

export default counterSlice.reducer;
