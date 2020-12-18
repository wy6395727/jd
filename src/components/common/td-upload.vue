<template>
  <div class="td">
    <el-upload
      class=""
      action="/api/qcservice/UpLoadImg"
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
      this.imageUrl=this.imgpath;
    }
  },
  watch:{
    imgpath(v,oV){
      if(this.imgpath&&this.imgpath!=""){
        this.imageUrl=this.imgpath;  //todo
      }
    }
  },
  computed:{
    fullImageUrl(){
      if(this.imageUrl.indexOf("blob")!=-1){
        return this.imageUrl;
      }else{
        return `/api/qcservice/DownLoadFile?imgurl=${this.imageUrl}`
        // if(process.env.NODE_ENV == "development"){
        //   return `/api/qcservice/DownLoadFile?imgurl=${this.imageUrl}`
        // }else{
        //   // return `http://qctest.jade-fashion.com/api/qcservice/DownLoadFile?imgurl=${this.imageUrl}`
        //   return `http://jadeqc.jade-fashion.com:8080/api/qcservice/DownLoadFile?imgurl=${this.imageUrl}`
        // }
      }
    }
  },
  methods: {
    //上傳圖片
     httpRequest(item) {
      let reader = new FileReader();
      let that=this;
      reader.readAsDataURL(item.file);
      reader.onloadend = function(x) {
        that.render(reader.result,x).then(blob=>{
          Api.UpLoadImg({ImgBase64:blob})
          .then(res => {
            that.handlesuccess(res);
          })
          .catch(err => console.log(err));
        });
      };
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
      this.imageUrl = objURL;
    },
    handlesuccess(response) {
      let FilePath = response.data.DATAOBJ.FilePath;
      this.$emit("handlesuccess", FilePath, this.tdindex);
    },

    handlePictureCardPreview(file){
      this.dialogVisible = true;
    },
    //上傳圖片--end

    //设置压缩图片的最大高度
    render(src,picname) {

       return new Promise(resolve => {
         var MAX_HEIGHT = 1000;
         // 创建一个 Image 对象
         var image = new Image();
         // 绑定 load 事件处理器，加载完成后执行

         image.onload = function() {
           // 获取 canvas DOM 对象
           var canvas = document.createElement("canvas");
           // 如果高度超标
           if (image.height > MAX_HEIGHT && image.height >= image.width) {
             // 宽度等比例缩放 *=
             image.width *= MAX_HEIGHT / image.height;
             image.height = MAX_HEIGHT;
           }
           //考录到用户上传的有可能是横屏图片同样过滤下宽度的图片。
           if (image.width > MAX_HEIGHT && image.width > image.height) {
             // 宽度等比例缩放 *=
             image.height *= MAX_HEIGHT / image.width;
             image.width = MAX_HEIGHT;
           }

           // 获取 canvas的 2d 画布对象,
           var ctx = canvas.getContext("2d");
           // canvas清屏，并设置为上面宽高
           ctx.clearRect(0, 0, canvas.width, canvas.height);
           // 重置canvas宽高
           canvas.width = image.width;
           canvas.height = image.height;
           // 将图像绘制到canvas上
           ctx.drawImage(image, 0, 0, image.width, image.height);
           // !!! 注意，image 没有加入到 dom之中
           //        document.getElementById('img').src = canvas.toDataURL("image/png");
           var blob = canvas.toDataURL("image/jpeg");
           //将转换结果放在要上传的图片数组里
           // imgarr.push({"pic":blob,"pic_name":picname});

           resolve(blob);
         };
         image.src = src;

       })

    }//到这里我们图片压缩的代码就结束了。我们再加上，一个事件控制把需要上传的图片数组传给后台就行啦。

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
