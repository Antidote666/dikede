<template>
  <el-dialog
    v-if="visible"
    title="工单详情"
    :visible="visible"
    :before-close="handleClose"
    :close-on-click-modal="false"
    class="dialog"
  >
    <slot name="dialogBodyTop" />
    <el-form :model="formData" :inline="inline">
      <template v-if="modify" />
      <template v-else>
        <template v-if="inline">
          <el-row>
            <el-col v-for="(value,item,index) in formLabels" :key="index" :span="12">
              <el-form-item :label="value" label-width="140px" class="col-row-form">
                <slot :name="item"><div>{{ label(formData,item) }}</div></slot>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-form-item v-for="(value,item,index) in formLabels" :key="index" :label="value">
            <slot :name="item"><div>{{ label(formData,item) }}</div></slot>
          </el-form-item>
        </template>
      </template>
    </el-form>
    <template #footer>
      <slot name="dialogFooter" />
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    formLabels: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    inline: {
      type: Boolean,
      default: false
    },
    modify: {
      type: Boolean,
      required: false
    },
    visible: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    label() {
      return (row, item) => {
        if (item.includes('.')) {
          const keys = item.split('.')
          return keys.reduce((pre, cur, index) => pre[cur], row)
        } else {
          return row[item]
        }
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    }
  }

}
</script>

<style>
.col-row-form{
  margin-bottom:0px;
}
</style>
