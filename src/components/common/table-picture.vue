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
               >
                <div class="dd">
                  <el-upload
                    class=""
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-change="handlePictureChange1"
                    :auto-upload="false"
                    :before-upload="beforeAvatarUpload1">
                    <img v-if="imageUrls[i][0].imageUrl" :src="imageUrls[i][0].imageUrl" class="img-upload">
                    <div v-else>
                      <i class  ="el-icon-plus avatar-uploader-icon"></i>
                      <span class="el-plus-span">上传图片</span>
                    </div>
                  </el-upload>
                </div>
              </td>
              <td
               class="c-td c-td-img"
               >
                <div class="dd">
                  <el-upload
                    class=""
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-change="handlePictureChange1"
                    :auto-upload="false"
                    :before-upload="beforeAvatarUpload1">
                    <img v-if="imageUrls[i][1].imageUrl" :src="imageUrls[i][0].imageUrl" class="img-upload">
                    <div v-else>
                      <i class  ="el-icon-plus avatar-uploader-icon"></i>
                      <span class="el-plus-span">上传图片</span>
                    </div>
                  </el-upload>
                </div>
              </td>
              <td
               class="c-td c-td-img"
               >
                <div class="dd">
                  <el-upload
                    class=""
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-change="handlePictureChange1"
                    :auto-upload="false"
                    :before-upload="beforeAvatarUpload1">
                    <img v-if="imageUrls[i][2].imageUrl" :src="imageUrls[i][0].imageUrl" class="img-upload">
                    <div v-else>
                      <i class  ="el-icon-plus avatar-uploader-icon"></i>
                      <span class="el-plus-span">上传图片</span>
                    </div>
                  </el-upload>
                </div>
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
export default {
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

      arr2: [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
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
   
    //上傳圖片
    beforeAvatarUpload1(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handlePictureChange1(file, fileList,i) {
      // debugger
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList);
    }
    //上傳圖片--end
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
.avatar-uploader-icon {
  font-size: 1.5rem;
  color: #8c939d;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
}
.el-plus-span {
  color: @ctxt;
}
.img-upload {
  width: 100%;
  height: 5rem;
  display: block;
}
</style>
