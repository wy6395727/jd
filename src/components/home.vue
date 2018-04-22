<template>
  <div>
    <header class="mint-header" style="padding: 0 1.5rem;">
      <div class="mint-header-button is-left">
        <button class="mint-button" @click="clickuser">
          <img src="../assets/imgs/user.png" alt=" " style="width: 1.5rem;">
        </button>
      </div>
      <h1 class="mint-header-title">
        <button class="mint-button" :class="{active:active==1}" @click="tabhandle(1)">订单信息</button>
        <button class="mint-button" :class="{active:active==2}" @click="tabhandle(2)">OA信息</button>

      </h1>
      <div class="mint-header-button is-right">
        <button class="mint-button" @click="clickSearch"><span class="el-icon-search" style="font-size: 1.5rem
        ;"></span>
        </button>
      </div>
    </header>

    <transition name="move">
      <div v-show="searchClicked" class="search-dialog">
        <el-row :gutter="40" class="form-row">
          <el-col :span="6" class="form-col">
            <span class="lable">合同号：</span>
            <el-input type="text" v-model="postForm.ContractNo"></el-input>
          </el-col>
          <el-col :span="6" class="form-col">
            <span class="lable">po：</span>
            <el-input type="text" v-model="postForm.PO"></el-input>
          </el-col>
          <el-col :span="6" class="form-col">
            <span class="lable">款式：</span>
            <el-input type="text" v-model="postForm.StyleNo"></el-input>
          </el-col>
          <el-col :span="6" class="form-col">
            <span class="lable">工厂：</span>
            <el-input type="text" v-model="postForm.FactoryID"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="form-row" style="margin-top: 10px;" :gutter="40">
          <el-col :span="14" class="form-col">
            <span class="lable">IH/日期：</span>
            <el-input @focus="openPicker(1)"
                      v-model="postForm.STARTDATE"
                      placeholder="开始日期"></el-input>
            <span style="line-height: 40px;">&nbsp; to &nbsp; </span>
            <el-input @focus="openPicker(2)"
                      v-model="postForm.ENDDATE"
                      placeholder="结束日期"></el-input>
          </el-col>
          <el-col :span="5">
            <el-button
              @click="searchHandle"
              type="primary" style="width: 100%;">查 &nbsp;询
            </el-button>
          </el-col>
          <el-col :span="5">
            <el-button
              @click="resetHandle"
              type="primary" style="width: 100%;">重 &nbsp;置
            </el-button>
          </el-col>
        </el-row>
      </div>
    </transition>

    <div class="loadmore-wrapper" @touchmove.stop="leavehandle">
      <mt-loadmore
        :top-method="loadTop"
        ref="loadmore"
        @top-status-change="handleTopChange"
        @bottom-status-change="handleBottomChange"
        :bottom-method="loadBottom"
        :auto-fill="false"
      >
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="ContractNo"
            label="合同号"
          >
          </el-table-column>
          <el-table-column
            prop="PO"
            label="po"
          >
          </el-table-column>
          <el-table-column
            prop="StyleNo"
            label="款式"
          >
          </el-table-column>
          <el-table-column
            prop="IHDate"
            label="IH/日期"
          >
          </el-table-column>
          <el-table-column
            prop="CustName"
            label="客户名称"
          >
          </el-table-column>
          <el-table-column
            prop="FactName"
            label="工厂"
          >
          </el-table-column>
          <el-table-column
            prop="TotalQty"
            label="加工数量"
          >
          </el-table-column>
          <el-table-column
            prop="GenDanName"
            label="生产跟单"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
          >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'">
            <span>下拉刷新</span>
            <span :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          </span>
          <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake" color="#26a2ff"></mt-spinner>
          </span>
        </div>

        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake" color="#26a2ff"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
      <div class="no-more-c" v-if="allLoaded">
        没有更多了..
      </div>
    </div>

    <el-dialog
      :fullscreen="isPhone"
      :visible.sync="jumpDialog"
      title="选择类型"
      :center="true"
    >
      <div slot="title" class="dialog-title">
        <span
          @click="addList"
          v-show="active==2"
          class="dialog-icon el-icon-circle-plus"></span>
        <span>选择类型</span>
      </div>
      <div class="jump-wrap">
        <p v-for="countItem in countList" :key="countItem.key">
          <router-link
            :to="{name:countItem.NAME==0?'step1':'step2',query:{data:toJson(countItem),info:toJson(currentRow)}}">
            <div class="jump-div" :style="{color:countItem.STATUS==1 ? '#67C23A':'#F56C6C'}">
              <span>{{countItem.NAME | toName}}订单第{{countItem.CNT}}次</span>
              <span class="jump-status">{{countItem.STATUS == 0 ? '未' : '已'}}完成&nbsp;&nbsp;<i
                class="el-icon-arrow-right"></i></span>
            </div>
          </router-link>
        </p>
      </div>
    </el-dialog>

    <mt-popup
      v-model="userinfo"
      position="left"
      popup-transition="popup-fade">
      <div style="width:40vw;height:100vh;">
        <div>
          <img src="../assets/imgs/timg.jpg" alt="" style="width: 100%;">
        </div>
        <mt-cell title="员工编号">{{ID}}</mt-cell>
        <mt-cell title="姓名">{{realname}}</mt-cell>
        <mt-cell title="性别">男</mt-cell>
        <mt-cell title="账号">{{username}}</mt-cell>
        <mt-cell title="入职时间">2016.01.01</mt-cell>
        <div style="text-align: center;">
          <mt-button type="primary" style="width:60%;margin-top: 2rem
        ;" @click="loginout">退出登录
          </mt-button>
        </div>
      </div>
    </mt-popup>

    <mt-datetime-picker
      ref="picker1"
      type="date"
      v-model="STARTDATE"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm1"
    >
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="picker2"
      type="date"
      v-model="ENDDATE"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm2"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import Vue from "vue";
  import Api from "../axios/api";
  import {Indicator} from "mint-ui";
  import { mapState } from 'vuex'

  var self = "";
  export default {
    name: "page-index",
    components: {},
    data() {
      return {
        userinfo: false,  //显示 用户信息
        active: 1, //点击切换tab  1 订单星系， 2 OA星系

        topStatus: "", //上拉刷状态
        bottomStatus: "", //上拉刷状态
        allLoaded: false, //下拉加载到最后一页
        jumpDialog: false, // 跳转弹框
        searchClicked: false, //控制搜索菜单可见
        countList: [  //前期中期后期列表
//        {
//          NAME:"前期",
//          CNT:1,
//          QCID:"",
//          CONTRACTNO:'',
//          STATUS:0,  //0 wei完成  1 已完成
//        },
//        {
//          NAME:"中期",
//          CNT:1,
//          QCID:"",
//          CONTRACTNO:'',
//          STATUS:0,
//        },
//        {
//          NAME:"后期",
//          CNT:1,
//          QCID:"",
//          CONTRACTNO:'',
//          STATUS:0,
//        }
        ],
        currentRow: {},  // 当前编辑的行
        total: 0, //数据总量
        postForm: {
          PO: "",
          StyleNo: "", //"款号",
          FactoryID: "", //"工厂ID",
          ContractNo: "", //"加工合同",
          STARTDATE: "", //起始日期
          ENDDATE: "", //结束日期
          PageSize: 10,
          PageIndex: 1
        },
        tableData: []
      };
    },
    created() {
      self = this;

      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.fetchData({isMore: false}).then(() => {
        Indicator.close();
      });
    },
    computed: {
      STARTDATE() {
        if (this.postForm.STARTDATE != "") {
          return new Date(this.postForm.STARTDATE);
        } else {
          return new Date();
        }
      },
      ENDDATE() {
        if (this.postForm.ENDDATE != "") {
          return new Date(this.postForm.ENDDATE);
        } else {
          return new Date();
        }
      },
      ...mapState({
        username: state => state.user.username,
        realname: state => state.user.realname,
        ID: state => state.user.ID,
      })
    },
    filters: {
      toName(value) {
        if (value == 0) {
          return "前期"
        } else if (value == 1) {
          return "中期"
        } else if (value == 2) {
          return "尾期"
        } else {
          return ""
        }
      }
    },
    methods: {
      async fetchData({isMore = false}) {
//      ismore 下拉true ，刷新false
        let resData;
        if (this.active == 1) {
          resData = await Api.GetSearchMakeContractList(this.postForm);
        } else {
          resData = await Api.GetSearchQcReportContractList(this.postForm);
        }
        if (resData.data.STATUS) {
          if (isMore) {
            resData.data.DATAOBJ.ITEM.forEach(item => {
              this.tableData.push(item);
            });
          } else {
            this.tableData = resData.data.DATAOBJ.ITEM;
          }
          this.total = resData.data.DATAOBJ.TOTAL;
          console.log(this.tableData);
          console.log(this.total);
        }
        return;
      },
      toJson(obj) {
        return JSON.stringify(obj);
      },
      tabhandle(active) {
        this.active = active;
        this.searchClicked = false;
        this.resetHandle();

        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        this.fetchData({isMore: false}).then(res => {
          Indicator.close();
        });
      },
      loadTop() {
        // 下拉刷新
        this.postForm.PageIndex = 1;
        this.fetchData({isMore: false});
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        // 加载更多数据
        if (this.tableData.length < this.total) {
          this.postForm.PageIndex += 1;
          this.fetchData({isMore: true});
        } else {
          this.allLoaded = true; // 若数据已全部获取完毕
        }
        //        this.$refs.loadmore.onBottomLoaded();
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },

      clickSearch() {
        this.searchClicked = !this.searchClicked;
      },
      searchHandle() {
        this.postForm.PageIndex = 1;
        this.fetchData({isMore: false}).then(res=>{
          this.searchClicked=false;
        });
      },
      resetHandle() {
        this.postForm.PO = "";
        this.postForm.StyleNo = "";
        this.postForm.FactoryID = "";
        this.postForm.ContractNo = "";
        this.postForm.STARTDATE = "";
        this.postForm.ENDDATE = "";
        this.postForm.PageSize = 10;
        this.postForm.PageIndex = 1;
      },
      openPicker(n) {
        let key = "picker" + n;
        this.$refs[key].open();
      },
      handleConfirm1(time) {
        if (time) {
          this.postForm.STARTDATE = time.toLocaleDateString().replace(/\//g,"-");
        }
      },
      handleConfirm2(time) {
        if (time) {
          this.postForm.ENDDATE = time.toLocaleDateString().replace(/\//g,"-");
        }
      },
      leavehandle(e) {
        //  一旦滚动了table 关闭检索框
        this.searchClicked = false;
      },

      handleClick(row) {  //跳转弹框
        this.currentRow = row;
        if (this.active == 2) {
          // oa信息
          Api.GetQCReportCountList({CONTRACTNO: row.ContractNo}).then(resData => {
            if (resData.data.STATUS) {
              self.countList = resData.data.DATAOBJ;
              this.jumpDialog = true;
            }
          });
        } else {
          //  订单信息
          this.countList = this.resetCountList(row);
          this.jumpDialog = true;
        }
      },
      resetCountList(row) {
        return [  //前期中期后期列表
          {
            NAME: 0,
            CNT: 1,
            QCID: "",
            CONTRACTNO: row.ContractNo,
            STATUS: 0,  //0 wei完成  1 已完成
          },
          {
            NAME: 1,
            CNT: 1,
            QCID: "",
            CONTRACTNO: row.ContractNo,
            STATUS: 0,
          },
          {
            NAME: 2,
            CNT: 1,
            QCID: "",
            CONTRACTNO: row.ContractNo,
            STATUS: 0,
          }
        ]
      },

      clickuser() {
        this.userinfo = true;
      },
      loginout() {
        this.userinfo = false;
        this.$store.commit("LOGIN_OUT");
        this.$router.push({name:"login"});
      },

      addList() {
        let cnt = 1, name = 1, i = 1;  //完成的次数，默认中期, ,下标1

        this.countList.forEach((item, index) => {
          if (item.NAME == 2 && item.STATUS == 1) {
            // 添加尾期
              cnt = item.CNT;
              name = 2;
              i = index;
          }
          if(item.NAME == 1 && item.STATUS == 1) {
            // 添加中期
              cnt = item.CNT;
              name = 1;
              i = index;
          }
        });
        cnt+=1;
        i+=1;
        this.countList.splice(i, 0, {
          NAME: name,
          CNT: cnt,
          QCID: "",
          CONTRACTNO: this.currentRow.ContractNo,
          STATUS: 0,
        });
        console.log("几次"+cnt,"期数"+name,"索引"+i)
      }
    }
  };
</script>

<style lang="less">
  @import "../assets/style/var";

  .mint-header-title {
    & > button {
      box-sizing: border-box;
      height: 80%;
      font-size: 1.2rem;
      background-color: transparent;
      color: #ffffff;
      border: none;
      &.active {
        border-bottom: 4px solid #ffffff;
      }
    }
  }

  .search-dialog {
    position: absolute;
    top: @header-height;
    left: 0px;
    z-index: 2000;
    background-color: #fff;
    padding: 15px;
    border-bottom: 1px solid #eeeeee;
  }

  .form-row {
    text-align: left;
    padding-right: 10px;
    .form-col {
      display: flex;
    }
    .lable {
      /*width: 100px;*/
      line-height: 40px;
    }
    .el-input {
      /*display: inline-block;*/
      flex: 1;
    }
  }

  .move-enter-active,
  .move-leave-active {
    transition: all 0.5s;
    transform-origin: 100% 50%;
  }

  .move-enter,
  .move-leave-to {
    opacity: 0;
    top: 0;
    transform: scale(0.3, 0.5);
  }

  .dialog-title {
    position: relative;
    .dialog-icon {
      position: absolute;
      left: 1rem;
      color: @theme;
    }
  }

  .jump-wrap {
    font-size: 1rem;
  }

  .jump-div {
    color: @mtxt;
    border-bottom: 1px solid @bor2;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    .jump-status {
      font-size: 0.8rem;
    }
  }

  .loadmore-wrapper {
    height: calc(~"100vh - " @header-height);
    overflow: scroll;
  }

  .mint-loadmore-top,
  .mint-loadmore-bottom {
    span {
      display: inline-block;
      vertical-align: middle;

      &.rotate {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
        -webkit-transition: 0.2s linear;
        transition: 0.2s linear;
      }
    }
  }

  .no-more-c {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    color: @ctxt;
  }
</style>
