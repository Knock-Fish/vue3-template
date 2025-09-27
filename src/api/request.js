import axios from "axios"
import { ElMessage } from 'element-plus'
// 创建axios实例
const service = axios.create({
    baseURL:config.baseApi,
})
import config from "@/config"
service.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

service.interceptors.response.use(
(res)=>{
    const {code,data,msg} = res.data
    if(code === 200){
        return data
    }else{
        const NETWORK_ERROR = "网络错误……"
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})
function request(options){
    options.method = options.method || "get"
    // 关于get请求参数的调整
    if(options.method.toLowerCase() == "get"){
        options.params = options.data
    }
    // 对mock的开关做一个处理
    let isMock = config.mock;
    if(typeof options.mock !== "undefined"){
        isMock = options.mock
    }
    // 针对环境做一个处理
    if(config.env === "prod"){
        service.defaults.baseURL = config.baseApi
    }else{
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}
export default request