<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 14:55:24
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-10 15:19:24
-->
<template>
  <div class="nav-bar">
    <div class="nav-ham-bre">
      <div class="nav-bar-left">
        <div class="logo-box">
          <span>{{ title }}</span>
        </div>
      </div>
      <Hamburger id="hamburger-container" :is-active="sideBar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div class="nav-bar-right">
      <p>欢迎，{{ name }}</p>
      <i class="iconfont icon-wrench" @click="modifyPassword" />
      <i class="iconfont icon-logout" @click="openLogout" />
    </div>

    <ModifyPassword
      :visible.sync="passwordVisible"
    />
  </div>

</template>
<script>
import { mapGetters } from 'vuex'
import Hamburger from 'src/components/Hamburger'
import Breadcrumb from 'src/components/Breadcrumb'
import ModifyPassword from 'src/components/ModifyPassword'
const { title } = require('src/settings')
export default {
  name: 'NavBar',
  components: {
    Hamburger,
    Breadcrumb,
    ModifyPassword
  },
  data() {
    return {
      passwordVisible: false,
      title
    }
  },
  computed: {
    ...mapGetters([
      'sideBar',
      'name'
    ]),
    name() {
      return localStorage.getItem('name')
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    openLogout() {
      this.$confirm('是否确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(e => {
        // console.log(e)
      })
    },
    logout() {
      // 登出
      this.$store.dispatch('user/logout')
        .then(res => {
          this.$router.push('/login')
        })
    },
    modifyPassword() {
      // 修改密码
      this.passwordVisible = true
    }
  }
}
</script>
