<template>
  <div class="td">
    <el-upload
      class=""
      action="http://qctest.jade-fashion.com/api/qcservice/UpLoadImg"
      accept="image/*" capture="camera"
      :show-file-list="false"
      :http-request="httpRequest"
      :on-change="handlechange"
      :before-upload="beforeAvatarUpload1"
      :on-preview="handlePictureCardPreview"
      :disabled="isDisable"
    >
        <img ref="img" v-if="imageUrl" :src="fullImageUrl" class="img-upload">
        <div v-else>
          <i class  ="el-icon-plus avatar-uploader-icon"></i>
          <span class="el-plus-span">上传图片</span>
        </div>
    </el-upload>
  </div>
</template>
<script>
import Api from "@/axios/api";
var self;
export default {
  components: {},
  name: "td-upload",
  props:{
    tdindex:{
      type:Object
    },
    imgpath:{
      type:String
    },
    isDisable:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      imageUrl: "",
      dialogVisible:false
    };
  },
  created() {
    self=this;

    if(this.imgpath&&this.imgpath!=""){
      this.imageUrl=this.imgpath;  //todo
    }
  },
  computed:{
    fullImageUrl(){
      if(this.imageUrl.indexOf("blob")!=-1){
        return this.imageUrl;
      }else{
        return `/api/qcservice/DownLoadFile?imgurl=${this.imageUrl}`
      }
    }
  },
  methods: {
    //上傳圖片
     httpRequest(item) {
      // let formData = new FormData();
      // let base64Data;
      // formData.append('ImgBase64', base64Data);
      let reader = new FileReader();
      let that=this;
      reader.readAsDataURL(item.file);
      reader.onloadend = function() {
        // formData.append("ImgBase64", reader.result);
        console.log(reader.result)
        Api.UpLoadImg({ImgBase64:reader.result})
          .then(res => {
//            let FilePath = res.data.DATAOBJ.FilePath;
//            self.$emit("handlesuccess", FilePath, self.tdindex);
            that.handlesuccess(res);
          })
          .catch(err => console.log(err));
      };
      // console.log('上传图片接口-参数', item.file, base64Data);
    },
    beforeAvatarUpload1(file) {
      const isImg = file.type.indexOf("image/") == 0;
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isLt10M) {
        Toast("上传头像图片大小不能超过 10MB!");
      }
      if (!isImg) {
        Toast("图片格式错误!");
      }
      return isLt10M && isImg;
    },
    handlechange(file) {
      let objURL = URL.createObjectURL(file.raw);
      console.log(objURL)
      this.imageUrl = objURL;
    },
    handlesuccess(response) {
      //            this.$refs.upload.submit();
      let FilePath = response.data.DATAOBJ.FilePath;
      this.$emit("handlesuccess", FilePath, this.tdindex);
    },

    handlePictureCardPreview(file){
      this.dialogVisible = true;
       debugger
    }
    //上傳圖片--end
  }
};
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
