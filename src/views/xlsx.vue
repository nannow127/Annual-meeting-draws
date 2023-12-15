<template>
  <div class="container">
    <div style="display:flex;">
      <el-upload
        ref="upload"
        action="test"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :show-file-list="false"
        :on-change="onUploadChange"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button size="small" @click="handleDownload">点击下载</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        v-for="(key, index) in Object.keys(tableData[0] || {})"
        :prop="key"
        :label="key"
        :key="index"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// saveJsonToExcel
import { readExcelToJson } from '@/helper/xlsx';
import { getData, studentField } from '@/helper/index';
export default {
  computed: {
    getStudentList: {
      get() {
        return this.$store.state.studentList;
      }
    }
  },
  data() {
    return {
      file: null,
      tableData: getData(studentField)
    };
  },

  created() {
    console.log(getData(studentField), '----getStudentList');
  },
  methods: {
    // 读取文件为json数据
    onUploadChange(file) {
      this.file = file;
      readExcelToJson(file).then(res => {
        this.$store.commit('setStudentList', res);
      });

      // this.$store.commit('setList', list);
    },

    handleDownload() {
      // saveJsonToExcel(this.tableData, this.file.name);
    }
  }
};
</script>

<style lang="scss">
body {
  background: #f4f4f4;
  padding: 0;
  margin: 0;
}
.container {
  width: 1024px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
}
</style>
