<template>
  <div>
    <header class="mint-header">
      <div class="mint-header-button is-left"><a href="#/" class="router-link-active">
        <button class="mint-button mint-button--default mint-button--normal"><span class="mint-button-icon"><i
          class="mintui mintui-back"></i></span> <label class="mint-button-text">用户</label></button>
      </a></div>
      <h1 class="mint-header-title">
        <button class="mint-button" :class="{active:active==1}">订单信息</button>
        <button class="mint-button" :class="{active:active==2}">OA信息</button>
      </h1>
      <div class="mint-header-button is-right">
        <button class="mint-button" @click="clickSearch"><span class="el-icon-search"></span>
        </button>
      </div>
    </header>

    <transition name="move">
      <div v-show="searchClicked" class="search-dialog">
        <el-row :gutter="40" class="form-row">
          <el-col :span="6" class="form-col">
            <span class="lable">合同号：</span>
            <el-input type="text" v-model="postForm.hth"></el-input>
          </el-col>
          <el-col :span="6" class="form-col">
            <span class="lable">po：</span>
            <el-input type="text" v-model="postForm.po"></el-input>
          </el-col>
          <el-col :span="6" class="form-col">
            <span class="lable">款式：</span>
            <el-input type="text" v-model="postForm.ks"></el-input>
          </el-col>
          <el-col :span="6" class="form-col">
            <span class="lable">工厂：</span>
            <el-input type="text" v-model="postForm.gc"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="form-row" style="margin-top: 10px;">
          <el-col :span="16" class="form-col">
            <span class="lable">IH/日期：</span>
            <el-input @focus="openPicker(1)"
                      v-model="postForm.ihdate1"
                      placeholder="开始日期"></el-input>
            <span style="line-height: 40px;">&nbsp; to &nbsp; </span>
            <el-input @focus="openPicker(2)"
                      v-model="postForm.ihdate2"
                      placeholder="结束日期"></el-input>
          </el-col>
          <el-col :span="5" class="form-col">
            <el-button type="primary" style="width: 100%;">查 &nbsp;询</el-button>
          </el-col>
        </el-row>
      </div>
    </transition>

    <mt-loadmore
      :top-method="loadTop"
      ref="loadmore"
      @top-status-change="handleTopChange"
      :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
    >

      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="hth"
          label="合同号"
        >
        </el-table-column>
        <el-table-column
          prop="po"
          label="po"
        >
        </el-table-column>
        <el-table-column
          prop="ihdate"
          label="IH/日期"
        >
        </el-table-column>
        <el-table-column
          prop="ihdate"
          label="IH/日期"
        >
        </el-table-column>
        <el-table-column
          prop="khmc"
          label="客户名称"
        >
        </el-table-column>
        <el-table-column
          prop="gc"
          label="工厂"
        >
        </el-table-column>
        <el-table-column
          prop="jgsl"
          label="加工数量"
        >
        </el-table-column>
        <el-table-column
          prop="scgd"
          label="生产跟单"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>

    </mt-loadmore>

    <el-dialog
      :width="isPhone?'100%':'40%'"
      :visible.sync="jumpDialog"
      title="选择类型"
      :center="true"
    >
      <div slot="title" class="dialog-title">
        <span class="dialog-icon el-icon-circle-plus" ></span>
        <span>选择类型</span>
        </div>
      <div class="jump-wrap">
        <p>
          <router-link :to="{name:'step1'}">
            <div class="jump-div">
              <span>早期订单第1次</span>
              <span class="jump-status">未完成&nbsp;&nbsp;<i class="el-icon-arrow-right"></i></span>
            </div>
          </router-link>
        </p>
        <p>
          <router-link :to="{name:'step2'}">
            <div class="jump-div">
              <span>中期订单第1次</span>
              <span class="jump-status">未完成&nbsp;&nbsp;<i class="el-icon-arrow-right"></i></span>
            </div>
          </router-link>
        </p>
        <p>
          <router-link :to="{name:'step3'}">
            <div class="jump-div">
              <span>晚期订单第1次</span>
              <span class="jump-status">未完成&nbsp;&nbsp;<i class="el-icon-arrow-right"></i></span>
            </div>
          </router-link>
        </p>
      </div>
    </el-dialog>

    <mt-datetime-picker
      ref="picker1"
      type="date"
      v-model="ihdate1"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm1"
    >
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="picker2"
      type="date"
      v-model="ihdate2"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm2"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'page-index',
    components: {},
    data() {
      return {
        active: 1,   //点击切换tab
        topStatus: '',  //上拉刷状态
        allLoaded: false,  //下拉加载到最后一页
        jumpDialog:false, // 跳转弹框
        searchClicked: false,  //控制搜索菜单可见
        postForm: {
          hth: "",
          po: "",
          ks: "",
          gc: "",
          ihdate1: '',
          ihdate2: '',
        },
        tableData: [
          {
            "hth": "JDM1123",
            "po": "032218",
            "ks": "MD825689",
            "ihdate": "2018-03-03",
            khmc: 'create init vv',
            gc: '山东另一制造',
            jgsl: '99889',
            scgd: 'grandlan'
          },
          {
            "hth": "JDM1123",
            "po": "032218",
            "ks": "MD825689",
            "ihdate": "2018-03-03",
            khmc: 'create init vv',
            gc: '山东另一制造',
            jgsl: '99889',
            scgd: 'grandlan'
          },
          {
            "hth": "JDM1123",
            "po": "032218",
            "ks": "MD825689",
            "ihdate": "2018-03-03",
            khmc: 'create init vv',
            gc: '山东另一制造',
            jgsl: '99889',
            scgd: 'grandlan'
          },
          {
            "hth": "JDM1123",
            "po": "032218",
            "ks": "MD825689",
            "ihdate": "2018-03-03",
            khmc: 'create init vv',
            gc: '山东另一制造',
            jgsl: '99889',
            scgd: 'grandlan'
          }
        ]
      }
    },
    created() {
      console.log(isPhone)
    },
    computed: {
      isPhone(){
        return isPhone;
      },
      ihdate1() {
        if (this.postForm.ihdate1 != '') {
          return new Date(this.postForm.ihdate1)
        } else {
          return new Date();
        }
      },
      ihdate2() {
        if (this.postForm.ihdate2 != '') {
          return new Date(this.postForm.ihdate2)
        } else {
          return new Date();
        }
      },
    },
    methods: {
      fetchData() {

      },
      loadTop() {
        // 加载更多数据
        this.$refs.loadmore.onTopLoaded();
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadBottom() {
        // 加载更多数据
        this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },

      clickSearch() {
        this.searchClicked = true;
      },
      openPicker(n) {
        let key = 'picker' + n;
        this.$refs[key].open();
      },
      handleConfirm1(time) {
        if (time) {
          this.postForm.ihdate1 = time.toLocaleDateString();
        }
      },
      handleConfirm2(time) {
        if (time) {
          this.postForm.ihdate2 = time.toLocaleDateString();
        }
      },
      handleClick(row){
        //todo
        console.log(row);
        this.jumpDialog=true;
      }
    }
  }

</script>

<style lang="less">
  @import "../assets/style/var";

  .mint-header-title {
    & > button {
      height: 80%;
      font-size: 1.2rem;
      background-color: transparent;
      color: #ffffff;
      border: none;
      &:active, &:focus {
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

  .move-enter-active, .move-leave-active {
    transition: all .8s;
  }

  .move-enter, .move-leave-to {
    opacity: 0;
    top: @header-height - 170px;
  }


  .dialog-title{
    position: relative;
    .dialog-icon{
      position: absolute;
      left:1rem;
      color:@theme;
    }
  }
  .jump-wrap{
    font-size: 1rem;
  }
  .jump-div{
    color: @mtxt;
    display: flex;
    justify-content: space-between;
    padding: .25rem 1rem;
    .jump-status{
      font-size: .8rem;
      
    }

  }


</style>
