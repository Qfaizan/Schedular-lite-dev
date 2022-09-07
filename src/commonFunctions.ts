/* eslint-disable import/no-anonymous-default-export */
import { addDays, format, isAfter, isBefore, isEqual } from "date-fns"
import config from "./config"
import * as statusCodes from "./statusCodes"
import { address, Insurance, moreDetails, policyHolder } from "./utils"
import { isValidEmail } from "./validation"

export default (resolve: any, response: any) =>
{
    if (response.status < statusCodes.generalSuccessMessages)
        resolve({ status: true, response })

    else
        resolve({ status: false, response })
}
export const getUpcommingDatefromWeek = (week:any) => {
    let date = new Date()
    if(week?.toLowerCase() === format(date,'cccc')?.toLowerCase())
        return format(date, 'LL/dd/yyyy')
    let i = 0;
    while(i++<8){
        date = addDays(date,1);
        if(week?.toLowerCase() === format(date,'cccc').toLowerCase())
            break;
    }
    return format(date,'LL/dd/yyyy');
}
export const isValidateDate = (date?:string):boolean => {
    try {        
        if(!date)
            return false;
        if(date.length < 10)
            return false;
        const dateOBJ = new Date(date ?? null);
        if(parseInt(date?.split('/')?.[2] ?? '0') >= 1900)
        {
            if( 
                (
                        isEqual( new Date(format(new Date(),config.dateFormat))  ,new Date(format(dateOBJ,config.dateFormat))) 
                    || 
                        isAfter(new Date(format(new Date(),config.dateFormat)),new Date(format(dateOBJ,config.dateFormat)))
                )
                &&
                        isBefore(new Date(format(new Date('01/01/1900'),config.dateFormat)),new Date(format(dateOBJ,config.dateFormat)))
            )
                return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

export const validateForm = (form:any, skipTermsAndCondition=false)=>{
    const Emails = form.emails.map((e:string|any)=>e?.toLowerCase())
    if(
            form.testType 
            && ((skipTermsAndCondition || form?.location?.schedularLite?.hippaInfo === 'Disable') ? true : form.termsAndConditions)
            && form?.phone?.length>=10 
            && form.isAddress 
            && form.firstName 
            && form.lastName 
            && form.payingMethod
            && (form.location.schedularLite.verification.phone ? form.isPhnVerified : true) 
            && (form.location.schedularLite.verification.email && form?.totalEmailCount===1 ? form.isEmailVerified : true)
            && (form.totalEmailCount > 1 ? form.emails.filter((e:string)=>e && isValidEmail.test(e)).length > 1 && form.emails.filter((item:string, index:number) => Emails.indexOf(item?.toLowerCase()) !== index).length === 0 : true ) 
            && (((form?.totalEmailCount ?? 1)>1) ? (form?.emails?.length===form.totalEmailCount && form?.emails?.every((e:any, index:number) =>(e && isValidEmail.test(e) && index+1<=form.totalEmailCount) || index+1 > form?.totalEmailCount)) : isValidEmail.test(form?.email ?? '') ) 
            && isValidateDate(form?.birthDate)
            && (moreDetails.filter((e:any)=>form?.location?.schedularLite?.moreDetails?.[e.name]).length > 0 
               ? 
               moreDetails.filter((e:any)=>form?.location?.schedularLite?.moreDetails?.[e.name]).every((e:any)=>form?.[e?.name]) : true)
        )
        {
            return true;
        }

    return false;
}

export const handleValidate = (form:any, termsAndConditions=false) =>{
    const Emails = form.emails.map((e:string|any)=>e?.toLowerCase())
    let data = 'Please Fill out All the Required Fields, ';
    if(form.totalEmailCount > 1 ? (form.emails.filter((e:string)=>e && isValidEmail.test(e))?.length !== form.totalEmailCount) : false ) data+=`All ${form.totalEmailCount} Email Fields are Required, `;
    if(form.totalEmailCount > 1 ? form.emails.filter((item:string, index:number) => Emails.indexOf(item.toLowerCase()) !== index).length > 0 : false) data+="Duplicate Emails Are Not Allowed, ";
    if(!form.location.schedularLite.verification.phone && !(form?.phone?.length>=10) ) data+='Please Enter Valid Phone Number, ';
    if((!form.location.schedularLite.verification.email && form.totalEmailCount===1) && !(isValidEmail.test(form?.email))) data+='Please Enter Valid Email, ';
    if(!(form.location.schedularLite.verification.phone ? form.isPhnVerified : true)) data+='Please Verify Phone Number, ';
    if(!(form.location.schedularLite.verification.email && form?.totalEmailCount===1 ? form.isEmailVerified : true)) data+='Please Verify Email, ';
    if(!form.firstName) data+='Please Enter First Name, '
    if(!form.lastName) data+='Please Enter Last Name, , '
    moreDetails.filter((e:any)=>form?.location?.schedularLite?.moreDetails?.[e.name] && !form[e.name]).map(e=>data+=`Please ${e?.list ? 'Select':'Enter'} ${e.label} Field, `)
    if(!isValidateDate(form?.birthDate))data+= "Please Enter Valid Date of Birth, "
    if(!form.isAddress)
        data += 'Please Provide your Address, '
    if(!form.payingMethod)
        data +=(form.location.schedularLite.payment.insurance && form.location.schedularLite.payment.credit) ?
                'Please Select Payment Method, '
                :
                (form.location.schedularLite.payment.insurance ? 'Please Enter Insurance Details, ' : form.location.schedularLite.payment.credit ? 'Please Enter Creadit Card Details, ' : 'Payment Method is not Enabled for this Location, Please Contact Admin, ')
    if(!form.testType)
        data +='Test Type is Missing, '
    if(termsAndConditions)
    {
        if(!form.termsAndConditions && form?.location?.schedularLite?.hippaInfo !== 'Disable')
            data +='Need to Agree our Terms and Conditions, '
    }
    return data;
}
export const allTestTypesPresent = (form:any)=>{
    if(form?.location)
    {
        if(form.location.schedularLite?.testTypes?.filter((e:any)=>e.hidden).length === 4)
            return true;
        if(form.location.schedularLite?.testTypes?.filter((e:any)=>e.disabled).length === 4)
            return true;
        return false;
    }
    return false;
}

export const validateOnCancelModal = (form:any, type:any, dispacth:any, updateForm:any)=>{
    if(type === 'address' && form.isAddress)
    {
        dispacth(updateForm({isAddress:address.every(e=>form[e.name])}))
    }
    else if(type === 'insurance' && form?.payingMethod)
    {
        const isInvalid = !Insurance.every(e=>!e.required || form[e.name]); 
        if(form?.insuranceFor === "i'm" && isInvalid)
        {
            dispacth(updateForm({
                "hasInsurance": false,
                "payingMethod": "",
            }))
        }
        else if(form?.insuranceFor !== "i'm" && (isInvalid || !policyHolder.every(e=>form[e.name])))
        {
            dispacth(updateForm({
                "hasInsurance": false,
                "payingMethod": "",
            }))

        }
    }
}