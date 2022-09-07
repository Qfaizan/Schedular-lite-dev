import React from 'react'
import { useAppSelector } from '../../redux/hooks';
import Consent from '../../reUseableComponents/Consent'
import Loader from '../../reUseableComponents/Loader';
interface props{
    Close:(data?:any)=>void;
}
const ConsentsDetails:React.FC<props> = ({Close }) => {
    const state = useAppSelector((state: any) => state);
    const { form, hippaConsent, } = state.form;
  return (
    hippaConsent.length ? 
    <Consent
        consentContent={hippaConsent.length ? hippaConsent[0] : []}
        formValues={form}
        setFormValues={() => { }}
        close={Close}
    />
    :
    <div className="first-letter:lex justify-center w-full flex items-center h-3/6">
        <Loader />{' '}
    </div>
  )
}

export default ConsentsDetails