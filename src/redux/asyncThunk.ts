import { createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";
import APIs from "../apis";
import config from "../config";
import * as statusCodes from "../statusCodes";
import { formatPhoneNumber } from "../utils";
import { isValidEmail } from "../validation";

export const sendOtp = createAsyncThunk(
	config.otpEndpoint.sendOtp,
	async ({ type, data }: { type: string; data: string }) => {
		const reqBody = {
			email: type === "email" ? data : "",
			phone: type === "phone" ? formatPhoneNumber(data) : "",
		};
		try {
			const { status, response }: any = await APIs.sendOtp(reqBody);
			if (status && response.status === statusCodes.success && response?.data?.result?.status === statusCodes.success) return true;
			return false;
		} catch (error) {
			return false;
		}
	}
);
export const verifyOTP = createAsyncThunk(
	config.otpEndpoint.validateOTP,
	async ({ type, data, otp }: { type: string; data: string; otp: string }) => {
		const reqBody = {
			email: type === "email" ? data : "",
			phone: type === "phone" ? formatPhoneNumber(data,false) : "",
			otp: parseInt(otp),
		};
		try {
			const { status, response }: any = await APIs.verifyOTP(reqBody);
			if (status && response.status === statusCodes.success && response?.data?.result?.status === statusCodes.success) {
				return {
					status: true,
					data: { [type === "email" ? "isEmailVerified" : "isPhnVerified"]: true },
				};
			} else {
				return { status: false };
			}
		} catch (error) {
			return { status: false };
		}
	}
);
export const getHippaContent = createAsyncThunk(
	config.apiEndPoints.hippa.get,
	async (cPartnerID: string) => {
		try {
			const { status, response }: any = await APIs.getHippaContent({ cPartnerID });
			if (status && response.status === statusCodes.success) {
                if(cPartnerID==='WSL001'){
                    return response.data.result.data.filter((e: any) => e.testSelection === "general");
                }else{
                    return response.data.result.data;
                }
			} else {
				return [];
			}
		} catch (error) {
			return { status: [] };
		}
	}
);
export const getPaymentIntentId = createAsyncThunk(
	config.apiEndPoints.stripe.createPaymentIntent,
	async (data: Object) => {
		try {
			const { status, response }: any = await APIs.getPaymentIntentId(data);
			if (status && response.status === statusCodes.success) {
				return {
					status: true,
					data: {
						id: response.data.result.id,
						client_secret: response.data.result.client_secret,
						customer_id: response.data.result.customer,
					},
				};
			} else {
				return { status: false, data: { id: "", client_secret: "", customer_id: "" } };
			}
		} catch (error) {
			return { status: false, data: { id: "", client_secret: "", customer_id: "" } };
		}
	}
);
export const getLocation = createAsyncThunk(
	config.apiEndPoints.location.get,
	async () => {
		try {
			const { status, response }: any = await APIs.getLocation('');
			if (status && response.status === statusCodes.success) {
				return {status,response};
			} else {
				return {status,response};
			}
		} catch (error) {
            return {status:false,response:""};
		}
	}
);
export const getPostalcodesThunk = createAsyncThunk(
	config.apiEndPoints.Postalcodes.get,
	async (zipCode:any) => {
		try {
			const { status, response }: any = await APIs.getPostalcodes(zipCode);
			if (status && response.status === statusCodes.success) {
				return {status,response};
			} else {
				return {status,response};
			}
		} catch (error) {
            return {status:false,response:""};
		}
	}
);
export const createAppointment = createAsyncThunk(
	config.apiEndPoints.appointments.create,
	async (form:any) => {
		try {
			 const result = {
                ...form,
                "phone": formatPhoneNumber(form.phone),
                "sendMessagesAboutTestResults": false,
                "date": form?.date ? form.date : format(new Date(),config.dateFormat),
                "slot": {
                    "date":form?.slot?.date ? form.slot.date : format(new Date(),config.dateFormat),
                    "locationId": form?.location?.qbenchCustomerId,
                    "label": form?.slot?.label ? form.slot.label : format(new Date(),'hh:mm a'),
                    "period": 0
                },
                isWalkUpTest:true,
                "address": {
                    "address": form?.address ?? '',
                    "city": form?.city ?? '',
                    "county": form?.county ?? '',
                    "state": form?.state ?? '',
                    "zipCode": form?.zipCode ?? '',
                    "country":  form.country ?? ''
                },
                "isSchedularLite":true,
                "isExpressSameDayTest":form?.isExpress ?? false,
                "isRapidTest":form?.isRapid ?? false,
                "firstName":  form?.firstName ?? '',
                "lastName":  form?.lastName ?? '',
                "middleName": form?.middleName ?? '',
                "birthDate": format(new Date(form?.birthDate ?? ''),config.dateFormat),
                "isINTNameFormat": false,
                "hasMinors": false,
                "minors": [],
                "hasSymptoms": false,
                "symptoms": [],
                "email": 
                        ((form?.location?.schedularLite?.noOfEmailFields ?? 0)>1 || form?.location?.schedularLite?.allowUserToEnterDynamicEmails) && form?.emails?.length > 1 
                        ? 
                            form?.emails?.filter((e:any,index:number)=>(isValidEmail?.test(e) && index+1 <= form?.totalEmailCount))?.map((e:string)=>e.toLowerCase()).join(', ') ?? '' 
                        : 
                        form?.email?.toLowerCase() ?? '',
                "password": "",
                "hasConditions": false,
                "hadContact": false,
                "sex": form?.sex ?? '',
                "gender": null,
                "sexualOrientation": null,
                "race": form?.race ?? '',
                "ethnicity": form?.ethnicity ?? '',
                "isHACustomer": false,
                "insuranceForTesting": false,
                "departureDateAndTime": null,
                "isQbench":true,
                "insurance": {
                        "id": "",
                        "group": form?.group ?? '',
                        "subscriberFirstName": form?.subscriberFirstName ?? '',
                        "subscriberLastName": form?.subscriberLastName ?? '',
                        "insuranceId": form?.insuranceId,
                        "payerList": form?.payerList ?? '',
                        "frontCard": form?.insuranceBackCard,
                        "backCard": form?.insuranceFrontCard,
                        "insuranceFor":form?.insuranceFor ?? "i'm",
                        "policyHolderFirstName": form?.policyHolderFirstName ??"",
                        "policyHolderLastName":form?.policyHolderLastName ?? "",
                        "policyHolderbirthDate":format(new Date(form?.policyHolderbirthDate  ? form?.policyHolderbirthDate : form?.birthDate),config.dateFormat)
                },
                "guardian": null,
                "govtId": {
                    "id": "",
                    "email": form.email,
                    "frontCard": form?.govtIdFrontCard ?? '',
                    "backCard": form?.govtIdBackCard ?? '',
                    "createddate": ""
                },
                "registeringFor": "myself",
                "confirmPassword": "",
                "paymentIntentId": form?.paymentIntentId? form?.paymentIntentId:'general',
                "postCode": "",
                "hasAgreement": false,
                "hasMarketCommuni": false,
                "reservationId": "",
                "reservationCount": 1,
                "rescheduleReservationId": "",
                "testSelection": "general",
                "cPartnerID": form?.location?.cPartnerID ?? '',
                "district": "",
                "school": "",
                "studentID": "",
                "isNotHavePermanentAddress": form?.isNotHavePermanentAddress ?? false,
                "schoolTestFor": "",
                "higherCost": false,
                "commitToConfirm": true,
                "testReason": "",
                "vaccineType": "",
                "isVaccinated": "",
                "couponId": "",
                "promoCode": "",
                "discountAmount": 0,
                "signatureURL": "",
                "adminLogin": false,
                "customerId": "",
                "isNpDestination": false,
                "acknowledgementId": "",
                "airline": null,
                "refersion": null,
                "passportCountry": {
                    "value": "",
                    "label": ""
                },
                "passportNo": "",
                "remainderEmails": [],
                "isVerified": true,
                "Notification": false,
                "remainder": true,
            }
            delete result.DOB;
            delete result.availableForRecurstion;
            delete result.city;
            delete result.state;
            delete result.county;
            delete result.zipCode;
            delete result.subscriberFirstName;
            delete result.subscriberLastName;
            delete result.selectedTestType;
            delete result.price;
            delete result.policyHolderbirthDate;
            delete result.policyHolderFirstName;
            delete result.policyHolderLastName;
            delete result.insuranceId;
            delete result.insuranceFor;
            delete result.insuranceBackCard;
            delete result.insuranceFrontCard;
            delete result.insuranceForTesting;
            delete result.govtIdFrontCard;
            delete result.govtIdBackCard;
            delete result.govtId;
            delete result.govtId;
            const { status, response }: any = await APIs.createAppointment(result);
			if (status) {
				return {status,response};
			} else {
				return {status,response};
			}
		} catch (error) {
            return {status:false,response:""};
		}
	}
);
