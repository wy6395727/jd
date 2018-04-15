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
  //weijanyanguo  api/qcservice/GetSearchMakeContractList
  GetSearchMakeContractList(data) {
    return axios.post('/api/qcservice/GetSearchMakeContractList', data);
  },

  //以检验过得外发
  GetSearchQcReportContractList(data) {
    return axios.post('/api/qcservice/GetSearchQcReportContractList', data);
  },

  //添加前期報告
  AddQcReportQQ(data) {
    return axios.post('/api/qcservice/AddQcReportQQ', data);
  },

  //上传文件
  UpLoadImg(data) {
    return axios.post('/api/qcservice/UpLoadImg', data);
  },
}
