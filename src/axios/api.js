import axios from "axios"

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// let axiosPostConfig = {
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   transformRequest: [function (data) {
//     // Do whatever you want to transform the data
//     let ret = ''
//     for (let it in data) {
//       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
//   }],
// }

export default {
  //获取报表列表
  GetSearchMakeContractList(data) {
    return axios.post('/api/GetSearchMakeContractList', data);
  },

  //上传文件
  UpLoadImg(data) {
    return axios.post('/api/GetSearchMakeContractList', data);
  },
}
