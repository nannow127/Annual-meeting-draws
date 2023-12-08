<template>
  <el-dialog
    :visible="visible"
    @close="$emit('update:visible', false)"
    width="600px"
    class="c-Result"
    :append-to-body="true"
  >
    <div class="dialog-title" slot="title">
      <span :style="{ fontSize: '18px' }">
        抽奖结果
      </span>
      <!-- <span :style="{ fontSize: '14px', color: '#999', marginLeft: '10px' }">
        (点击号码可以删除)
      </span> -->
    </div>
    <div
      v-for="(item, index) in resultList"
      :key="index"
      class="listrow"
      @click="
        event => {
          deleteRes(event, item);
        }
      "
    >
      <div class="name">
        {{ item.name }}
      </div>
      <div class="value">
        <el-tag
          type="info"
          v-if="item.value && item.value.length === 0"
          style="background-color: #97cebe;"
        >
          暂未抽奖
        </el-tag>
        <el-tag
          type="success"
          class="card"
          v-for="(data, j) in item.value"
          :key="j"
          :data-res="data"
        >
          {{ list.find(d => d.key === data).name }}
          <!-- {{ data }} -->
        </el-tag>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { conversionCategoryName, getDomData, getName } from '@/helper/index';
export default {
  name: 'c-Result',
  props: {
    visible: Boolean
  },
  computed: {
    result: {
      get() {
        return this.$store.state.result;
      },

      set(val) {
        this.$store.commit('setResult', val);
      }
    },
    // allList() {
    //   return this.$store.state.allList;
    // },
    list() {
      return this.$store.state.list;
    },
    resultList() {
      getName();
      const list = [];
      // let itemName = [];
      for (const key in this.result) {
        // console.log(key, '----'); //奖项名称的值
        if (this.result.hasOwnProperty(key)) {
          const element = this.result[key];
          let name = conversionCategoryName(key); //获取奖项名称
          // console.log(name, '==name', element);
          // for (const e in element) {
          //   allList.map(item => {
          //     if (item.key === element[e]) {
          //       element.push(item.name);
          //       // console.log(item, '----items');
          //     }
          //   });
          // }
          // console.log(element, '----element');
          list.push({
            label: key,
            name,
            value: element
          });
          //   list.map(i => {
          //     console.log(i, '--iiiiii--');
          //   });
        }
      }

      // console.log(list, '---listlistlist');
      return list;
    }
  },
  methods: {
    deleteRes(event, row) {
      const Index = getDomData(event.target, 'res');
      if (!Index) {
        return;
      }
      this.$confirm('此操作将移除该中奖号码，确认删除?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (Index) {
            const result = this.result;
            result[row.label] = this.result[row.label].filter(
              item => item !== Number(Index)
            );
            this.result = result;
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    }
  }
};
</script>
<style lang="scss">
.c-Result {
  .el-dialog__body {
    max-height: 500px;
    overflow-y: auto;
  }
  .listrow {
    // display: flex;
    // line-height: 30px;
    .name {
      // width: 80px;
      font-weight: bold;
    }
    .value {
      // padding: 10px;
      // flex: 1;
      .el-tag {
        margin: 5px;
        background-color: #ed6807;
        border: none;
        color: #fff;
      }
    }
  }
}
</style>
