<!--
 * @Description: Redirct
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-11 18:18:18
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-25 16:48:06
-->
<script>
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
