<template>
  <div class="home">
    <div id="main"></div>
    <el-button @click="handlerAdd">新建</el-button>
    <el-table border background :data="tableData" stripe style="width: 100%">
      <el-table-column
        v-for="(item, index) in tableTitle"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新建活动"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-form-inline"
        label-width="100px"
      >
        <el-form-item label="标题" prop="input3">
          <el-input
            v-model="ruleForm.input3"
            readonly
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="value1">
          <el-select v-model="ruleForm.value1" placeholder="请选择">
            <el-option
              v-for="item in gradeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主讲人" prop="state2">
          <el-input
            v-model="ruleForm.state2"
            readonly
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="input1">
          <el-input
            v-model="ruleForm.input1"
            readonly
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="人数" prop="input2">
          <el-input
            v-model="ruleForm.input2"
            readonly
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="对象" prop="input3">
          <el-input
            v-model="ruleForm.input3"
            readonly
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmitForm('ruleForm')"
          >保存</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

export default {
  name: 'home',

  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        value1: '',
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        state2: ''
      },
      rules: {
        value1: [{ required: true, message: '请输入年级', trigger: 'blur' }],
        state2: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      tableTitle: [
        { label: '标题', prop: 'name' },
        { label: '主讲人', prop: 'name' },
        { label: '时间', prop: 'name' },
        { label: '位置', prop: 'name' },
        { label: '人数', prop: 'name' },
        { label: '对象', prop: 'name' },
        { label: '类型', prop: 'name' }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    };
  },
  created() {},
  methods: {
    handleClose(done) {
      console.log(done);
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    handlerAdd() {
      this.dialogVisible = true;
    },
    handleSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  inheritAttrs() {
    // 接下来的使用就跟之前一样，初始化图表，设置配置项
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
      // ...
    });
  },
  mounted() {}
};
</script>
