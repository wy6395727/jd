<template>
  <div class="company-title">
    <div>捷得服饰（上海）有限公司品质质检报告（<slot name="txt"></slot>）</div>
    <div>Jade Fashion&CO.INC</div>
  </div>
</template>
<script>
    export default {
        components: {},
        name: '',
        data() {
            return {}
        },
        created() {

        },
        methods: {}
    }
</script>
<style lang="less" scoped>
  .company-title {
    text-align: center;
    background-color: #fff;
    margin: 1.5rem 0 1rem;
    padding: 0.5rem;
    & > div {
      padding: 0.25rem;
    }
  }
</style>
