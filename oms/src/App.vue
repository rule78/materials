<template>
  <div id="app">
    <MainHeader title="CNPROJECTNAME" :userInfo="userInfo"></MainHeader>
    <MainContainer></MainContainer>
  </div>
</template>

<script>
import MainHeader from 'main-header-admin';
import MainContainer from '@/components/MainContainer';
import * as types from '@/store/types';

export default {
  name: 'app',
  components: {
    MainHeader,
    MainContainer,
  },
  computed: {
    userInfo() {
      return this.$store.state.auth;
    },
    errorMessages() {
      return this.$store.state.errorMessages;
    },
    successMessages() {
      return this.$store.state.successMessages;
    },
  },
  watch: {
    errorMessages(val) {
      const errors = Object.keys(val);
      if (errors.length) {
        const errorKey = errors[0];
        this.$Message.error({
          content: val[errorKey],
          duration: 3,
        });
        this.$store.commit(types.REMOVE_ERROE_MESSAGE, errorKey);
      }
    },
    successMessages(val) {
      const errors = Object.keys(val);
      if (errors.length) {
        const errorKey = errors[0];
        this.$Message.success({
          content: val[errorKey],
          duration: 3,
        });
        this.$store.commit(types.REMOVE_SUCCESS_MESSAGE, errorKey);
      }
    },
  },
};
</script>

<style lang="less">
@import '~normalize.css/normalize.css';
@import '~iview/dist/styles/iview.css';
@import '~assets/colors.less';
@import '~assets/common.less';
 ::-webkit-scrollbar {
    width: 2px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(100, 100, 100, 0.2);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(160, 160, 160, 0.6);
    border-radius: 10px;
  }

  #app {
    /* width: calc(~'100vw - 40px'); */
    width: 100%;
    /* margin-left: 20px; */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: @bodyBackground;
    min-width: 800px;
  .main-container {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }
  }
</style>
