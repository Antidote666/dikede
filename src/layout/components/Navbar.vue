<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="navbar-row-head">
      <img src="@/assets/common/humber-logo.png" alt="" class="logo">
      <div class="elright">
        <el-row justify="space-between" type="flex" align="middle" style="height: 100%;">
          <el-col :span="5">
            <el-avatar src="https://img2.baidu.com/it/u=4064025444,3686295405&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1664211600&t=4de78ca17229f98c061a1b6903b64104" />
          </el-col>
          <el-col :span="14">
            <span>欢迎您，admin</span>
          </el-col>
          <el-col :span="5">
            <el-tooltip effect="dark" content="退出" placement="bottom">
              <span class="tooltip-span" @click="logout">退出</span>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      // this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // await this.$store.dispatch('user/logout')
      this.$store.commit('user/SET_TOKEN', null)
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background-image:url('~@/assets/common/navbar.png');
  height: 60px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  background-size: cover;
  background-repeat: no-repeat;
  .navbar-row-head{
    height: 100%;
    .logo {
    width: 88px;
    position: relative;
    top: 4px;
    margin-top: 6px;
    margin-left: 15px;

    }
  }
  .elright{
      float: right;
    width: 240px;
    height: 100%;
    margin-right: 24px;
    color: #fff;
    }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .tooltip-span{
      vertical-align: middle;
       cursor: pointer;
    }
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
