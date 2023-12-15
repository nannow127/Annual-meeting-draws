<template>
  <div>
    <h3>本次活动标题</h3>
    <h3>本次活动时间</h3>
    <h3>本次活动主讲人</h3>
    <h3>本次活动针对人群</h3>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-form-inline"
      label-width="100px"
    >
      <el-form-item label="年级" prop="value1">
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
      <el-form-item label="姓名" prop="state2">
        <el-autocomplete
          class="inline-input"
          value-key="englishName"
          v-model="ruleForm.state2"
          placeholder="请输入内容"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          @select="handleSelectBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="年级" prop="input1">
        <el-input v-model="ruleForm.input1" readonly></el-input>
      </el-form-item>

      <el-form-item label="班级" prop="input2">
        <el-input v-model="ruleForm.input2" readonly></el-input>
      </el-form-item>

      <el-form-item label="学院" prop="input3">
        <el-input v-model="ruleForm.input3" readonly></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmitForm('ruleForm')"
          >保存</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import LotteryConfig from '@/components/LotteryConfig';
import { studentList, gradeList } from '@/components/data';
export default {
  name: 'App',

  components: {},

  created() {},

  data() {
    return {
      gradeList,
      studentList,
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
      //签到成功的数据列表
      clockList: []
    };
  },
  methods: {
    loadAll() {
      return [
        {
          emil: '1',
          name: '',
          englishName: '张三',
          grade: 'G1',
          form: '1B',
          house: 'A'
        },

        {
          emil: '2',
          name: '',
          englishName: '张三',
          grade: 'G2',
          form: '2B',
          house: 'A'
        },
        {
          emil: '3',
          name: '',
          englishName: '王五',
          grade: 'G2',
          form: '1C',
          house: 'N'
        },
        {
          emil: '4',
          name: '',
          englishName: '家',
          grade: 'G1',
          form: '1A',
          house: 'B'
        },
        {
          emil: '5',
          name: '',
          englishName: '医',
          grade: 'G3',
          form: '1C',
          house: 'D'
        },
        {
          emil: '6',
          name: '',
          englishName: '丙丁',
          grade: 'G1',
          form: '1A',
          house: 'C'
        }
      ];
    },
    // 显示当前孩子的信息
    A({ emil, grade, form, house }) {
      this.ruleForm.input1 = grade;
      this.ruleForm.input2 = form;
      this.ruleForm.input3 = house;
      this.ruleForm.input4 = emil;
      // let list = [];
      // this.studentList.map(item => {
      //   if (item.emil === emil) {
      //     this.input1: ,
      // this.input2: '',
      //     list.push(item);
      //   }
      // });
      // this.studentList = list;
      // console.log(list);
    },
    querySearch(queryString, cd) {
      var studentList = this.studentList;
      var results = queryString
        ? studentList.filter(this.createFilter(queryString))
        : studentList;
      // 调用 callback 返回建议列表的数据
      cd(results);
    },
    createFilter(queryString) {
      return student => {
        console.log(
          student.englishName.toLowerCase().indexOf(queryString.toLowerCase())
        );
        return (
          student.englishName
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelectBlur(event) {
      this.A({ ...event });
      console.log(event, 'handleSelectBlur');
    },
    handleSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.ruleForm);
        if (valid) {
          this.clockList.push(this.ruleForm);
          console.log(this.clockList);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.studentList;
  }
};
</script>
<style lang="scss"></style>
