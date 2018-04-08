<template>
     <table class="c-table">
      <tr v-for="(title,i) in titles" :key="title.key">
        <td class="w8rem">{{title}}{{i}}</td>
        <td>
          <table style="width:100%; ">
            <tr height="90">
              <td class="c-td-text">图片</td>
              <td
               class="c-td c-td-img"
               v-for="j in 3"
               :key="j.key"
               >
                <td-upload :tdindex="{row:i,col:j}" @handlechange="handlechange"></td-upload>
              </td>
          </tr>
          <tr>
            <td class="c-td-text">图片说明</td>
            <td class="c-td"></td>
            <td class="c-td"></td>
            <td class="c-td"></td>
          </tr>
           <tr>
            <td class="c-td-text">拍摄时间</td>
            <td class="c-td"></td>
            <td class="c-td"></td>
            <td class="c-td"></td>
          </tr>
          <tr>
            <td class="c-td-text">拍摄地点</td>
            <td class="c-td"></td>
            <td class="c-td"></td>
            <td class="c-td"></td>
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
    }
  },
  data() {
    return {
      imageUrls: [],
    };
  },
  created() {
    let num = this.titles.length;

    for (let i = 0; i < num; i++) {
      this.$set(this.imageUrls, i, []);
      for (let j = 0; j < 3; j++) {
        this.$set(this.imageUrls[i], j, {
          imageUrl: "",
          desc: "",
          time: "",
          site: ""
        });
      }
    }

    console.log(this.imageUrls);
  },
  computed: {},
  methods: {
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
    width: calc((100vw- 15rem)/3);
  }
}
</style>
