<template>
  <div class="step-page">
    <mt-header class="mt-header-fixed" title="前期订单详情">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <company-title>
      <span slot="txt">前期</span>
    </company-title>

    <table class="c-table">
      <tr>
        <td>生产厂家</td>
        <td class="c-td">
          <span class="c-td-span">{{pagedata.FACTNAME}}</span>
        </td>
        <td>验货工厂</td>
        <td class="c-td">
          <mt-field :disabled="isDisable" v-model="pagedata.YHGC"></mt-field>
        </td>
        <td>船期</td>
        <td class="c-td">
          <span class="c-td-span">{{pagedata.SHIPDATE}}</span>
        </td>
        <td>数量</td>
        <td class="c-td">
          <span class="c-td-span">{{pagedata.QTY}}</span>
        </td>
      </tr>
      <tr>
        <td>客户</td>
        <td class="c-td">
          <span class="c-td-span">{{pagedata.CUSTNAME}}</span>
        </td>
        <td>款号</td>
        <td class="c-td">
          <span class="c-td-span">{{pagedata.STYLENO}}</span>
        </td>
        <td>Po</td>
        <td class="c-td">
          <span class="c-td-span">{{pagedata.PO}}</span>
        </td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td>款式描述</td>
        <td colspan="7">
          <mt-field :disabled="isDisable" v-model="pagedata.REMARK" type="textarea" rows="2"></mt-field>
        </td>
      </tr>
    </table>

    <table class="c-table">
      <tr>
        <td>工厂人数</td>
        <td class="c-td">
          <mt-field :disabled="isDisable" v-model="pagedata.PERSONQTY" type="number"></mt-field>
        </td>
        <td>上线日期</td>
        <td class="c-td">
          <!--<mt-field v-model="pagedata.SXRQ"></mt-field>-->
          <el-input :disabled="isDisable" @focus="openPicker('SXRQ')"
                    v-model="pagedata.SXRQ"
          ></el-input>
        </td>
        <td>计划日产量</td>
        <td class="c-td">
          <mt-field :disabled="isDisable" v-model="pagedata.RCLQTY" type="number"></mt-field>
        </td>
        <td>下线日期</td>
        <td class="c-td">
          <!--<mt-field v-model="pagedata.XXRQ"></mt-field>-->
          <el-input :disabled="isDisable" @focus="openPicker('XXRQ')"
                    v-model="pagedata.XXRQ"
          ></el-input>
        </td>
      </tr>
    </table>

    <table-picture
      ref="tablepicture"
      :QCITEM="QCITEM"
      :isDisable="isDisable"
    ></table-picture>

    <table class="c-table">
      <tr>
        <td>评语</td>
        <td class="c-td">
          <mt-field :disabled="isDisable" v-model="pagedata.COMMENTS" type="textarea"></mt-field>
        </td>
      </tr>
      <tr>
        <td>厂方签字</td>
        <td class="c-td c-td-draw">
          <div style="width:100%;height:2.5rem;text-align: left;" @click="openDraw">
            <img v-if="pagedata.QNAME" :src="pagedata.QNAME" alt="" style="width:5rem;height:100%;">
          </div>
        </td>
      </tr>
      <tr>
        <td>验收员</td>
        <td class="c-td">
          <mt-field :disabled="isDisable" v-model="pagedata.REALNAME"></mt-field>
        </td>
      </tr>
    </table>

    <div class="submit-btn">
      <mt-button type="primary" :disabled="isDisable" @click="submitData">{{STATUS ? "已提交" : "提交"}}</mt-button>
    </div>

    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="datetime"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
    >
    </mt-datetime-picker>

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
  import Api from "@/axios/api";

  export default {
    name: "step1",
    components: {TablePicture, CompanyTitle, Draw},
    data() {
      return {
//      "QCID":"",   ''
//      "FACTNAME":"工厂名称",
//      "CONTRACTNO":"合同号",
//      "ORDERNO":"订单号",
//      "YHGC":"验货工厂",
//      "SHIPDATE":"船期",
//      "QTY":”数量”,
//    "CUSTNAME":"客户",
//      "STYLENO":"款号",
//      "PO":"PO",
//      "ZGJYJG":”整个检验结果  0-表示合格 1-表示不合格“,  ''
//    "ADDTIME":”录入时间”,   ''
//    "REMARK":"款式描述",
//      "PERSONQTY":"工厂人数",
//      "SXRQ":"上线日期",
//      "RCLQTY":"计划日产量",
//      "XXRQ":"下线日期",
//      "COMMENTS":"评语",
//      "ZJRQ":"质检日期",    ''
//      "USERNAME":"验货员用户名",   //login
//      "REALNAME":"验货员真实名",

        txt: "前期",
        isDisable:false,
        popupVisible: false,
        pagedata: {
          FACTNAME: "",
          CONTRACTNO: "",  //
          ORDERNO: "", // ''
          YHGC: "",
          SHIPDATE: "",
          QTY: "",
          CUSTNAME: "",
          STYLENO: "",
          PO: "",
          REMARK: "",
          PERSONQTY: "",
          SXRQ: "",
          RCLQTY: "",
          XXRQ: "",
          COMMENTS: "",
          REALNAME: "",//"验货员真实名",
          QNAME: "",  // 签名 base64 image
          "ADDTIME": "",//”录入时间”,   ''
          "ZJRQ": "",//"质检日期",
          "ZGJYJG": 1,//”整个检验结果  0-表示合格 1-表示不合格“
          "USERNAME": "",//"验货员用户名" todo login后获得
          QCID: "",
          QCITEM: [],  //图片列表的
        },

        STATUS: false,  //是修改的页面，需要掉接口拿数据
        QCITEM: [],
        datetime: '',// timepicker
        pickKey: "SXRQ"
      };
    },
    created() {
      this.datetime = new Date();

      let routeData = JSON.parse(this.$route.query.data);
      let routeInfo = JSON.parse(this.$route.query.info);
      this.pagedata.CONTRACTNO = routeData.CONTRACTNO;
      this.pagedata.QCID = routeData.QCID;
      this.STATUS = Boolean(routeData.STATUS);

      this.pagedata.FACTNAME = routeInfo.FactName;
      this.pagedata.CUSTNAME = routeInfo.CustName;
      this.pagedata.STYLENO = routeInfo.StyleNo;
      this.pagedata.SHIPDATE = routeInfo.IHDate;
      this.pagedata.PO = routeInfo.PO;
      this.pagedata.QTY = routeInfo.TotalQty;

      // 验货员
      this.pagedata.USERNAME=this.$store.state.user.username;
      this.pagedata.REALNAME=this.$store.state.user.realname;

      this.initPageData();
    },
    computed: {
//      datetimeC:{
//        get(){
//          if (this.datetime != "") {
//            return new Date(this.datetime);
//          } else {
//            return new Date();
//          }
//        },
//        set(v){
//        }
//      }
    },
    methods: {
      initPageData() {
        if (this.STATUS) {
//修改页 逻辑
          this.isDisable=true; //禁用所有输入

          Api.GetQcReportQQInfo({QCID: this.pagedata.QCID}).then(res=>{
            let resData = res.data.DATAOBJ;
            this.pagedata = resData;

            this.QCITEM=resData.QCITEM;  // 改变props

            if(resData.QNAME!="") this.pagedata.QNAME= "data:image/png;base64,"+resData.QNAME;

            this.isloading = false;
          });

        } else {
          //添加逻辑
        }
      },
      async submitData() {
        //todo push data
        this.pagedata.QCITEM = this.$refs.tablepicture.imageUrls;
        let res = await Api.AddQcReportQQ(this.pagedata);
        if (res.data.STATUS) {
          this.$router.push({name: "home"})
        }

      },

      openPicker(key) {
        if (this.pagedata[key] != "") {
          this.datetime = this.pagedata[key];
        }
        this.pickKey = key;
        this.$refs['picker'].open();
      },
      handleConfirm(time) {
        if (time) {
          this.pagedata[this.pickKey] = time.toLocaleDateString();
        }
      },
      openDraw() {
        if(this.isDisable)return;
        this.popupVisible = true;
      },
      drawTable(url) {
        this.pagedata.QNAME = url;
        this.popupVisible = false;
      }
    }
  };
</script>

<style lang="less">

  //reset
  /*.mint-popup-bottom {*/
  /*width: 95%;*/
  /*bottom: 3.3rem;*/
  /*border-radius: 0.8rem;*/
  /*background-color: #274236;*/
  /*}*/
  //end

  // .el-dialog__body{
  //   padding:0!important;
  // }
</style>
