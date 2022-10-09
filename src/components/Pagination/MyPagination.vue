<template>
  <div class="pagination">
    <button 
    :disabled="pageNo == 1" 
    @click="$emit('getPageNo', pageNo - 1)"
    >上一页
    </button>

    <button 
    v-if="startNumAndEndNum.start >= 2" 
    @click="$emit('getPageNo', 1)" 
    :class="{ active: pageNo == 1 }"
    >1
    </button>

    <button 
    v-if="startNumAndEndNum.start > 2"
    >···
    </button>

    <button 
    v-for="(page, index) in startNumAndEndNum.end" 
    :key="index" v-if="page >= startNumAndEndNum.start"
    @click="$emit('getPageNo', page)" 
    :class="{ active: pageNo == page }"
    >{{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button 
    v-if="startNumAndEndNum.end < totalPage" 
    @click="$emit('getPageNo', totalPage)"
    :class="{ active: pageNo == totalPage }"
    >{{ totalPage }}
    </button>

    <button 
    :disabled="pageNo == totalPage" 
    @click="$emit('getPageNo', pageNo + 1)"
    >下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "MyPagination",
  props: ['pageSize', 'pageNo', 'total', 'continues'],
  computed: {
    // 总共多少页
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    startNumAndEndNum() {
      let start = 0, end = 0;
      // 考虑总页数不足情况
      if (this.continues > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        start = this.pageNo - Math.floor(this.continues / 2)
        end = this.pageNo + Math.floor(this.continues / 2)
        // 起始页为 1 2 ,start 变成 -1 0 不符合
        if (start < 1) {
          start = 1;
          end = this.continues
        }
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: skyblue;
}
</style>
