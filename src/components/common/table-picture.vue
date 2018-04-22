<template>
  <table class="c-table">
    <tr v-for="(title,i) in titles" :key="title.key">
      <td class="w8rem">{{title}}</td>
      <td style="padding:0;">
        <table style="width:100%; ">
          <tr height="90">
            <td class="c-td-text">图片</td>
            <td
              class="c-td c-td-img"
              v-for="j in 3"
              :key="j.key"
            >
              <td-upload :tdindex="{row:i,col:j-1}"
                         @handlesuccess="handlesuccess"
                         :imgpath="imageUrls[i].IMGITEM[j-1].ImgPath"
                         :isDisable="isDisable"
              ></td-upload>
            </td>
          </tr>
          <tr>
            <td class="c-td-text">图片说明</td>
            <td class="c-td">
              <mt-field v-model="imageUrls[i].IMGITEM[0].TPSM"
                        :disabled="isDisable"></mt-field>
            </td>
            <td class="c-td">
              <mt-field
                :disabled="isDisable"
                v-model="imageUrls[i].IMGITEM[1].TPSM"></mt-field>
            </td>
            <td class="c-td">
              <mt-field :disabled="isDisable"
                        v-model="imageUrls[i].IMGITEM[2].TPSM"></mt-field>
            </td>
          </tr>
          <tr>
            <td class="c-td-text">拍摄时间</td>
            <td class="c-td">
              <mt-field :disabled="isDisable"
                        v-model="imageUrls[i].IMGITEM[0].PSSJ"></mt-field>
            </td>
            <td class="c-td">
              <mt-field :disabled="isDisable"
                        v-model="imageUrls[i].IMGITEM[1].PSSJ"></mt-field>
            </td>
            <td class="c-td">
              <mt-field :disabled="isDisable"
                        v-model="imageUrls[i].IMGITEM[2].PSSJ"></mt-field>
            </td>
          </tr>
          <tr>
            <td class="c-td-text">拍摄地点</td>
            <td class="c-td">
              <mt-field :disabled="isDisable"
                        v-model="imageUrls[i].IMGITEM[0].PSDD"></mt-field>
            </td>
            <td class="c-td">
              <mt-field :disabled="isDisable"
                        v-model="imageUrls[i].IMGITEM[1].PSDD"></mt-field>
            </td>
            <td class="c-td">
              <mt-field :disabled="isDisable"
                        v-model="imageUrls[i].IMGITEM[2].PSDD"></mt-field>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</template>

<script>
  import TdUpload from "./td-upload.vue";

  export default {
    components: {TdUpload},
    name: "table-picture",
    props: {
      titles: {
        type: Array,
        default: () => ["技术包", "面料", "PP样", "PPMeetingRecord"]
      },
      QCITEM: {   // 修改传入数据，默认空数组为添加 (可以判断是修改还是添加)
        type: Array,
        default: []
      },
      isDisable:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        imageUrls: [],  //table各个数据
      };
    },
    created() {
      let num = this.titles.length;
//    {“PSSJ”:”时间”,"PSDD":"上海","TPSM":"图片说明",“ImgPath”:”图片路径”,”Index”:”第几张”}

//    [{"ID":包装图片表 ID序号 新增ID=0，修改ID为自己值,
//      "QCID":"主表ID",
//      "IMGTYPE":1,
//      "NAME":"Test",
//“ImgItem”:”[{“PSSJ”:”时间”,"PSDD":"上海","TPSM":"图片说明",“ImgPath”:”图片路径”,”Index”:”第几张”}]”
      if (this.QCITEM.length > 0) {
        this.imageUrls = JSON.parse(JSON.stringify(this.QCITEM));
      } else {
        for (let i = 0; i < num; i++) {
          let item = {};
          item.ID = 0;
          item.QCID = "";
          item.IMGTYPE = 1;
          item.NAME = this.titles[i];
          item.IMGITEM = [];
          for (let j = 0; j < 3; j++) {
            let imgItem = {
              PSSJ: "",
              PSDD: "",
              TPSM: "",
              ImgPath: "",
              Index: j
            };
            item.IMGITEM.push(imgItem);
          }
          this.imageUrls.push(item);
        }
      }
      console.log(this.imageUrls);
    },
    computed: {},
    methods: {
      handlesuccess(FilePath, {row, col}) {
        // 自定义的设置filepath 事件
        this.imageUrls[row].IMGITEM[col].ImgPath = FilePath;
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../../assets/style/var";

  .c-table {
    .w8rem {
      width: 8rem;
    }
    .c-td-text {
      width: 6rem;
    }
    .c-td-img {
      min-height: 5rem;
      height: 5rem;
      width: calc(~"(100vw - 15rem)/3");
    }
  }
</style>
