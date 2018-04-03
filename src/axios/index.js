import axios from "axios"

axios.interceptors.request.use(config=>{

  return config;
},err=>{
  return Promise.reject(err);
})

axios.interceptors.response.use(
  response => {

  },
  error => {
    return Promise.reject(error.response.data)   //返回接口返回的错误信息
  });
