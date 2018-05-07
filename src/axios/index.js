import axios from "axios"
import {Toast} from "mint-ui"

axios.interceptors.request.use(config=>{
  return config;
},err=>{
  return Promise.reject(err);
})

axios.interceptors.response.use(
  response => {
    if(response.data.STATUS!=1){
      Toast({
        message: response.data.MESSAGE||"服务异常",
        position: 'top',
        duration: 5000
      });
    }
    return response
  },
  error => {
    return Promise.reject(error)   //返回接口返回的错误信息
  });
