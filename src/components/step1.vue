<template>
  <div>
    <mt-header title="">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    step1
  </div>
</template>

<script>
  export default {
    name: 'step1',
    data() {
      return {

      }
    },
    created(){

    },
    computed:{

    },
    methods: {
//
    }
  }
</script>

<style lang="less">
  @import "../assets/style/var";

</style>
