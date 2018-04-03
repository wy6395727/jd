<template>
  <div>
    <header class="mint-header">
      <div class="mint-header-button is-left"><a href="#/" class="router-link-active">
        <button class="mint-button mint-button--default mint-button--normal"><span class="mint-button-icon"><i
          class="mintui mintui-back"></i></span> <label class="mint-button-text">用户</label></button>
      </a></div>
      <h1 class="mint-header-title">
        <button :class="{active:active==1}">订单信息</button>
        <button :class="{active:active==2}">OA信息</button>
      </h1>
      <div class="mint-header-button is-right">
        <button class="mint-button mint-button--default mint-button--normal"><span class="mint-button-icon">搜索</span>
          <label class="mint-button-text"></label></button>
      </div>
    </header>

    <v-table
      is-horizontal-resize
      style="width:100%;font-size: 0.8rem;"
      :columns="columns"
      :table-data="tableData"
      :show-vertical-border="false"
      @on-custom-comp="customCompFunc"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
    ></v-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  // 导入 css
  import 'vue-easytable/libs/themes-base/index.css'
  // 导入 table 组件 和分页组件
  import {VTable} from 'vue-easytable'

  export default {
    name: 'page-index',
    components: {'v-table': VTable},
    data() {
      return {
        active: 1,

        tableData: [
          {"hth": "JDM1123", "po": "032218", "ks": "MD825689", "ihdate": "2018-03-03",khmc:'create init vv',gc:'山东另一制造',jgsl:'99889',scgd:'grandlan'},
          {"hth": "JDM1123", "po": "032218", "ks": "MD825689", "ihdate": "2018-03-03",khmc:'create init vv',gc:'山东另一制造',jgsl:'99889',scgd:'grandlan'},
        ],
        columns: [
          {field: 'hth', title: '合同号', width: 100, titleAlign: 'center', columnAlign: 'center'},
          {field: 'po', title: 'po', width: 180, titleAlign: 'center', columnAlign: 'center'},
          {field: 'ks', title: '款式', width: 180, titleAlign: 'center', columnAlign: 'center'},
          {field: 'ihdate', title: 'IH/日期',  width: 180, titleAlign: 'center', columnAlign: 'left', isResize: true},
          {field: 'khmc', title: '客户名称', width: 180, titleAlign: 'center', columnAlign: 'left', isResize: true},
          {field: 'gc', title: '工厂',  width: 180, titleAlign: 'center', columnAlign: 'left', isResize: true},
          {field: 'jgsl', title: '加工数量',  width: 180, titleAlign: 'center', columnAlign: 'left', isResize: true},
          {field: 'scgd', title: '生产跟单', width: 180, titleAlign: 'center', columnAlign: 'left', isResize: true},
          {field: 'custome-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true}
        ]
      }
    },
    created() {

    },
    computed: {},
    methods: {
      customCompFunc(params) {
        console.log(params)
      }
    }
  }

  // 自定义列组件
  Vue.component('table-operation',{
    template:`<span>
        <a href="" @click.stop.prevent="update(rowData,index)">编辑</a>&nbsp;
        </span>`,
    props:{
      rowData:{
        type:Object
      },
      field:{
        type:String
      },
      index:{
        type:Number
      }
    },
    methods:{
      update(){

        // 参数根据业务场景随意构造
        let params = {type:'edit',index:this.index,rowData:this.rowData};
        this.$emit('on-custom-comp',params);
      },
    }
  })

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
</style>
