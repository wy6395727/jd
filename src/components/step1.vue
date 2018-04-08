<template>
  <div>
    <mt-header title="">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>

      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <company-title></company-title>

    <table class="c-table">
      <tr>
        <td>生产厂家</td>
        <td class="c-td">
          <mt-field v-model="pagedata.scgc"></mt-field>
        </td>
        <td>验货工厂</td>
        <td class="c-td">
          <mt-field v-model="pagedata.yhgc"></mt-field>
        </td>
        <td>船期</td>
        <td class="c-td">
          <mt-field v-model="pagedata.cq"></mt-field>
        </td>
        <td>数量</td>
        <td class="c-td">
          <mt-field v-model="pagedata.sl"></mt-field>
        </td>
      </tr>
      <tr>
        <td>客户</td>
        <td class="c-td">
          <mt-field v-model="pagedata.kh"></mt-field>
        </td>
        <td>款号</td>
        <td class="c-td">
          <mt-field v-model="pagedata.kuanh"></mt-field>
        </td>
        <td>Po</td>
        <td class="c-td">
          <mt-field v-model="pagedata.po"></mt-field>
        </td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td>款式描述</td>
        <td colspan="7">
          <mt-field v-model="pagedata.ms" type="textarea" rows="2"></mt-field>
        </td>
      </tr>
    </table>

    <table class="c-table">
      <tr>
        <td>工厂人数</td>
        <td class="c-td"></td>
        <td>上线日期</td>
        <td class="c-td"></td>
        <td>计划日产量</td>
        <td class="c-td"></td>
        <td>下线日期</td>
        <td class="c-td"></td>
      </tr>
    </table>

    <table-picture></table-picture>

    <table class="c-table">
      <tr>
        <td>评语</td>
        <td class="c-td">
          <mt-field v-model="pagedata.py" type="textarea"></mt-field>
        </td>
      </tr>
      <tr>
        <td>厂方签字</td>
        <td class="c-td c-td-draw">
          <div style="width:100%;height:2.5rem;text-align: left;"  @click="openDraw">
            <img v-if="drawImageUrl" :src="drawImageUrl" alt="" style="width:5rem;height:100%;">
          </div>
        </td>
      </tr>
      <tr>
        <td>验收员</td>
        <td class="c-td">
          <mt-field v-model="pagedata.ysy"></mt-field>
        </td>
      </tr>
    </table>

    <el-dialog
      :width="isPhone?'90%':'40%'"
      :visible.sync="popupVisible"
      :center="true"
      :close-on-click-modal="false"
      :lock-scroll="true"
    >
      <header slot="title" style="font-size: 2rem;">请在指定区域内签名</header>
      <draw @drawTable="drawTable"></draw>
    </el-dialog>
  </div>
</template>

<script>
import TablePicture from "./common/table-picture";
import CompanyTitle from "./common/company-title";
import Draw from "./common/draw";
export default {
  name: "step1",
  components:{TablePicture,CompanyTitle,Draw},
  data() {
    return {
      imageUrl: "",

      popupVisible:false,
      drawImageUrl:'',
      pagedata: {
        scgc: "山东摸摸厂胜场",
        yhgc: "大苏打藏",
        cq: "12geyue",
        sl: 123456,
        kh: "CATOafdhasfjdfasjhstjdstykdtyjdtykdtyjty",
        kuanh: "123Ip",
        po: 65544,
        ms:"sadkahguiew",

        py:"",
        ysy:""
      }
    };
  },
  created() {},
  computed: {
    isPhone(){
      return isPhone;
    },
  },
  methods: {
   openDraw(){
     console.log('draw')
    this.popupVisible=true;
   },
   drawTable(url){
    this.drawImageUrl=url;
    this.popupVisible=false;
   }
  }
};
</script>

<style lang="less">
@import "../assets/style/var";

.c-table {
  border-collapse: collapse;
  background-color: #fff;
  width: 100%;
  margin-bottom: 1rem;
  td {
    border: 1px solid #ddd;
    text-align: center;
    min-width: 5rem;
    line-height: 2rem;
  }
  td:not(.c-td) {
    min-width: 6rem;
  }

  //reset mint input
  .mint-cell {
    background-image: none;
    background-color:transparent;
  }
  .mint-cell-wrapper{
    background-image: none;
  }
  .mint-field-core {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

//reset
 .mint-popup-bottom{
    width:95%;
    bottom:3.3rem;
    border-radius: .8rem;
    background-color: #274236;
  }
</style>
