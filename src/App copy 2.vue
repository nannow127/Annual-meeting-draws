<template>
  <div>
    <el-autocomplete
      class="inline-input"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>
<script>
// import LotteryConfig from '@/components/LotteryConfig';
import {} from '@/helper/index';
export default {
  name: 'App',

  components: {},

  created() {},

  data() {
    return {
      running: false,
      restaurants: [],
      state1: '',
      state2: '',
      studentList: [
        {
          emil: '1',
          name: '',
          EnglishName: 'Nanno',
          grade: 'G1',
          form: '1B',
          house: 'A'
        },

        {
          emil: '2',
          name: '',
          EnglishName: 'Nanno',
          grade: 'G2',
          form: '2B',
          house: 'A'
        },
        {
          emil: '3',
          name: '',
          EnglishName: 'Nanno',
          grade: 'G2',
          form: '1C',
          house: 'N'
        },
        {
          emil: '4',
          name: '',
          EnglishName: 'Nanno',
          grade: 'G1',
          form: '1A',
          house: 'B'
        },
        {
          emil: '5',
          name: '',
          EnglishName: 'Nanno',
          grade: 'G3',
          form: '1C',
          house: 'D'
        },
        {
          emil: '6',
          name: '',
          EnglishName: 'Nanno',
          grade: 'G1',
          form: '1A',
          house: 'C'
        }
      ]
    };
  },
  mounted() {
    this.restaurants = this.studentList;
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  }
};
</script>
<style lang="scss"></style>
