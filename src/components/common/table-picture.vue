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
  import {Toast} from 'mint-ui';
  import Axios from "axios";
  import $ from 'jquery';

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
      isDisable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        imageUrls: [],  //table各个数据
        PSDD: ""// 保存地点
      };
    },
    created() {
      let num = this.titles.length;

      // this.showPosition();
      this.getCurrenLocation();
      if (this.QCITEM.length > 0) {
        this.imageUrls = this.QCITEM.map(item => {
          return {
            ID: item.ID,
            QCID: item.QCID,
            IMGTYPE: item.IMGTYPE,
            NAME: item.NAME,
            IMGITEM: JSON.parse(item.IMGITEM)
          }
        });
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

    },
    watch: {
      QCITEM(value, oldValue) {
        if (this.QCITEM.length > 0) {
          this.imageUrls = this.QCITEM.map(item => {
            return {
              ID: item.ID,
              QCID: item.QCID,
              IMGTYPE: item.IMGTYPE,
              NAME: item.NAME,
              IMGITEM: JSON.parse(item.IMGITEM)
            }
          });
        }
      },
    },
    computed: {},
    methods: {
      handlesuccess(FilePath, {row, col}) {

        this.imageUrls[row].IMGITEM[col].PSDD = this.PSDD;
        this.imageUrls[row].IMGITEM[col].PSSJ = this.formatDateTime(new Date());
        // 自定义的设置filepath 事件
        this.imageUrls[row].IMGITEM[col].ImgPath = FilePath;
      },

      showPosition(position) {
        let latlon = position.coords.latitude + ',' + position.coords.longitude;
        let self = this;
        let url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&location=" + latlon + "&output=json&pois=0";
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: url,
          success: function (json) {
            if (json.status == 0) {
              self.PSDD = json.result.addressComponent.street + json.result.addressComponent.street_number;
            }
          },
        });
      },
      getCurrenLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition, (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                Toast("定位失败,用户拒绝请求地理定位");
                break;
              case error.POSITION_UNAVAILABLE:
                Toast("定位失败,位置信息是不可用");
                break;
              case error.TIMEOUT:
                Toast("定位失败,请求获取用户位置超时");
                break;
              case error.UNKNOWN_ERROR:
                Toast("定位失败,定位系统失效");
                break;
            }
          });
        } else {
          Toast("浏览器不支持地理定位。");
        }
      },
      formatDateTime(date) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
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
