<template>
  <div id="app">
    <span class="icon-google-plus2"></span>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){

  },
  methods:{
  }
}
</script>

<style lang="less">
  @import "./assets/style/reset-ui";
  @import "./assets/style/common";

  /*@import "./icomoon/style";*/
  body{
    margin: 0px;
    background-color: rgba(226, 230, 238, 0.29);
  }
</style>
