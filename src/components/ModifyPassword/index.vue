<!--
 * @Description: ModifyPassword 修改密码
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-04 15:38:27
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-27 14:00:30
-->
<template>
  <ElDialog
    v-bind="$attrs"
    width="520px"
    title="密码修改"
    append-to-body
    :close-on-click-modal="false"
    class="password-dialog"
    v-on="$listeners"
    @close="cancel"
  >
    <ElForm ref="midifyForm" :model="form" :rules="rules" label-width="100px">

      <ElFormItem label="原密码" prop="oldPassword">
        <ElInput v-model="form.oldPassword" placeholder="输入原密码" />
      </ElFormItem>

      <ElFormItem label="新密码" prop="newPassword">
        <ElInput v-model="form.newPassword" placeholder="输入新密码" />
      </ElFormItem>

      <ElFormItem label="确认新密码" prop="sureNewPassword">
        <ElInput v-model="form.sureNewPassword" placeholder="输入新密码" />
      </ElFormItem>
    </ElForm>

    <span slot="footer" class="dialog-footer">
      <ElButton type="primary" @click.native.prevent="save">保存</ElButton>
      <ElButton @click.native.prevent="cancel">取消</ElButton>
    </span>
  </ElDialog>
</template>

<script>
// 修改密码
import { midifyPassword } from 'src/api/login'
export default {
  name: 'ModifyPassword',
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        sureNewPassword: ''
      },
      rules: {
        oldPassword: { required: true, message: '请输入原密码', trigger: 'blur' },
        newPassword: { required: true, message: '请输入新密码', trigger: 'blur' },
        sureNewPassword: { required: true, message: '请输入新密码', trigger: 'blur' }
      }
    }
  },
  methods: {
    save() {
      // 保存
      this.$refs.midifyForm.validate(valid => {
        if (valid) {
          if (this.form.newPassword !== this.form.sureNewPassword) {
            this.$message({
              type: 'warning',
              message: '新密码和确认密码不匹配!'
            })
            return
          }
          this.midifyPassword()
        }
      })
    },
    async midifyPassword() {
      // 修改密码
      try {
        await midifyPassword({
          ...this.form
        })
        localStorage.removeItem('name')
        this.$emit('update:visible', false)
        this.$router.push('/login')
      } catch (error) {
        console.log(error)
      }
    },
    cancel() {
      // 保存
      this.$refs.midifyForm.resetFields()
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.password-dialog /deep/ {
  .el-dialog__body {
    padding: 20px 20px 10px;
  }
}
</style>
