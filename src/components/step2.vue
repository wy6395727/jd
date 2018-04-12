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
        <td>检验结果</td>
        <td class="c-td">
          <mt-field v-model="pagedata.jyjg"></mt-field>
        </td>
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
      </tr>
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
        <td>裁剪<br>cutting</td>
        <td class="c-td">
          <mt-field v-model="pagedata.cj"></mt-field>
        </td>
        <td>缝制<br> sewing</td>
        <td class="c-td">
          <mt-field v-model="pagedata.fz"></mt-field>
        </td>
        <td>整烫<br> pressing</td>
        <td class="c-td">
          <mt-field v-model="pagedata.zt"></mt-field>
        </td>
        <td>包装<br> packing</td>
        <td class="c-td">
          <mt-field v-model="pagedata.bz"></mt-field>
        </td>
      </tr>
    </table>
    <div class="table-btn">
      <mt-button size="small" type="primary" @click="openBase">编辑</mt-button>
    </div>

    <div class="table-titile">
      <mt-badge size="small" color="#36b101">I</mt-badge><span>服装面料</span>
    </div>
    <el-table
      :data="statementList"
      border
      center
      style="width: 100%;margin-bottom: 1rem;"
    >
      <el-table-column
        prop="key"
        label="服装面料"
        align="center"
        width="300"
      >
      </el-table-column>
      <el-table-column label="对/错/NA" align="center">
        <template slot-scope="scope">
          <div>
            <el-radio-group v-model="radios[scope.$index]" size="mini">
              <el-radio :label="0">对</el-radio>
              <el-radio :label="1">错</el-radio>
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
          <td-upload></td-upload>
        </template>
      </el-table-column>
    </el-table>

    <div class="table-titile">
      <mt-badge size="small" color="#36b101">Ⅱ</mt-badge><span>各项辅料情况</span>
    </div>
    <table class="c-table">
      <tr>
        <td>AQL</td>
        <td class="c-td">
          <mt-field v-model="pagedata.jyjg"></mt-field>
        </td>
        <td>不合格件数<br>QTY,rejected</td>
        <td class="c-td">
          <mt-field v-model="pagedata.kh"></mt-field>
        </td>
        <td>PTS接受</td>
        <td class="c-td">
          <mt-field v-model="pagedata.kh"></mt-field>
        </td>
      </tr>
      <tr>
        <td>抽查件数<br>QTY,inspected</td>
        <td class="c-td">
          <mt-field v-model="pagedata.kh"></mt-field>
        </td>
        <td>接受标准<br>Accept,STD</td>
        <td class="c-td">
          <mt-field v-model="pagedata.jyjg"></mt-field>
        </td>
        <td>不完善百分比%<br>defective</td>
        <td class="c-td">
          <mt-field v-model="pagedata.kh"></mt-field>
        </td>
      </tr>
      <tr>
        <td>尺寸表</td>
        <td class="c-td" colspan="5">
          <td-upload></td-upload>
        </td>
      </tr>
      <tr>
        <td>意见<br>comments</td>
        <td class="c-td" colspan="5">
          <mt-field v-model="pagedata.ms" type="textarea" rows="2"></mt-field>
        </td>
      </tr>
    </table>

    <div class="table-titile">
      <mt-badge size="small" color="#36b101">Ⅲ</mt-badge><span>尺度度量情况</span>
    </div>
    <table class="c-table">
      <tr>
        <td>AQL</td>
        <td class="c-td">
          <mt-field v-model="pagedata.jyjg"></mt-field>
        </td>
        <td>不合格件数<br>QTY,rejected</td>
        <td class="c-td">
          <mt-field v-model="pagedata.kh"></mt-field>
        </td>
        <td>PTS接受</td>
        <td class="c-td">
          <mt-field v-model="pagedata.kh"></mt-field>
        </td>
      </tr>
      <tr>
        <td>抽查件数<br>QTY,inspected</td>
        <td class="c-td">
          <mt-field v-model="pagedata.kh"></mt-field>
        </td>
        <td>接受标准<br>Accept,STD</td>
        <td class="c-td">
          <mt-field v-model="pagedata.jyjg"></mt-field>
        </td>
        <td>不完善百分比%<br>defective</td>
        <td class="c-td">
          <mt-field v-model="pagedata.kh"></mt-field>
        </td>
      </tr>
      <tr>
        <td>尺寸表</td>
        <td class="c-td" colspan="5">
          <td-upload></td-upload>
        </td>
      </tr>
      <tr>
        <td>意见<br>comments</td>
        <td class="c-td" colspan="5">
          <mt-field v-model="pagedata.ms" type="textarea" rows="2"></mt-field>
        </td>
      </tr>
    </table>

    <el-row :gutter="30">
      <el-col :span="12">
        <div class="table-titile">
          <mt-badge size="small" color="#36b101">Ⅳ</mt-badge><span>测试结果</span>
        </div>
        <table class="c-table" >
          <tr>
            <td>面料</td>
            <td class="c-td">
              <el-select v-model="pagedata.ml" placeholder="请选择">
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
              <el-select v-model="pagedata.ml" placeholder="请选择">
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
              <mt-field v-model="pagedata.kh"></mt-field>
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="12">
        <div class="table-titile">
          <mt-badge size="small" color="#36b101">Ⅵ</mt-badge><span>针数/克重 （针对指针毛衫类）</span>
        </div>
        <table class="c-table" >
          <tr>
            <td>面料</td>
            <td class="c-td">
              <el-select v-model="pagedata.ml" placeholder="请选择">
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
              <el-select v-model="pagedata.ml" placeholder="请选择">
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
              <mt-field v-model="pagedata.kh"></mt-field>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>

    <div class="dialog-class">
      <el-dialog
        title="裁剪上传"
        :fullscreen="isPhone"
        :visible.sync="pagedata.show"
        :center="true"
        :close-on-click-modal="false"
        :lock-scroll="true"
      >
        <div>
          <mt-field label="裁剪 cutting" placeholder="请输入" v-model="pagedata.cj"></mt-field>
          <mt-field label="缝制 sewing" placeholder="请输入" v-model="pagedata.fz"></mt-field>
          <mt-field label="整烫 pressing" placeholder="请输入" v-model="pagedata.zt"></mt-field>
          <mt-field label="包装 packing" placeholder="请输入" v-model="pagedata.bz"></mt-field>
        </div>
        <span slot="footer">
          <mt-button type="primary" size="large" @click="pagedata.show=false">保存</mt-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//  ⅡⅢ ⅣⅤⅥ
  import TablePicture from "./common/table-picture";
  import CompanyTitle from "./common/company-title";
  import Draw from "./common/draw";
  import CRadio from "./common/c-radio";
  import TdUpload from "./common/td-upload.vue";

  export default {
    name: 'step2',
    components: {
      TdUpload,
      Draw, TablePicture, CompanyTitle, CRadio
    },
    data() {
      return {
        radios: [0, 1, 0],  //单选数据
        statementList: [
          {
            key: "颜色 color"
          },
          {
            key: "缸差 shading band"
          },
          {
            key: "手感 handfeel"
          },
          {
            key: "组织 construction"
          },
          {
            key: "毛感 peach feel"
          },
          {
            key: "绣花 embroidery"
          }
        ],

        mlOptions: [
          {
            label: "N/A",
            value: 1
          },
          {
            label: "Fail",
            value: 2
          },
          {
            label: "Pass",
            value: 3
          },
        ],
        pagedata: {
          show: false,

          jyjg: '',
          kh: '',
          kuanh: '',
          po: '',
          scgc: '',
          yhgc: '',
          cq: '',
          sl: '',
          cj: '',
          fz: '',
          zt: '',
          bz: '',

          ml: 1
        }
      }
    },
    created() {
    },
    computed: {},
    methods: {
      openBase() {
        this.pagedata.show = true;
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/style/var";

  .dialog-class {
    .el-dialog__title {
      font-size: 1.2rem;
    }
    .mint-cell-title {
      margin-right: 2rem;
    }
  }
</style>
