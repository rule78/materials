<template>
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    beforeRouteEnter: (to, from, next) => {
      next();
    },
  };
</script>

<style lang="less" scoped>
  .main-container {
    max-width: 1300px;
    margin: 0 auto;
  }
</style>
