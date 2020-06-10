<template>
  <Affix>
    <Menu @on-select="handleSelect" class="menubar" width="auto" :active-name="activeName" :open-names="openNames" :accordion="true" theme="dark">
      <Submenu v-for="(menu,index) in menus" v-if="handleMenuAuthority(menu)" :name="menu.name" :key="index">
        <template slot="title">
          <Icon :type="menu.icon"></Icon>
          <span class="text">{{menu.title}}</span>
        </template>
        <Menu-item v-for="(submenu,subIndex) in menu.submenu" v-if="hasAuthority(submenu)" :name="submenu.link" :key="index + '-' + subIndex">
          {{submenu.title}}
        </Menu-item>
      </Submenu>
    </Menu>
  </Affix>
</template>

<script>
import { projectMenus } from '@/config/modules';

export default {
  data() {
    return {
      menus: projectMenus,
      activeName: '',
    };
  },
  computed: {
    openNames() {
      const { length } = Object.keys(this.$router.currentRoute.params);
      const tempAr = this.$router.currentRoute.fullPath.split('/');
      return [tempAr[(tempAr.length - length) - 2]];
    },
  },
  mounted() {
    const { length } = Object.keys(this.$router.currentRoute.params);
    const tempAr = this.$router.currentRoute.fullPath.split('/');
    this.activeName = tempAr.slice(0, tempAr.length - length).join('/');
  },
  methods: {
    handleMenuAuthority(value) {
      const authority = this.$store.state.auth.authorities;
      const options = {};
      const temp = value.submenu;
      if (!temp.length) {
        return false;
      }
      temp.forEach((v) => {
        options[(v.view.split(':').slice(0, 2).join(':'))] = v.view;
      });
      return Object.keys(authority).some(c => c.split(':').slice(0, 2).join(':') in options);
    },
    hasAuthority(submenu) {
      const authority = this.$store.state.auth.authorities;
      return Object.keys(authority).some(v => v === submenu.view);
    },
    handleLogout() {
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.replace('/login');
        });
    },
    handleSelect(name) {
      this.$router.push(name);
    },
  },
};
</script>

<style lang="less">
</style>
