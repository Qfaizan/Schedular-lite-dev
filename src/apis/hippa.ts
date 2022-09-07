import axios from "axios"
import commonFunctionForApiResponse from "../commonFunctions"
import config from "../config"

export const getHippaContent = async(data:Object)=>{
    return await new Promise(async(resolve,reject)=>{
        await axios({
            url:config.baseURL+config.apiEndPoints.hippa.get,
            method:'post',
            data:{data}
        }).then(response=>commonFunctionForApiResponse(resolve,response)).catch(error=>{
            reject({status:false,response:error})
        })
    })
}