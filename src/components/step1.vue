<template>
  <div style="padding-bottom:60px;padding-top:75px;" >
    <mt-header 
    class="mt-header-fixed"
    title=""
    >
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
          <mt-field v-model="pagedata.FACTNAME"></mt-field>
        </td>
        <td>验货工厂</td>
        <td class="c-td">
          <mt-field v-model="pagedata.YHGC"></mt-field>
        </td>
        <td>船期</td>
        <td class="c-td">
          <mt-field v-model="pagedata.SHIPDATE"></mt-field>
        </td>
        <td>数量</td>
        <td class="c-td">
          <mt-field v-model="pagedata.QTY"></mt-field>
        </td>
      </tr>
      <tr>
        <td>客户</td>
        <td class="c-td">
          <mt-field v-model="pagedata.CUSTNAME"></mt-field>
        </td>
        <td>款号</td>
        <td class="c-td">
          <mt-field v-model="pagedata.STYLENO"></mt-field>
        </td>
        <td>Po</td>
        <td class="c-td">
          <mt-field v-model="pagedata.PO"></mt-field>
        </td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td>款式描述</td>
        <td colspan="7">
          <mt-field v-model="pagedata.REMARK" type="textarea" rows="2"></mt-field>
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

    <table-picture 
    ref="tablepicture"
    :QCITEM="QCITEM"
    ></table-picture>

    <table class="c-table">
      <tr>
        <td>评语</td>
        <td class="c-td">
          <mt-field v-model="pagedata.COMMENTS" type="textarea"></mt-field>
        </td>
      </tr>
      <tr>
        <td>厂方签字</td>
        <td class="c-td c-td-draw">
          <div style="width:100%;height:2.5rem;text-align: left;" @click="openDraw">
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

    <div class="submit-btn">
      <mt-button type="primary" @click="submitData">{{isModify?"已提交":"提交"}}</mt-button>
    </div>

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
    components: {TablePicture, CompanyTitle, Draw},
    data() {
      return {
//      "QCID":"",
//      "FACTNAME":"工厂名称",
//      "CONTRACTNO":"合同号",
//      "ORDERNO":"订单号",
//      "YHGC":"验货工厂",
//      "SHIPDATE":"船期",
//      "QTY":”数量”,
//    "CUSTNAME":"客户",
//      "STYLENO":"款号",
//      "PO":"PO",
//      "ZGJYJG":”整个检验结果  0-表示合格 1-表示不合格“,
//    "ADDTIME":”录入时间”,
//    "REMARK":"款式描述",
//      "PERSONQTY":"工厂人数",
//      "SXRQ":"上线日期",
//      "RCLQTY":"计划日产量",
//      "XXRQ":"下线日期",
//      "COMMENTS":"评语",
//      "ZJRQ":"质检日期",
//      "USERNAME":"验货员用户名",
//      "REALNAME":"验货员真实名",

        popupVisible: false,
        drawImageUrl: '',
        pagedata: {
          "FACTNAME": "",
          "CONTRACTNO": "",  //
          "ORDERNO": "", //
          "YHGC": "",
          "SHIPDATE": "",
          "QTY": "",
          "CUSTNAME": "",
          "STYLENO": "",
          "PO": "",
          REMARK:"",
          COMMENTS:"",
        },

        isModify:false,  //是修改的页面，需要掉接口拿数据
        QCITEM:[],
      };
    },
    created() {

      if(this.isModify){
        // todo 设置默认值；

      }
    },
    computed: {},
    methods: {
      async submitData(){
          //todo push data
        this.pagedata.QCITEM=this.$refs.tablepicture.imageUrls;
        let res=await Api.AddQcReportQQ(this.pagedata);
        if (resData.data.STATUS) {
          // this.$router.push({name:"home"})
        }
            
      },

      openDraw() {
        this.popupVisible = true;
      },
      drawTable(url) {
        this.drawImageUrl = url;
        this.popupVisible = false;
      }
    }
  };
</script>

<style lang="less">
@import "../assets/style/var";

//reset
.mint-popup-bottom {
  width: 95%;
  bottom: 3.3rem;
  border-radius: 0.8rem;
  background-color: #274236;
}
//end

.submit-btn{
  background-color: rgb(216, 220, 226);
  width:100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  padding: 10px;
  .mint-button{
    width:30%;
    height: 40px;
  }
}

  // .el-dialog__body{
  //   padding:0!important;
  // }
</style>
