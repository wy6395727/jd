import Api from "../../axios/api"
import {MAL_FETCH} from "../types";
// import * as Types from "../types"

const state={
  maleList:[
    {
      titleName:"公单一",
      maleNumber:1234,
      maleStatus:"待处理",
      maleType:"产品体验类",
      maleLevle:"非常重要",
      estimatedTime:"2018/8/7之前",
      phoneNumber:18956001233,
      completionTime:"2018/01/01 10:20:20",
      updateTime:"2018/01/01 10:20:20",
      maleId:101
    },
    {
      titleName:"公单一",
      maleNumber:1234,
      maleStatus:"已处理",
      maleType:"产品体验类",
      maleLevle:"非常重要",
      estimatedTime:"2018/8/7之前",
      phoneNumber:18956001233,
      completionTime:"2018/01/01 10:20:20",
      updateTime:"2018/01/01 10:20:20",
      maleId:101
    },
  ]  //公单列表
}

const mutations={
  [MAL_FETCH]:(state,data)=>{
    state.maleList=data;
  }
}

const actions={
  async fetchMale(){
    //todo 抓取male数据

  }
}

export default {
  state,
  mutations,
  actions
}
