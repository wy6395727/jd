<template>
  <div class="step-page">
    <mt-header class="mt-header-fixed" :title="`${getNAME}订单详情`">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>

    </mt-header>

    <div v-if="isloading" style="width:100%;margin-top: 4rem;text-align: center;"
    >
      <mt-spinner
        :size="60"
        type="triple-bounce"></mt-spinner>
      <span style="color:#606266;">加载中</span>
    </div>
    <div v-else>
      <company-title>
        <span slot="txt">{{NAME | toName}}{{pagedata.CNT}}</span>
      </company-title>

      <table class="c-table">
        <tr>
          <td>检验结果</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.ZGJYJG"></mt-field>-->
            <span>{{pagedata.ZGJYJG | checkResult}}</span>
          </td>
          <td>客户</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.CUSTNAME"></mt-field>-->
            <span class="c-td-span">{{pagedata.CUSTNAME}}</span>
          </td>
          <td>款号</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.STYLENO"></mt-field>-->
            <span class="c-td-span">{{pagedata.STYLENO}}</span>
          </td>
          <td>Po</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.PO"></mt-field>-->
            <span class="c-td-span">{{pagedata.PO}}</span>
          </td>
        </tr>
        <tr>
          <td>生产厂家</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.FACTNAME"></mt-field>-->
            <span class="c-td-span">{{pagedata.FACTNAME}}</span>
          </td>
          <td>验货工厂</td>
          <td class="c-td">
            <mt-field :disabled="isDisable" v-model="pagedata.YHGC"></mt-field>
          </td>
          <td>船期</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.SHIPDATE"></mt-field>-->
            <span class="c-td-span">{{pagedata.SHIPDATE}}</span>
          </td>
          <td>数量</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.QTY"></mt-field>-->
            <span class="c-td-span">{{pagedata.QTY}}</span>
          </td>
        </tr>
        <tr>
          <td>裁剪<br>cutting</td>
          <td class="c-td">
            <mt-field :disabled="isDisable" v-model="pagedata.CUTTING" type="number" disabled></mt-field>
          </td>
          <td>缝制<br> sewing</td>
          <td class="c-td">
            <mt-field :disabled="isDisable" v-model="pagedata.SEWING" type="number"></mt-field>
          </td>
          <td>整烫<br> pressing</td>
          <td class="c-td">
            <mt-field :disabled="isDisable" v-model="pagedata.PRESSING" type="number"></mt-field>
          </td>
          <td>包装<br> packing</td>
          <td class="c-td">
            <mt-field :disabled="isDisable" v-model="pagedata.PACKQTY" type="number"></mt-field>
          </td>
        </tr>
      </table>
      <!--<div class="table-btn">-->
      <!--<mt-button size="small" type="primary" @click="openBase">编辑</mt-button>-->
      <!--</div>-->

      <div class="table-titile">
        <mt-badge size="small" color="#36b101">I</mt-badge>
        <span>服装面料</span>
      </div>
      <el-table
        :data="pagedata.QCFABTRIMLIST"
        border
        center
        style="width: 100%;margin-bottom: 1rem;"
      >
        <el-table-column
          prop="NAME"
          label="服装面料"
          align="center"
          width="300"
        >
        </el-table-column>
        <el-table-column label="对/错/NA" align="center">
          <template slot-scope="scope">
            <div>
              <el-radio-group :disabled="isDisable" v-model="pagedata.QCFABTRIMLIST[scope.$index].JYJG" size="mini">
                <el-radio :label="1">对</el-radio>
                <el-radio :label="2">错</el-radio>
                <el-radio :label="3">N/A</el-radio>
              </el-radio-group>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="上传图片"
          align="center"
        >
          <template slot-scope="scope">
            <td-upload
              :isDisable="isDisable"
              @handlesuccess="handlesuccess1" :tdindex="{row:scope.$index}"
              :imgpath="pagedata.QCFABTRIMLIST[scope.$index].IMGPATH"></td-upload>
          </template>
        </el-table-column>
      </el-table>

      <div class="table-titile">
        <mt-badge size="small" color="#36b101">Ⅱ</mt-badge>
        <span>各项辅料情况</span>
      </div>
      <el-table
        :data="pagedata.QCFABTRIMLIST2"
        border
        center
        style="width: 100%;margin-bottom: 1rem;"
      >
        <el-table-column
          prop="NAME"
          label="辅料情况"
          align="center"
          width="300"
        >
        </el-table-column>
        <el-table-column label="对/错/NA" align="center">
          <template slot-scope="scope">
            <div>
              <el-radio-group :disabled="isDisable" v-model="pagedata.QCFABTRIMLIST2[scope.$index].JYJG" size="mini">
                <el-radio :label="1">对</el-radio>
                <el-radio :label="2">错</el-radio>
                <el-radio :label="3">N/A</el-radio>
              </el-radio-group>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="上传图片"
          align="center"
        >
          <template slot-scope="scope">
            <td-upload :isDisable="isDisable"
                       @handlesuccess="handlesuccess2" :tdindex="{row:scope.$index}"
                       :imgpath="pagedata.QCFABTRIMLIST2[scope.$index].IMGPATH"></td-upload>
          </template>
        </el-table-column>
      </el-table>

      <div class="table-titile">
        <mt-badge size="small" color="#36b101">Ⅲ</mt-badge>
        <span>尺码度量情况</span>
      </div>
      <table class="c-table">
        <tr>
          <td>AQL</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.QCSIZETABLE.AQL"></mt-field>-->
            <el-select :disabled="isDisable" v-model="pagedata.QCSIZETABLE.AQL" placeholder="请选择"
                       @change="changeSIZEAQL">
              <el-option label="4.0" :value="4.0"></el-option>
              <el-option label="6.5" :value="6.5"></el-option>
            </el-select>
          </td>
          <td>抽查件数<br>QTY,inspected</td>
          <td class="c-td">
            <span class="c-td-span">{{pagedata.QCSIZETABLE.CCQTY}}</span>
          </td>
          <td>PTS接受</td>
          <td class="c-td">
            <span class="c-td-span">{{pagedata.QCSIZETABLE.PTS}}</span>
          </td>
        </tr>
        <tr>
          <td>接受标准<br>Accept,STD</td>
          <td class="c-td">
            <span class="c-td-span">{{pagedata.QCSIZETABLE.ACCEPTSTD}}</span>
          </td>
          <td>不合格件数<br>QTY,rejected</td>
          <td class="c-td">
            <mt-field :disabled="isDisable" v-model="pagedata.QCSIZETABLE.BHGQTY" type="number"></mt-field>
          </td>
          <td>不完善百分比%<br>defective</td>
          <td class="c-td">
            <span class="c-td-span">{{defective}}</span>
          </td>
        </tr>
        <tr>
          <td>尺寸表</td>
          <td class="c-td" colspan="5">
            <td-upload :isDisable="isDisable"
                       @handlesuccess="handlesuccess3" :tdindex="{}" :imgpath="pagedata.QCSIZETABLE.IMG"></td-upload>
          </td>
        </tr>
        <tr>
          <td>意见<br>comments</td>
          <td class="c-td" colspan="5">
            <mt-field :disabled="isDisable" v-model="pagedata.QCSIZETABLE.COMMENTS" type="textarea" rows="2"></mt-field>
          </td>
        </tr>
      </table>

      <el-row :gutter="30">
        <el-col :span="12">
          <div class="table-titile">
            <mt-badge size="small" color="#36b101">Ⅳ</mt-badge>
            <span>测试结果</span>
          </div>
          <table class="c-table">
            <tr>
              <td>面料</td>
              <td class="c-td">
                <el-select :disabled="isDisable" v-model="pagedata.FABSTATUS" placeholder="请选择">
                  <el-option
                    v-for="item in mlOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>成衣</td>
              <td class="c-td">
                <el-select :disabled="isDisable" v-model="pagedata.CYSTATUS" placeholder="请选择">
                  <el-option
                    v-for="item in mlOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>检验结果</td>
              <td class="c-td">
                <mt-field :disabled="isDisable" v-model="pagedata.MCCSJYJG"></mt-field>
                <!--<span class="c-td-span">{{pagedata.MCCSJYJG}}</span>-->
              </td>
            </tr>
          </table>
        </el-col>
        <el-col :span="12">
          <div class="table-titile">
            <mt-badge size="small" color="#36b101">Ⅵ</mt-badge>
            <span>针数/克重 （针对指针毛衫类）</span>
          </div>
          <table class="c-table">
            <tr>
              <td>针数</td>
              <td class="c-td">
                <el-select :disabled="isDisable" v-model="pagedata.STITCH" placeholder="请选择">
                  <el-option
                    v-for="item in mlOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>克重</td>
              <td class="c-td">
                <el-select :disabled="isDisable" v-model="pagedata.WEIGHT" placeholder="请选择">
                  <el-option
                    v-for="item in mlOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>检验结果</td>
              <td class="c-td">
                <mt-field :disabled="isDisable" v-model="pagedata.ZSCSJYJG"></mt-field>
              </td>
            </tr>
          </table>
        </el-col>
      </el-row>

      <div class="table-titile">
        <mt-badge size="small" color="#36b101">Ⅲ</mt-badge>
        <span>可视检验（visual inspection-workmanshipaudit）</span>
      </div>
      <table class="c-table">
        <tr>
          <td>AQL</td>
          <td class="c-td">
            <el-select :disabled="isDisable" v-model="pagedata.KSAQL" @change="changeKSAQL" placeholder="请选择">
              <el-option label="1.5" :value="1.5"></el-option>
              <el-option label="2.5" :value="2.5"></el-option>
              <el-option label="4" :value="4"></el-option>
            </el-select>
          </td>
          <td>检验结果</td>
          <td class="c-td">
            <span>不合格</span>
          </td>
          <td>接受率QIR</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.KSCCSL"></mt-field>-->
            <span class="c-td-span">{{pagedata.KSJSL}}</span>
          </td>
        </tr>
        <tr>
          <td>抽查数量<br>QTY,inspected</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.KSCCSL"></mt-field>-->
            <span class="c-td-span">{{pagedata.KSCCSL}}</span>
          </td>
          <td>PTS接受</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.KSJS"></mt-field>-->
            <span class="c-td-span">{{pagedata.KSJS}}</span>
          </td>
          <td>PTS不接受</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.KSJSBJ"></mt-field>-->
            <span class="c-td-span">{{pagedata.KSJSBJ}}</span>
          </td>
        </tr>
      </table>
      <table class="c-table" style="margin-top: -1rem;">
        <tr>
          <td>疵点照片</td>
          <td>修复后照片</td>
          <td width="70">危机</td>
          <td width="70">严重</td>
          <td width="70">轻微</td>
        </tr>
        <template v-for="(QCKSIMG,i) in pagedata.QCKSIMGLIST">
          <tr style="border-top: 2px solid;">
            <td>
              <div class="td-upload">
                <td-upload :isDisable="isDisable"
                           :tdindex="{row:i,col:'IMGITEM'}" @handlesuccess="handlesuccessKS"
                           :imgpath="pagedata.QCKSIMGLIST[i]['IMGITEM'].ImgPath"></td-upload>
              </div>
              <div class="td-upload-desc">
                <div>图片说明:</div>
                <div>
                  <mt-field :disabled="isDisable"
                            v-model="QCKSIMG.IMGITEM.TPSM" type="textarea"></mt-field>
                </div>
              </div>
              <div class="td-upload-time">
                <div>拍摄时间:</div>
                <div>
                  <mt-field :disabled="isDisable" v-model="QCKSIMG.IMGITEM.PSSJ"></mt-field>
                </div>
              </div>
              <div class="td-upload-site">
                <div>拍摄地点:</div>
                <div>
                  <mt-field :disabled="isDisable" v-model="QCKSIMG.IMGITEM.PSDD"></mt-field>
                </div>
              </div>
            </td>
            <td>
              <div class="td-upload">
                <td-upload :isDisable="isDisable"
                           :tdindex="{row:i,col:'XFHIMGITEM'}" @handlesuccess="handlesuccessKS"
                           :imgpath="pagedata.QCKSIMGLIST[i]['XFHIMGITEM'].ImgPath"></td-upload>
              </div>
              <div class="td-upload-desc">
                <div>图片说明:</div>
                <div>
                  <mt-field :disabled="isDisable" v-model="QCKSIMG.XFHIMGITEM.TPSM" type="textarea"></mt-field>
                </div>
              </div>
              <div class="td-upload-time">
                <div>拍摄时间:</div>
                <div>
                  <mt-field :disabled="isDisable" v-model="QCKSIMG.XFHIMGITEM.PSSJ"></mt-field>
                </div>
              </div>
              <div class="td-upload-site">
                <div>拍摄地点:</div>
                <div>
                  <mt-field :disabled="isDisable" v-model="QCKSIMG.XFHIMGITEM.PSDD"></mt-field>
                </div>
              </div>
            </td>
            <td class="c-td" :rowspan="3">
              <mt-field :disabled="isDisable" v-model="QCKSIMG.WJ" type="number"></mt-field>
            </td>
            <td class="c-td" :rowspan="3">
              <mt-field :disabled="isDisable" v-model="QCKSIMG.YZ" type="number"></mt-field>
            </td>
            <td class="c-td" :rowspan="3">
              <mt-field :disabled="isDisable" v-model="QCKSIMG.QW" type="number"></mt-field>
            </td>
          </tr>
          <tr>
            <td>是否可修复</td>
            <td class="c-td">
              <el-radio-group :disabled="isDisable" size="mini" v-model="QCKSIMG.ISXF">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td>缺陷类别</td>
            <td class="c-td">
              <el-cascader
                :disabled="isDisable"
                :options="options"
                :props="{label:'value'}"
                v-model="QCKSIMG.CDSM"
                @change="handleChange">
              </el-cascader>
            </td>
          </tr>
        </template>
        <tr>
          <td colspan="5">
            <mt-button class="el-icon-circle-plus"
                       :disabled="isDisable"
                       @click="addQCKSIMG" style="width:50%;border: 1px solid;">添加
            </mt-button>
          </td>
        </tr>
        <tr>
          <td colspan="2">缺点问题之和</td>
          <td>
            <span>{{wjTotal}}</span>
          </td>
          <td>
            <span>{{yzTotal}}</span>
          </td>
          <td>
            <span>{{qwTotal}}</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">缺点所扣分数</td>
          <td>
            <span>{{wjTotal}}</span>
          </td>
          <td>
            <span>{{yzTotal}}</span>
          </td>
          <td>
            <span>{{qwTotal / 2}}</span>
          </td>
        </tr>
        <tr>
          <td colspan="4">严重轻微缺点折扣综合PTS</td>
          <td>
            <span>{{wjTotal + yzTotal + qwTotal / 2}}</span>
          </td>
        </tr>
      </table>

      <div class="table-titile">
        <mt-badge size="small" color="#36b101">Ⅶ</mt-badge>
        <span>包装（packing）</span>
      </div>
      <table class="c-table" style="margin-bottom: 0;">
        <tr>
          <td>纸箱尺寸<br>carton size</td>
          <td class="c-td">
            <mt-field :disabled="isDisable" v-model="pagedata.ZXCM"></mt-field>
          </td>
          <td>黏贴纸</td>
          <td class="c-td">
            <mt-field :disabled="isDisable" v-model="pagedata.ZTZ"></mt-field>
          </td>
          <td>搭配比例<br>proportion</td>
          <td class="c-td">
            <mt-field :disabled="isDisable" v-model="pagedata.DBBL"></mt-field>
          </td>
        </tr>
        <tr>
          <td>箱唛<br>front shipping mark</td>
          <td class="c-td">
            <mt-field :disabled="isDisable" v-model="pagedata.MARK"></mt-field>
          </td>
          <td>胶带品质及印字<br>polybag-words printed</td>
          <td class="c-td">
            <mt-field :disabled="isDisable" v-model="pagedata.JDPZ"></mt-field>
          </td>
          <td>抽查箱号<br>thecarton on of sport-chenk</td>
          <td class="c-td">
            <mt-field :disabled="isDisable" v-model="pagedata.CCXH"></mt-field>
          </td>
        </tr>
      </table>
      <table-picture
        ref="tablepicture"
        :titles="QCPACKIMGTitle"
        :QCITEM="pagedata.QCPACKIMGLIST"
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
              <img v-if="pagedata.FIELD2" :src="pagedata.FIELD2" alt="" style="width:5rem;height:100%;">
            </div>
          </td>
        </tr>
        <tr>
          <td>验收员</td>
          <td class="c-td">
            <!--<mt-field v-model="pagedata.USERNAME"></mt-field>-->
            <span class="c-td-span">{{pagedata.USERNAME}}</span>
          </td>
        </tr>
      </table>

      <div class="submit-btn">
        <mt-button type="primary" @click="submitPage" :disabled="STATUS">{{STATUS ? "已提交" : "提交"}}</mt-button>
      </div>
    </div>

    <div class="dialog-class">
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
  </div>
</template>

<script>
  import TablePicture from "./common/table-picture";
  import CompanyTitle from "./common/company-title";
  import Draw from "./common/draw";
  import CRadio from "./common/c-radio";
  import TdUpload from "./common/td-upload.vue";

  import Api from "@/axios/api";

  export default {
    name: 'step2',
    components: {
      TdUpload,
      Draw, TablePicture, CompanyTitle
    },
    data() {
      return {
        selectedOptions: [],
        options: [
          {
            value: '规格不符',
            children: [{
              value: '规格超差',
            }],
          },
          {
            value: '缝制不良',
            children: [{
              value: '针距太大或太密',
              value: '跳针',
              value: '脱线',
              value: '漏针',
              value: '毛泄',
              value: '浮面线',
              value: '止口反吐',
              value: '反翘',
              value: '起皱',
              value: '起刍纽',
              value: '双轨',
              value: '不顺直',
              value: '不平服',
              value: '不方正',
              value: '不圆顺',
              value: '左右不对称',
              value: '吃势不均匀',
              value: '',
            }],
          },
          {
            value: '污迹',
            children: [{
              value: '笔迹',
              value: '油迹',
              value: '粉迹',
              value: '印迹',
              value: '脏迹',
              value: '水迹',
              value: '锈迹',
            }],
          },
          {
            value: '整烫',
            children: [{
              value: '漏烫',
              value: '死迹',
              value: '极光',
              value: '烫焦变色',
            }],
          },
          {
            value: '线头',
            children: [{
              value: '活线头',
              value: '死线头',
            }],
          },
          {
            value: '其他',
            children: [{
              value: '外相唛头印错',
              value: '装箱搭配差错',
              value: '丢工缺件',
              value: '衣、袋规格不符',
              value: '折衣不合格',
              value: '钉扣不牢',
              value: '套结不准',
              value: '渗胶',
              value: '起泡',
              value: '脱胶',
              value: '破损',
              value: '色差',
              value: '扣眼歪斜',
              value: '扣位不准',
              value: '裁片同向',
              value: '做反布面',
              value: '倒顺毛',
            }],
          },
        ],

        mlOptions: [
          {
            label: "N/A",
            value: 3
          },
          {
            label: "Fail",
            value: 2
          },
          {
            label: "Pass",
            value: 1
          },
        ],
        isDisable: false,  //禁用输入
        isloading: false,  // 加载页面数据中
        popupVisible: false,
        STATUS: 0,  //1 已完成 0 为完成
        NAME: '',  // 1中期  2尾期
        pagedata: {
          "QCID": "",//"主键QC",
          "FACTNAME": "",//"工厂名称",
          "CONTRACTNO": "",//"合同号",
          "ORDERNO": "",//"订单号",
          "YHGC": "",//"验货工厂",
          "SHIPDATE": "",//"船期",
          "QTY": "",//”数量”,
          "CUSTNAME": "",//"客户",
          "STYLENO": "",//"款号",
          "PO": "",//"PO",
          "ZGJYJG": 1,//”整个检验结果  0-表示合格 1-表示不合格“,
          "CUTTING": "",//”裁剪数”,
          "SEWING": "",//”缝制数”,
          "PRESSING": "",//”整烫数”,
          "PACKQTY": "",//”包装数”,
          "ADDTIME": "",//”录入时间”,
          "FABSTATUS": 3,//”测试结果--面料 0--未操作  1-对 2-错  3-N/A”,
          "CYSTATUS": 3,//”测试结果--成衣 0--未操作   1-对 2-错  3-N/A”,
          "MCCSJYJG": "",//”面料和成衣测试结果--检验结果 0--未检测   1-合格 2-不合格”,
          "STITCH": 3,//”测试结果--针数  0--未操作   1-对 2-错  3-N/A”,
          "WEIGHT": 3,//”测试结果--克重   0--未操作   1-对 2-错  3-N/A”,
          "ZSCSJYJG": "",//”针数测试结果--检验结果 0--未检测   1-合格 2-不合格”,
          "KSAQL": "",//"可视检验--AQL",
          "KSJSL": "",//"可视接受率QIR",  //todo
          "KSJSBJ": "",//"可视接受标准",
          "KSBJS": "",//"可视不接受PTS",  //todo
          "KSJS": "",//"可视接受PTS",
          "KSCCSL": "",//"可视抽查数量",
          "KSJYJG": "",//"可视检验结果  0--未检测   1-合格 2-不合格",  //todo

          "ZXCM": "",//"纸箱尺码",
          "ZTZ": "",//"粘贴纸",
          "DBBL": "",//"搭配比例",
          "MARK": "",//"箱麦",
          "JDPZ": "",//"胶带品质及文字",
          "CCXH": "",//"抽查箱号",
          "BZJYJG": "",//"包装检验结果--检验结果 0--未检测   1-合格 2-不合格",

          "QCSIZETABLE": {    //  尺码度量
            "ID": "",//”主键”,
            "QCID": "",//"主表ID",
            "AQL": "",//AQL,
            "BHGQTY": "",//不合格数",
            "CMJYJG": "",//"检验结果  0--未检测   1-合格  2-未合格",
            "SIZETABLEPATH": "",//"尺码表图片路径",
            "IMG": "",//"图片",
            "PTS": "",//"PTS接受",
            "CCQTY": "",//"抽查数",
            "ACCEPTSTD": "",//"接受标准",
            "DEFECTIVE": "",//"不完善百分比",
            "COMMENTS": "",//"意见"
          },

          "FIELD1": "",//"报告类型 1-表示中期报告 2-表示尾期报告",
          "CNT": "",//"报告次数",
          "COMMENTS": "",//"评语",
          "ZJRQ": "",//"质检日期",
          "USERNAME": "",//"验货员用户名",
          "QCNAME": "",//"验货员真实名",
          "FIELD2": "",//”工厂签名”，
          "FIELD3": "",//”备用字段”，

          "QCFABTRIMLIST": [   //  0-服装面料
//            {"ID":”0主键”,
//      "QCID":"主表ID",
//        "FABTRIMTYPE":”类型  0-服装面料  1-服装辅料”,
//      "NAME":"Test",
//        "JYJG":"检验结果  0--未操作   1-对 2-错  3-N/A",
//        "IMGPATH":"图片信息路径"
//    }
          ],//----- 面辅料图片信息
          "QCFABTRIMLIST2": [  //  1-服装辅料
// 同上
          ],
          "QCKSIMGLIST": [
            {
              "ID": "",//”0主键”,
              "QCID": "",//"主表ID",
              "WTMS": "",//”问题描叙”,
              "XFHMX": "",//"修复后描述",
              "IMGITEM": {PSSJ: "", PSDD: "", TPSM: "", ImgPath: ""},// ----问题图片相关
              "XFHIMGITEM": {PSSJ: "", PSDD: "", TPSM: "", ImgPath: ""},// ----修复后图片
              "WJ": "",//危急”,
              "QW": "",//”轻微”,
              "YZ": "",//”严重”,
              "CDSM": [],//”疵点说明字段”,
              "ISXF": ""//”是否能修复”  1 是   0 否
            }
          ],//-----“可视检查图片信息”
          "QCPACKIMGLIST": [],//----包装信息 -----
        },
        QCPACKIMGLIST: [],
        QCPACKIMGTitle: []  //todo
      }
    },
    created() {
      let routeData = JSON.parse(this.$route.query.data);
      let routeInfo = JSON.parse(this.$route.query.info);
      this.pagedata.CONTRACTNO = routeData.CONTRACTNO;
      this.pagedata.CNT = routeData.CNT;
      this.pagedata.QCID = routeData.QCID;
      this.pagedata.FIELD1 = routeData.NAME;
      this.STATUS = Boolean(routeData.STATUS);
      this.NAME = routeData.NAME;

      this.pagedata.FACTNAME = routeInfo.FactName;
      this.pagedata.CUSTNAME = routeInfo.CustName;
      this.pagedata.STYLENO = routeInfo.StyleNo;
      this.pagedata.SHIPDATE = routeInfo.IHDate;
      this.pagedata.PO = routeInfo.PO;
      this.pagedata.QTY = routeInfo.TotalQty;

      this.initPageData();
    },
    computed: {
      wjTotal() {
        let total = 0;
        this.pagedata.QCKSIMGLIST.forEach(item => {
          let num = isNaN(parseFloat(item.WJ)) ? 0 : parseFloat(item.WJ);
          total += num;
        });
        return total;
      },
      yzTotal() {
        let total = 0;
        this.pagedata.QCKSIMGLIST.forEach(item => {
          let num = isNaN(parseFloat(item.YZ)) ? 0 : parseFloat(item.YZ);
          total += num;
        });
        return total;
      },
      qwTotal() {
        let total = 0;
        this.pagedata.QCKSIMGLIST.forEach(item => {
          let num = isNaN(parseFloat(item.QW)) ? 0 : parseFloat(item.QW);
          total += num;
        });
        return total;
      },

      getNAME() {
        if (this.NAME == 1) {
          return "中期";
        } else {
          return "尾期"
        }
      },
      //不完善百分比
      defective() {
        let bhg = this.pagedata.QCSIZETABLE.BHGQTY;
        let cc = this.pagedata.QCSIZETABLE.CCQTY;

        if (bhg == "" || cc == "") return "";
        return parseInt(bhg) / cc + "%";
      }
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
      },
      checkResult(value) {
        if (value == 1) {
          return "不合格"
        }
        if (value == 0) {
          return "合格"
        }
        return ""
      }
    },
    methods: {
      async submitPage() {
        //1 pagedata 检查zhunbei
        let QCPACKIMGLIST = this.$refs['tablepicture'].imageUrls;
        let pagedata = JSON.parse(JSON.stringify(this.pagedata));
        pagedata.QCPACKIMGLIST = QCPACKIMGLIST;
        pagedata.QCSIZETABLE.DEFECTIVE = this.defective;

        pagedata.QCKSIMGLIST = pagedata.QCKSIMGLIST.map(item => {
          item.CDSM = item.CDSM.join(",");
          return item;
        });
        //.....

        console.log(pagedata)
//        2 diaojiekou
        let res = await Api.AddQcReport(pagedata);
        if (res.data.STATUS) {
          //3 route home
//          this.$router.push({name: "home"});
        }
      },
      initPageData() {

        //  QCPACKIMGTitle 初始数据
        if (this.NAME == 1) {
//中期
          this.QCPACKIMGTitle = ["修复后合格的照片", "成品服装", "工厂流水线", "服装样衣"];
        } else {
//后期
          this.QCPACKIMGTitle = ["成品相数", "包装现场", "检验现场", "抽查纸箱"];
        }

        if (this.STATUS) {
          //已完成 页逻辑  todo  修改
          this.isDisable = true; //禁用所有输入

          this.isloading = true;  //
          Api.GetQcReportInfo({QCID: this.pagedata.QCID}).then(res => {
            let resData = res.data.DATAOBJ;
            this.pagedata = resData;
            if (resData.CUTTING == 0) this.pagedata.CUTTING = "";
            if (resData.SEWING == 0) this.pagedata.SEWING = "";
            if (resData.PRESSING == 0) this.pagedata.PRESSING = "";
            if (resData.PACKQTY == 0) this.pagedata.PACKQTY = "";
            if (resData.QCSIZETABLE.CCQTY == 0) this.pagedata.QCSIZETABLE.CCQTY = "";
            if (resData.QCSIZETABLE.BHGQTY == 0) this.pagedata.QCSIZETABLE.BHGQTY = "";

            this.isloading = false;
          });

        } else {
          //未完成 页逻辑
          //1 创建数据对象 面、辅料图片信息数组
          ["颜色 color", "缸差 shading band", "手感 handfeel", "组织 construction", "毛感 peach feel", "绣花 embroidery"].forEach(txt => {
            this.pagedata.QCFABTRIMLIST.push({
              "ID": 0,
              "QCID": "",//"主表ID",
              "FABTRIMTYPE": 0,//”类型  0-服装面料  1-服装辅料”,
              "NAME": txt,//"Test",
              "JYJG": 0,//"检验结果  0--未操作   1-对 2-错  3-N/A",
              "IMGPATH": ""//"图片信息路径"
            })
          });
          ["主唛 main label", "洗唛 washing label", "尺码唛 size label", "价格牌 price ticket", "吊牌 handtag", "线 thread"].forEach(txt => {
            this.pagedata.QCFABTRIMLIST2.push({
              "ID": 0,
              "QCID": "",//"主表ID",
              "FABTRIMTYPE": 1,//”类型  0-服装面料  1-服装辅料”,
              "NAME": txt,//"Test",
              "JYJG": 0,//"检验结果  0--未操作   1-对 2-错  3-N/A",
              "IMGPATH": ""//"图片信息路径"
            })
          });

        }
      },

      changeSIZEAQL(value) {
        // 4.0   6.5
        this.pagedata.QCSIZETABLE.CCQTY = 50;
        this.pagedata.QCSIZETABLE.PTS = value == 4.0 ? 6 : 8;
        this.pagedata.QCSIZETABLE.ACCEPTSTD = value == 4.0 ? 5 : 7;
      },
      changeKSAQL(value) {
        //todo 逻辑缺失

        this.pagedata.KSCCSL = value;
        this.pagedata.KSJS = value;
        this.pagedata.KSJSBJ = value;
      },

      addQCKSIMG() {
        let obj = {
          "ID": "",//”0主键”,
          "QCID": "",//"主表ID",
          "WTMS": "",//”问题描叙”,
          "XFHMX": "",//"修复后描述",
          "IMGITEM": {PSSJ: "", PSDD: "", TPSM: "", ImgPath: ""},// ----问题图片相关
          "XFHIMGITEM": {PSSJ: "", PSDD: "", TPSM: "", ImgPath: ""},// ----修复后图片
          "WJ": "",//危急”,
          "QW": "",//”轻微”,
          "YZ": "",//”严重”,
          "CDSM": [],//”疵点说明字段”,
          "ISXF": ""//”是否能修复”
        }
        this.pagedata.QCKSIMGLIST.push(obj);
      },

      // 图片路径返回 --start
      handlesuccess1(FilePath, {row}) {
        // 面料 图片获取路径
        this.pagedata.QCFABTRIMLIST[row].IMGPATH = FilePath;
      },
      handlesuccess2(FilePath, {row}) {
        // 辅料 图片获取路径
        this.pagedata.QCFABTRIMLIST2[row].IMGPATH = FilePath;
      },
      handlesuccess3(FilePath) {
        //尺码度量情况  响应路劲
        this.pagedata.QCSIZETABLE.IMG = FilePath;
      },
      handlesuccessKS(FilePath, {row, col}) {
        // 可视检测 响应路劲
        console.log(FilePath, row, col)
        this.pagedata.QCKSIMGLIST[row][col].ImgPath = FilePath;
      },
      // --end


//      openBase() {
//        this.pagedata.show = true;
//      },

      handleChange(value) {
        console.log(value);
      },

      openDraw() {
        if (this.isDisable) return;
        this.popupVisible = true;
      },
      drawTable(url) {
        this.pagedata.FIELD2 = url;
        this.popupVisible = false;
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/style/var";

  /*.dialog-class {*/
  /*.el-dialog__title {*/
  /*font-size: 1.2rem;*/
  /*}*/
  /*.mint-cell-title {*/
  /*margin-right: 2rem;*/
  /*}*/
  /*}*/

  .td-upload {
    height: 3rem;
  }

  .td-upload-desc, .td-upload-time, .td-upload-site {
    margin: .5rem 1rem 0px;
    & > div:nth-child(1) {
      text-align: left;
      margin-bottom: 3px;
    }
  }
</style>
