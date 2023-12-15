<template>
  <div>
    <h3>本次活动标题</h3>
    <h3>本次活动时间</h3>
    <h3>本次活动主讲人</h3>
    <h3>本次活动针对人群</h3>
    {{ studentAllList }}

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-form-inline"
      label-width="100px"
    >
      <el-form-item label="年级" prop="grade">
        <el-select
          v-model="ruleForm.grade"
          @change="handleBlur"
          placeholder="请选择"
        >
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="英文姓名" prop="englishName">
        <el-autocomplete
          class="inline-input"
          value-key="englishName"
          v-model="ruleForm.englishName"
          placeholder="请输入内容"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          @select="handleSelectBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="中文姓名" prop="name">
        <el-input v-model="ruleForm.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="form">
        <el-input v-model="ruleForm.form" readonly></el-input>
      </el-form-item>
      <el-form-item label="学院" prop="house">
        <el-input v-model="ruleForm.house" readonly></el-input>
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
import { gradeList } from '@/components/data';
import { getData, studentField, attendField } from '@/helper/index';
export default {
  name: 'App',

  components: {},

  data() {
    return {
      gradeList,
      studentList: [],
      studentAllList: getData(studentField),
      ruleForm: {
        name: '',
        englishName: '',
        grade: '',
        form: '',
        house: '',
        id: ''
      },
      rules: {
        value1: [{ required: true, message: '请输入年级', trigger: 'blur' }],
        state2: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      //签到成功的数据列表
      attendList: []
    };
  },
  created() {
    console.log(this.studentList, '---studentList');
  },
  methods: {
    loadAll() {
      return getData(studentField);
    },
    // 显示当前孩子的信息
    A({ id, grade, form, house, name, englishName }) {
      this.ruleForm.grade = grade;
      this.ruleForm.form = form;
      this.ruleForm.house = house;
      this.ruleForm.id = id;
      this.ruleForm.name = name;
      this.ruleForm.englishName = englishName;
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
    handleBlur(value) {
      let list = [];
      this.ruleForm.form = '';
      this.ruleForm.house = '';
      this.ruleForm.id = '';
      this.ruleForm.name = '';
      this.ruleForm.englishName = '';
      getData(studentField).map(item => {
        if (item.grade === value) {
          list.push(item);
        }
      });
      this.studentList = list;
      console.log(this.studentList, '---handleBlur');
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
      // let list = [];
      console.log(getData(attendField));
      this.$refs[formName].validate(valid => {
        console.log(this.ruleForm, 'this.attendList', this.attendList);
        if (valid) {
          this.attendList.push(this.ruleForm);
          // console.log(this.attendList);
          this.$store.commit('setAttendList', this.attendList);
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
    this.studentList = this.loadAll();
  }
};
</script>
<style lang="scss"></style>
