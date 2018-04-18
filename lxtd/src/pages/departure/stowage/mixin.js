/**
 * 马少良
 */
export default {
  methods: {
    indexMethod(index) {
      // 格式序号
      return (this.currPage - 1) * 10 + index + 1
    },
    pageChange(val) {
      // 分页跳转改变当前页
      this.currPage = val
      this.search()
    },
    sizeChange(size) {
      this.pageSize = size
      this.search()
    },
    getList(list) {
      // 获取选中数据
      this.list = list
    },
  },
}
