<template>
  <div class="td">
    <el-upload
      class=""
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handlechange"
      :on-success="handlesuccess"
      :before-upload="beforeAvatarUpload1">
        <img ref="img" v-if="imageUrl" :src="imageUrl" class="img-upload">
        <div v-else>
          <i class  ="el-icon-plus avatar-uploader-icon"></i>
          <span class="el-plus-span">上传图片</span>
        </div>
    </el-upload>
  </div>
</template>
<script>
    export default {
        components: {},
        name: 'td-upload',
        props:['tdindex'],
        data() {
            return {
              imageUrl:''
            }
        },
        created() {

        },
        methods: {
          //上傳圖片
          beforeAvatarUpload1(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt10M = file.size / 1024 / 1024 < 10;

            if (!isLt10M) {
              Toast("上传头像图片大小不能超过 10MB!");
            }
            return isLt10M;
          },
          handlechange(file) {
            // debugger
            let objURL=URL.createObjectURL(file.raw);
            this.imageUrl = objURL;
            this.$emit('handlesuccess',this.tdindex);

            this.$refs.img.onload = function(){
              window.URL.revokeObjectURL(objURL);
            };
          },
          handlesuccess(response,file) {
            console.log(file, fileList);
            this.$emit('handlesuccess',response,this.tdindex);
          }
          //上傳圖片--end
        }
    }
</script>
<style lang="less" scoped>
  @import "../../assets/style/var";

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
