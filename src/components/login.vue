<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>捷得服饰</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入手机号"><span></span></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <mt-button type="primary" @click="loginMethod('loginForm')" class="submit_btn">登陆</mt-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
  import Api from "../axios/api";
  import {Toast} from "mint-ui";
  let self;
  export default {
    components: {},
    name: 'loginPage',

    data() {
      return {
        showLogin:true,
        loginForm:{
          username:"",
          password:""
        },
        rules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        }
      }
    },
    created() {
      self = this;
    },
    methods: {
       loginMethod(formName) {

        this.$refs[formName].validate((valid) => {
          if(valid){
            Api.Login({name: this.loginForm.username, password: this.loginForm.password}).then(res=>{
              if (res.data.STATUS == 1) {
                self.$store.commit("LOGIN_UP",res.data.DATAOBJ);
                if(self.$route.query.redirect){
                  let redirect=self.$route.query.redirect;
                  self.$router.push({path:redirect});
                }else{
                  self.$router.push({name:"home"});
                }
              }else{
                Toast(res.data.MESSAGE)
              }
            });
          }else{
            Toast('用户名或密码格式错误');
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/style/mixin";

  .login_page{
    height: 100vh;
    background-color: #324057;
  }
  .manage_tip{
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p{
      font-size: 34px;
      color: #fff;
    }
  }
  .form_contianer{
    .wh(320px, 200px);
    .ctp(320px, 210px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn{
      width: 100%;
      font-size: 16px;
    }
  }
  .tip{
    font-size: 12px;
    color: red;
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
