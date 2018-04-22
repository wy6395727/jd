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

  //添加中期、尾期報告
  AddQcReport(data) {
    return axios.post('/api/qcservice/AddQcReport', data);
  },

  //获取 前期報告
  GetQcReportQQInfo(data){
    return axios.post('/api/qcservice/GetQcReportQQInfo', data);
  },

  //获取 中期、尾期報告
  GetQcReportInfo(data){
    return axios.post('/api/qcservice/GetQcReportInfo', data);
  },

  //上传文件
  UpLoadImg(data) {
    return axios.post('/api/qcservice/UpLoadImg', data);
  },

  //根据查询条件获取已质检过的加工合同信息分页
  GetQCReportCountList(data) {
    return axios.post('/api/qcservice/GetQCReportCountList ', data);
  },

  Login(data){
    return axios.post('/api/qcservice/Login ', data);
  },
}
