<template>
  <div class="home">
    <div id="main"></div>
    <el-button @click="handlerAdd('add')">新建</el-button>
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
          <el-button
            @click="handleClick('look', scope.row)"
            type="text"
            size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="`${mainType}活动`"
      :visible.sync="dialogVisible"
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
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                v-model="ruleForm.date2"
                style="width: 100%;"
              ></el-time-picker>
            </el-form-item>
          </el-col>
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
      <div v-show="mainType === 'look'">
        参与人员信息
        <el-table
          border
          background
          :data="visitorTableDate"
          stripe
          style="width: 100%"
        >
          <el-table-column
            v-for="(item, index) in visitorTableTitle"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          >
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmitForm('ruleForm')"
          >保存</el-button
        >
        <el-button @click="handleClose('ruleForm')">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from 'xlsx';
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

import { getData, attendField } from '@/helper/index';
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
      mainType: '', //弹框类型
      gradeList: [],
      dialogVisible: false,
      ruleForm: {
        value1: '',
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        date1: '',
        date2: '',
        state2: ''
      },
      rules: {
        value1: [{ required: true, message: '请输入年级', trigger: 'blur' }],
        state2: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ]
      },
      tableTitle: [
        { label: '标题', prop: 'value1' },
        { label: '主讲人', prop: 'input1' },
        { label: '时间', prop: 'input2' },
        { label: '位置', prop: 'input3' },
        { label: '人数', prop: 'input4' },
        { label: '对象', prop: 'state2' },
        { label: '类型', prop: 'input2' }
      ],
      visitorTableTitle: [
        { label: '邮件', prop: 'emil' },
        { label: '姓名', prop: 'name' },
        { label: '英文名字', prop: 'englishName' },
        { label: '年级', prop: 'grade' },
        { label: '学院', prop: 'house' },
        { label: '班级', prop: 'form' }
      ],
      visitorTableDate: getData(attendField),
      tableData: [
        {
          value1: 'test1',
          input1: 'test1',
          input2: 'test1',
          input3: 'test1',
          input4: 'test1',
          state2: 'test1'
        }
      ]
    };
  },
  created() {},
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(jsonData);
      };
      console.log(file);
      // reader.readAsArrayBuffer(file);
    },
    handleClick(type, form) {
      this.mainType = type;
      console.log(form);
      this.ruleForm = form;
      this.dialogVisible = true;
    },
    // handleClose(done) {
    //   this.dialogVisible = false;
    //   console.log(done);
    //   // this.$confirm('确认关闭？')
    //   //   .then(_ => {
    //   //     done();
    //   //   })
    //   //   .catch(_ => {});
    // },
    handlerAdd() {
      this.mainType = 'add';
      this.ruleForm = {};
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
    handleClose(formName) {
      this.dialogVisible = false;
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
