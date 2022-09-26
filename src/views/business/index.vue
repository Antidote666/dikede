<template>
  <div>
    <el-card class="result">
      <lin-page :total="20" :page.sync="page" />
    </el-card>
  </div>
</template>

<script>
import LinPage from '@/components/TabelFormPage/Page'
export default {
  components: {
    LinPage
  },
  data() {
    return {
      page: 1
    }
  }
}
</script>

<style>
.result{
  padding: 20px 15px 19px 17px;
    background-color: #fff;
}
</style>
