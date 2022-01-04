<!--
 * @Description: Login 登录
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-03 15:25:27
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-11 10:43:26
-->
<template>
  <div class="login-container">
    <p class="title">智能云工业工厂管理系统</p>
    <ElForm ref="loginForm" :model="form" :rules="rules" class="login-form">
      <ElFormItem label="" prop="loginName">
        <i class="el-icon-user icon" />
        <ElInput
          ref="loginName"
          v-model="form.loginName"
          autocomplete="on"
        />
      </ElFormItem>

      <ElFormItem label="" prop="password">
        <i class="el-icon-lock icon" />
        <ElInput
          ref="password"
          v-model="form.password"
          autocomplete="on"
          show-password
          @keyup.native.enter.exact="loginHandler"
        />
      </ElFormItem>

      <!-- <ElFormItem label="" prop="verifyCode">
        <img :src="require('src/assets/icons/verify.svg')" alt="验证图标" class="verify-icon">
        <ElInput v-model="login.verifyCode" class="verify-code" />
        <span>图形验证码站位</span>
      </ElFormItem> -->

      <ElButton
        type="primary"
        class="login-btn"
        @click.native.prevent="loginHandler"
      >
        登录
      </ElButton>
    </ElForm>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        loginName: '',
        password: ''
      },
      rules: {
        loginName: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      },
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.form.loginName === '') {
      this.$refs.loginName.focus()
    } else if (this.form.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    loginHandler() {
      // 登录
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.form)
          .then(res => {
            this.$router.push({
              path: this.redirect || '/',
              query: this.otherQuery
            })
          })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background: #05276F;
  overflow: hidden;
  position: relative;

  .title {
    font-size: 48px;
    color: #FFF;
    margin-top: 15vh;
    text-align: center;
    letter-spacing: 4px;
    text-shadow: 0 0 8px #fff;
  }

  .login-form {
    position: absolute;
    top: 35vh;
    left: 50%;
    transform: translate(-50%, 0);
    width: 380px;
  }

  /deep/ .el-form-item {
    margin-bottom: 30px;
  }

  /deep/ .el-form-item__content {
    display: flex;

    .el-form-item__error {
      left: 42px;
    }

    .icon {
      width: 30px;
      line-height: 36px;
      text-align: left;
      font-size: 30px;
      margin-right: 12px;
      color: #fff;
    }

    .verify-icon {
      margin-left: 2px;
      margin-right: 12px;
    }

    .verify-code {
      width: 200px;
    }
  }

  .login-btn {
    width: 337px;
    margin-left: 43px;
    letter-spacing: 2px;
    font-size: 15px;
  }
}
</style>
