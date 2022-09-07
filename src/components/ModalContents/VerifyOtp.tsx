import React from 'react'
import { setOtp } from '../../redux/formReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Input from '../../reUseableComponents/Input';
interface props{
    clicked:boolean;
}
const VerifyOtp:React.FC<props> = ({clicked }) => {
    const dispacth = useAppDispatch();
    const state = useAppSelector(state=>state);
    const {otp, error, loading}:any = state.form
  return (
    <div>
        <div className="my-5">
            <Input
                value={otp}
                error={(clicked && !otp) || error === loading}
                onChange={(e: any) => {
                    dispacth(setOtp(e.target.value));
                }}
                lable={'Enter OTP'}
                name="otp"
                required={true}
                type="number"
            />
        </div>
    </div>
  )
}

export default VerifyOtp