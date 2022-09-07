import axios from "axios"
import commonFunctionForApiResponse from "../commonFunctions"
import config  from "../config"
export const sendOtp = async(data:Object)=>{
    return await new Promise(async(resolve,reject)=>{
        await axios({
            url:config.baseURL+config.otpEndpoint.sendOtp,
            method:'post',
            data:{data}
        }).then(response=>commonFunctionForApiResponse(resolve,response)).catch(error=>{
            reject({status:false,response:error})
        })
    })
}
export const verifyOTP = async(data:Object)=>{
    return await new Promise(async(resolve,reject)=>{
        await axios({
            url:config.baseURL+config.otpEndpoint.validateOTP,
            method:'post',
            data:{data}
        }).then(response=>commonFunctionForApiResponse(resolve,response)).catch(error=>{
            reject({status:false,response:error})
        })
    })
}
