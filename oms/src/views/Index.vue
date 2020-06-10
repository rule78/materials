<template>
  <Row type="flex" class="index-modules">
    <MenuBar class="side-bar-menu"></MenuBar>
    <i-col span="24" class="main-con">
      <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    </i-col>
  </Row>
</template>

<script>
import MenuBar from '@/components/MenuBar';

export default {
  components: {
    MenuBar,
    // Breadcrumb,
  },
};
</script>

<style lang="less">
// @import '~assets/colors.less';
.index-modules {
  width: 100%;
  box-sizing: border-box; // background: #fff;
  min-height: 100%;
  margin-top: 15px;
  position: relative;
  flex: 1; // border: 1px solid @borderColor;
  .side-bar-menu {
    border-radius: 2px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12;
    height: 100%;
    width: 180px;
    &>div {
      height: 100%;
      width: 180px !important;
    }
    .ivu-menu {
      height: 100%; // padding-top: 77px;
      .ivu-menu-item {
        padding: 5px 24px;
      }
    }
    .ivu-menu-vertical .ivu-menu-submenu-title {
      padding: 14px;
    }
  }
  .main-con {
    &>div {
      padding: 10px;
      background: #fff;
      border-radius: 2px;
    }
  }
}

@media (min-width: 899px) {
  .main-con {
    padding-left: 195px;
  }
}

@media (max-width: 900px) {
  .production-modules {
    .side-bar-menu {
      width: 60px;
      transition: all 0.2s ease-out;
      &>div {
        width: 60px !important
      }
      .menubar {
        .text {
          display: none;
        }
        .ivu-menu {
          position: absolute;
          top: 0;
          left: 60px;
          background: #313540;
          width: auto;
          white-space: nowrap;
          border-radius: 2px;
          height: 0; // overflow: hidden;
          display: none !important;
          transition: all 0.3s linear;
          z-index: 13;
          z-index: 13;
          &:before {
            content: '';
            display: block;
            position: absolute;
            top: 28px;
            left: -12px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 6px;
            border-color: transparent #313540 transparent transparent;
          }
          .ivu-menu-item {
            padding-left: 24px;
          }
        }
        .ivu-menu-submenu:hover {
          position: relative;
          .ivu-menu {
            opacity: 1;
            height: auto;
            display: block !important;
          }
        }
        .ivu-menu-submenu-title {
          text-align: center;
          font-size: 24px;
          z-index: inherit;
        }
        .ivu-menu-submenu-title-icon {
          display: none;
        }
      }
    }
    .main-con {
      padding-left: 75px;
    }
  }
}
</style>
