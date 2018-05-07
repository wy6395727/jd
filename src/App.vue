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
    console.log(process.env)
  },
  methods:{
  },

}
</script>

<style lang="less">
  @import "./assets/style/reset-ui";
  @import "./assets/style/common";

  /*@import "./icomoon/style";*/

</style>
