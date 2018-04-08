<template>
  <div>
    <mt-header title="">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

  </div>
</template>

<script>
import Draw from "./common/draw";

  export default {
    name: 'step2',
    components:{Draw},
    data() {
      return {

      }
    },
    created(){

    },
    computed:{

    },
    methods: {

    }
  }
</script>

<style lang="less">
  @import "../assets/style/var";

</style>
