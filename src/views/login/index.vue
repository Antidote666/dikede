<template>
  <div class="login-container">
    <div class="login-form">
      <img src="@/assets/common/logo.png" alt="">
      <el-form ref="loginForm" :model="formDate" :rules="rules">

        <el-form-item prop="loginName">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="formDate.loginName" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input ref="pwdRef" v-model="formDate.password" :type="passwordType==='password'?'password':'text'" placeholder="请输入密码" />
          <span class="svg-container" @click="showPwd">
            <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="code">
          <el-row justify="space-between">
            <el-col :span="17">
              <i class="el-icon-setting svg-container" />
              <el-input v-model="formDate.code" placeholder="请输入验证码" />
            </el-col>
            <el-col :span="7">
              <img :src="codeImg" alt="" @click="getCode()">
            </el-col>

          </el-row>
        </el-form-item>
        <el-button :loading="loading" class="loginBtn" @click="login">登录</el-button>

      </el-form>
    </div>
  </div>
</template>

<script>
import { getCode } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      passwordType: 'password',
      formDate: {
        loginName: 'admin',
        password: 'admin',
        loginType: 0,
        code: '',
        clientToken: 0
      },
      rules: {
        loginName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigget: 'blur' },
          { min: 4, max: 6, message: '密码格式不正确', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigget: 'blur' },
          { min: 4, max: 4, message: '验证码格式不正确', trigger: 'blur' }
        ]
      },
      loading: false,
      codeImg: ''
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    async getCode() {
      this.formDate.clientToken = Math.random().toString().substring(3)
      const data = await getCode(this.formDate.clientToken)
      this.codeImg = data.config.url
      console.log(data)
    },
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
      this.$nextTick(() => {
        this.$refs.pwdRef.focus()
      })
    },
    async login() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/loginAction', this.formDate)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#d3e4ff;
$light_gray:#68b0fe;;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png');
  background-position: center; // 将图片位置设置为充满整个屏幕
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #999999;
      height: 47px;
      caret-color: #999999;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    width: 100%;
    height: 52px;
    margin-bottom: 24px;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
  }
  .el-form-item__error {
    color: #f56c6c
  }
  .el-form-item__content{
    line-height: unset;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: absolute;
    top: 50%;
    left:  50%;
    padding: 76px 35px 0;
    transform: translate(-50%,-50%);
    background-color: #fff;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    width: 518px;
    height: 388px;
   > img{
      position: absolute;
      width: 96px;
      height: 96px;
      top: -46px;
      left: 50%;
      margin-left: -48px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .loginBtn {
    width: 100%;
    height: 52px;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    opacity: .91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
  }
}
</style>
