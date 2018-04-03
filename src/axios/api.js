import axios from "axios"

let axiosPostConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }],
}

export default {
  //获取报表列表
  GetCustomReportList(data) {//
    return axios.post('/ReportManage/GetCustomReportList', data, axiosPostConfig)
  },
  //保存新报表
  SaveCustomReport(data) {//
    return axios.post('/ReportManage/SaveCustomReport', data, axiosPostConfig)
  },
  //修改一个报表
  UpdateCustomReport(data) {//
    return axios.post('/ReportManage/UpdateCustomReport', data, axiosPostConfig)
  },
  // 修改报表初始化参数
  RptUpdateInitParam(data) {
    return axios.post('/ReportManage/RptUpdateInitParam', data, axiosPostConfig)
  },
  //禁用一个报表
  RptUpdateStatus(data) {//
    return axios.post('/ReportManage/RptUpdateStatus', data, axiosPostConfig)
  },
  //获取报表显示字段
  GetRptDisplayFieldList(data) {
    return axios.get('/ReportManage/GetRptDisplayFieldList', data)
  },
  //获取分析字段
  GetBasicAnalysisFieldList(data) {
    return axios.get('/ReportManage/GetBasicAnalysisFieldList', data)
  },
  //报表类型
  GetReportTypeList(data) {//
    return axios.get('/ReportManage/GetReportTypeList', data)
  },
  //标签类型
  GetLabelTypeList(data) {//
    return axios.get('/ReportManage/GetLabelTypeList', data)
  },

  //检索报表
  SearchRptList(data) {//
    return axios.post('/ReportManage/SearchRptList', data, axiosPostConfig)
  },
  //收藏报表
  SaveCollectRpt(data) {//
    return axios.post('/ReportManage/SaveCollectRpt', data, axiosPostConfig)
  },
  //取消收藏报表
  CancelCollectRpt(data) {//
    return axios.post('/ReportManage/CancelCollectRpt', data, axiosPostConfig)
  },

  //根据用户获取用户收藏列表
  GetUserCollectRptList(data) {//
    return axios.post('/ReportManage/GetUserCollectRptList', data, axiosPostConfig)
  },

  // 根据组织代码获取考试
  GetExamList(data) {
    return axios.post('/ReportManage/GetExamList', data, axiosPostConfig)
  },

  // 根据用户获取组织代码
  GetRuCodeList(data) {
    return axios.post('/ReportManage/GetRuCodeList', data, axiosPostConfig)
  },

  // 获取报表模板的信息
  GetSingleCustomReport(data) {
    return axios.post('/ReportManage/GetSingleCustomReport', data, axiosPostConfig)
  },

  /// 获取考试单位
  GetExamUnit(data) {
    return axios.post('/ReportManage/GetExamUnit', data, axiosPostConfig)
  },

  /// 获取考试科目
  GetKms(data) {
  return axios.post('/ReportManage/GetKms', data, axiosPostConfig)
},

  /// 获取任务列表
  GetTaskList(data) {
    return axios.post('/ReportManage/GetTaskList', data, axiosPostConfig)
  },

  /// 保存规则
  SaveTask(data) {
  return axios.post('/ReportManage/SaveTask', data, axiosPostConfig)
},

  /// 取消任务
  CancelTask(data) {
  return axios.post('/ReportManage/CancelTask', data, axiosPostConfig)
},



  //登录相关
  loginIn(data) {//
    return axios.post('/Login', data, axiosPostConfig)
  },

  //
  uploadImage(url,data) {//
    return axios.post(url, data)
  }

}
