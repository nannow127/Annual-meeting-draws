<template>
  <div class="c-Publicity">
    <el-carousel
      height="50px"
      :autoplay="true"
      indicator-position="none"
      arrow="never"
      :interval="3000"
    >
      <el-carousel-item v-for="item in message" :key="item.key">
        <div class="item" :class="{ actiname: item.key === 0 }">
          <span v-if="item.title" class="title"> {{ item.title }}</span>
          <!-- <span v-for="it in item.value" :key="it">
            <span v-if="item.value" class="value">
              {{ list.find(d => d.key === it).name }}1231</span
            >
          </span> -->
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { conversionCategoryName } from '@/helper/index';

export default {
  name: 'Publicity',
  computed: {
    list() {
      return this.$store.state.list;
    },
    config() {
      return this.$store.state.config;
    },
    result() {
      return this.$store.state.result;
    },
    allList() {
      return this.$store.state.allList;
    },
    message() {
      const { result, config } = this;
      const fields = Object.keys(config);
      let message = [{ key: 0, title: config.name }];
      // let list = [];
      // console.log('------allList-----', allList);
      // console.log('----firstPrize-------', result.firstPrize);
      // str = url.substring(0,index+1);
      const regex = /\((.*?)\)/g;
      fields.forEach((item, index) => {
        let label = conversionCategoryName(item);
        if (result[item] && config[item] > 0) {
          message.push({
            key: index + 1,
            title: label.replace(regex, ''),
            value: result[item]
            // value: `${
            //   result[item].length > 0 ? result[item].join('、') : '暂未抽取'
            // }`
          });
        }
      });

      return message;
    }
  }
};
</script>
<style lang="scss">
.c-Publicity {
  height: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .el-carousel {
    width: 80vw;
    margin: 0 auto;
  }
  .item {
    text-align: center;
    color: #fff;
    font-size: 16px;
    .title {
      color: #ccc;
    }
    .value {
      margin-left: 10px;
    }
    &.actiname {
      .title {
        color: #f49712;
        font-size: 20px;
      }
    }
  }
}
</style>
