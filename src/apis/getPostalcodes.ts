import axios from "axios"
import commonFunctionForApiResponse from "../commonFunctions"
import config from "../config"

export const getPostalcodes = async(data:any)=>{
    return await new Promise(async(resolve,reject)=>{
        await axios({
            url:config.baseURL+config.apiEndPoints.Postalcodes.get,
            method:'post',
            data:{data:parseInt(data)}
        }).then(response=>commonFunctionForApiResponse(resolve,response)).catch(error=>{
            reject({status:false,response:error})
        })
    })
}