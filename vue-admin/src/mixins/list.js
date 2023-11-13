// 混入 就是抽离 先相同的组件配置信息

export default {
  data() {
    return {
      list: [],
      query: {
        page: 1,
        size: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    pageChange(newPage) {
      this.query.page = newPage
      this.getList()
    },
    sizeChange(newSize) {
      this.query.size = newSize
      this.getList()
    }
  }
}
