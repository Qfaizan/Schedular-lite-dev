import { isValidEmail } from "../../validation";


export const isErrorField = (submit:boolean, field:string, form:any, error:string, singleEmail:boolean=true, indexValueForMultipleEmails:number=-1) =>{
    if(submit && field === 'email') // check Form is Submited or not
    {
        if(singleEmail)
        {
            if(error === field)
                return true
            if(field === 'email' && (form?.location?.schedularLite?.verification?.email && form.totalEmailCount === 1) ? !form.isEmailVerified : !isValidEmail.test(form[field]))
                return true;
        }
        else 
        return !isValidEmail.test(form?.emails?.[indexValueForMultipleEmails] ?? '')
    }
    if(submit && field === 'phone') // check Form is Submited or not
    {
        if(error === field)
            return true
        if(field === 'phone' && (form?.location?.schedularLite?.verification?.phone ? !form?.isPhnVerified : (form[field]?.length < 10) ))
            return true;
    }
    return false;
}


export const isDisabledPhoneAndEmail = (form:any, otpSending:boolean, type:boolean, name:string) =>{
    if(otpSending && type ) // If Email Sending or Phone Number Sending
        return true;
    if(form?.isPhnVerified && name === 'phone' ) // if Phone Verified
        return true; 
    if(form?.isValidEmail && name === 'email' )
        return true;
    return false;
}

export const disabledButton = (form:any, type:string, otpSending:boolean,loading:boolean) => {
    if(otpSending && loading ) // If Email Sending or Phone Number Sending
        return true;
    if(type==='phone' && form[type].length<10)
        return true;
    if(type==='email' && !isValidEmail.test(form[type]))
        return true;   
    return false
}