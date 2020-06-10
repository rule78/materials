<template>
  <div class="login-container">
    <div class="login-con">
      <Input v-model="username" type="text" icon="person" placeholder="请输入用户名" maxLength="15" @on-enter="handleLogin" style="width: 200px">
      </Input>
      <Input v-model="password" type="password" icon="key" placeholder="请输入密码" maxLength="15" @on-enter="handleLogin" style="width: 200px">
      </Input>
      <Button type="primary" @click="handleLogin" long>
        <span v-if="!loading">登录</span>
        <span v-else>Loading...</span>
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      redirect: '/',
    };
  },
  methods: {
    handleLogin() {
      if (this.username.match(/^(\s)*$/g)) {
        this.$Message.info('帐号不能为空');
        return false;
      }

      if (this.password.match(/^(\s)*$/g)) {
        this.$Message.info('密码不能为空');
        return false;
      }

      this.loading = true;
      this.handleSubmit();
      return true;
    },
    async handleSubmit() {
      const rs = await this.$store.dispatch('auth/login', {
        username: this.username,
        password: this.password,
      });
      if (!rs) {
        this.$Message.error('登录失败');
      } else {
        this.$Message.info('登录成功');
        this.$router.replace(decodeURIComponent(this.redirect));
      }
      this.loading = false;
    },
  },
  beforeRouteEnter: (to, from, next) => {
    const redirect = to.query.redirect ? to.query.redirect : '/';
    next((vm) => {
      vm.redirect = redirect;
    });
  },
};
</script>

<style lang="less">
@import '~assets/colors.less';
.login-container {
  background: url(~assets/jianke.png) no-repeat center center;
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center; // transform: rotate(1deg);
  .login-con {
    width: 300px;
    margin: 0px auto 0 auto;
    border: 1px solid @borderColor;
    padding: 50px;
    box-sizing: border-box;
    border-radius: 6px;
    background: @grayMainColor;
    box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.3);
    &>div {
      width: 200px;
      padding: 0 0 20px 0;
      display: block;
    }
  }
}
</style>
