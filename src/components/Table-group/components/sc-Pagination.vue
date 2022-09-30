<template>
  <div class='sc-pagination'>
    <el-pagination v-on="$listeners"
                   v-bind="bingAttr">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'ScPagination',

  data() {
    return { layout: 'total, sizes, prev, pager, next, jumper' }
  },
  computed: {
    bingAttr() {
      const { $attrs } = this
      const pageSizes = [
        ...new Set([10, 20, 50, 100].concat([$attrs.pageSize].filter(Boolean)))
      ].sort((a, b) => a - b)

      const bind = {
        layout: this.layout,
        background: true,
        'page-sizes': pageSizes
      }

      Object.keys($attrs).forEach((key) => {
        const v = $attrs[key]
        const uniformKey = key.replace(/([A-Z])/, '-$1').toLowerCase() // 驼峰命名转换 : aB ==> a-b
        bind[uniformKey] = v
      })
      return bind
    }
  }
}
</script>
<style lang='scss' scoped>
.sc-pagination {
  text-align: center;
  
}
</style>
