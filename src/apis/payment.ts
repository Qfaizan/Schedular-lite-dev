import axios from "axios"
import commonFunctionForApiResponse from "../commonFunctions"
import config from "../config"

export const getPaymentIntentId = async(data:Object)=>{
    return await new Promise(async(resolve,reject)=>{
        await axios({
            url:config.baseURL + config.apiEndPoints.stripe.createPaymentIntent,
            method:'post',
            data:{data}
        }).then(response=>commonFunctionForApiResponse(resolve,response)).catch(error=>{
            reject({status:false,response:error})
        })
    })
}