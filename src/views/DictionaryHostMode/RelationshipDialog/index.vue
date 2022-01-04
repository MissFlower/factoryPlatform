<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-01-27 14:24:42
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-25 14:03:17
-->
<template>
  <ElDialog
    v-bind="$attrs"
    width="400px"
    top="20vh"
    class="relationship-dialog"
    v-on="$listeners"
    @closed="cancel"
  >
    <ElForm ref="form" :model="form" :rules="rules" label-width="80px">
      <ElFormItem label="型号" prop="modelCode">
        <ModelSelect
          ref="model"
          v-model="form.modelCode"
          origin="ERP"
          placeholder="请选择型号"
          @getList="getModelList"
        />
      </ElFormItem>

      <ElFormItem label="工序" prop="process" class="required-item">
        <ProductionProcesses v-model="form.process" placeholder="请选择工序" />
      </ElFormItem>

      <ElFormItem label="硬件版本" prop="hardwareVersion">
        <ElInput v-model="form.hardwareVersion" v-emoji placeholder="请输入新增版本" />
      </ElFormItem>
    </ElForm>

    <div class="tips">如未找到型号，请先在ERP创建</div>

    <span slot="footer" class="dialog-footer">
      <ElButton @click="cancel">取消</ElButton>
      <ElButton type="primary" @click="sure">确认</ElButton>
    </span>
  </ElDialog>
</template>

<script>
// 新增关系Dialog
import ModelSelect from 'src/components/ModelSelect'
import ProductionProcesses from 'src/components/ProductionProcesses'
import { addHardwareRelation } from 'src/api/dataDictionary'
import emoji from 'src/directive/emoji'
import { getByteLen } from 'src/utils'
import { MODEL_NAME } from 'src/common/constants'
export default {
  name: 'RelationshipDialog',
  components: {
    ModelSelect,
    ProductionProcesses
  },
  directives: {
    emoji
  },
  data() {
    const hardwareRule = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(`请输入${rule.label}`))
      } else if (getByteLen(value) > 10) {
        return callback(new Error('请输入10个以内的字节!'))
      } else {
        callback()
      }
    }
    return {
      MODEL_NAME,
      initModelCode: '',
      form: {
        modelCode: '',
        process: MODEL_NAME.COMMUNICATION_BOARD,
        hardwareVersion: ''
      },
      rules: {
        hardwareVersion: { required: true, validator: hardwareRule, label: '硬件版本', trigger: 'change' }
      }
    }
  },
  methods: {
    getModelList(modelList) {
      this.initModelCode = this.form.modelCode = modelList[0]?.key
    },
    sure() {
      // 确认
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            await addHardwareRelation(this.form)
            this.$message.success({
              message: '创建成功！',
              duration: 1000
            })
            this.$parent.$refs.model.getList()
            this.$parent.getList()
            this.cancel()
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    cancel() {
      // 取消
      this.$refs.form.resetFields()
      this.form.modelCode = this.initModelCode
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
        this.$emit('update:visible', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.relationship-dialog /deep/ {
  .el-dialog__body {
    padding-bottom: 10px;
  }
  .el-select {
    width: 100%;
  }
}

.tips {
  text-align: center;
  color: #777;
  font-size: 12px;
}
</style>
