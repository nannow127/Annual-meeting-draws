<template>
  <div id="tool">
    <el-button class="start" type="primary" @click="startHandler" size="mini">{{
      running ? 'STOP' : 'START'
    }}</el-button>
    <div class="bu_style">
      <el-button type="text" size="mini" @click="showRemoveoptions = true">
        RESET
      </el-button>
      <el-button type="text" size="mini" @click="showImport = true">
        IMPORT LIST
      </el-button>
    </div>

    <!-- <el-button size="mini" @click="showImportphoto = true">
      导入照片
    </el-button> -->
    <el-dialog
      :append-to-body="true"
      :visible.sync="showSetwat"
      class="setwat-dialog"
      width="400px"
    >
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="抽取奖项">
          <el-select v-model="form.category" placeholder="请选取本次抽取的奖项">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in categorys"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" " v-if="form.category">
          <span>
            共&nbsp;
            <span style="color:#ed6807" class="colorred">{{
              config[form.category]
            }}</span>
            &nbsp;名
          </span>
          <span :style="{ marginLeft: '20px' }">
            剩余&nbsp;
            <span style="color:red" class="colorred">{{ remain }}</span>
            &nbsp;名
          </span>
        </el-form-item>

        <el-form-item label="抽取人数">
          <el-select v-model="form.mode" placeholder="请选择本次抽取人数">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="1人" :value="1"></el-option>
            <el-option label="7人" :value="7"></el-option>
            <el-option label="10人" :value="10"></el-option>
            <el-option label="自定义" :value="99"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="抽取人数" v-if="form.mode === 99">
          <el-input
            v-model="form.qty"
            type="number"
            :clearable="true"
            :min="1"
            :max="remain ? remain : 100"
            :step="1"
          ></el-input>
        </el-form-item>

        <el-form-item label="全员参与">
          <el-switch v-model="form.allin"></el-switch>
          <span :style="{ fontSize: '12px' }">
            (开启后无论有无中奖都会参与)
          </span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即抽奖</el-button>
          <el-button @click="showSetwat = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :append-to-body="true"
      :visible.sync="showImport"
      class="import-dialog"
      width="400px"
    >
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入对应的号码和名单(可直接从excel复制)，格式(号码 名字)，导入的名单将代替号码显示在抽奖中。如：
1 张三
2 李四
3 王五
				"
        v-model="listStr"
      ></el-input>
      <div class="footer">
        <el-button size="mini" type="primary" @click="transformList"
          >确定</el-button
        >
        <el-button size="mini" @click="showImport = false">取消</el-button>
      </div>
    </el-dialog>
    <Importphoto
      :visible.sync="showImportphoto"
      @getPhoto="$emit('getPhoto')"
    ></Importphoto>

    <el-dialog
      :visible.sync="showRemoveoptions"
      width="300px"
      class="c-removeoptions"
      :append-to-body="true"
    >
      <el-form ref="form" :model="removeInfo" size="mini" class="form_style">
        <el-form-item label="" label-width="60px">
          <el-radio-group v-model="removeInfo.type">
            <el-radio border :label="4">重置抽奖结果</el-radio>
            <el-radio border :label="2">重置名单</el-radio>
            <el-radio border :label="1">重置抽奖配置</el-radio>
            <el-radio border :label="0">重置全部数据</el-radio>
            <!-- <el-radio border :label="3">重置照片</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetConfig">确定重置</el-button>
          <el-button @click="showRemoveoptions = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  clearData,
  removeData,
  configField,
  listField,
  resultField,
  conversionCategoryName
} from '@/helper/index';
import Importphoto from './Importphoto';
import { database, DB_STORE_NAME } from '@/helper/db';

export default {
  props: {
    running: Boolean,
    closeRes: Function
  },
  computed: {
    config: {
      get() {
        return this.$store.state.config;
      }
    },
    remain() {
      return (
        this.config[this.form.category] -
        (this.result[this.form.category]
          ? this.result[this.form.category].length
          : 0)
      );
    },
    result() {
      return this.$store.state.result;
    },
    categorys() {
      const options = [];
      // console.log(this.config, '---this.config');
      for (const key in this.config) {
        if (this.config.hasOwnProperty(key)) {
          const item = this.config[key];
          if (item > 0) {
            let name = conversionCategoryName(key);
            name &&
              options.push({
                label: name,
                value: key
              });
          }
        }
      }
      return options;
    }
  },
  components: { Importphoto },
  data() {
    return {
      showSetwat: false,
      showImport: false,
      showImportphoto: false,
      showRemoveoptions: false,
      removeInfo: { type: 0 },
      form: {
        category: '',
        mode: 0,
        tqy: 1,
        allin: false
      },
      listStr: '',
      number1: ''
    };
  },
  watch: {
    showRemoveoptions(v) {
      if (!v) {
        this.removeInfo.type = 0;
      }
    }
  },
  methods: {
    resetConfig() {
      const type = this.removeInfo.type;
      this.$confirm('此操作将重置所选数据，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          switch (type) {
            case 0:
              clearData();
              this.$store.commit('setClearStore');
              database.clear(DB_STORE_NAME);
              break;
            case 1:
              removeData(configField);
              this.$store.commit('setClearConfig');
              break;
            case 2:
              removeData(listField);
              this.$store.commit('setClearList');
              break;
            case 3:
              database.clear(DB_STORE_NAME);
              this.$store.commit('setClearPhotos');
              break;
            case 4:
              removeData(resultField);
              this.$store.commit('setClearResult');
              break;
            default:
              break;
          }

          this.closeRes && this.closeRes();

          this.showRemoveoptions = false;
          this.$message({
            type: 'success',
            message: '重置成功!'
          });

          this.$nextTick(() => {
            this.$emit('resetConfig');
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    },
    onSubmit() {
      if (!this.form.category) {
        return this.$message.error('请选择本次抽取的奖项');
      }
      if (this.remain <= 0) {
        return this.$message.error('该奖项剩余人数不足');
      }
      if (this.form.mode === 99) {
        if (this.form.qty <= 0) {
          return this.$message.error('必须输入本次抽取人数');
        }
        if (this.form.qty > this.remain) {
          return this.$message.error('本次抽奖人数已超过本奖项的剩余人数');
        }
      }
      if (
        this.form.mode === 7 ||
        this.form.mode === 1 ||
        this.form.mode === 10
      ) {
        if (this.form.mode > this.remain) {
          return this.$message.error('抽奖人数已超过本奖项的剩余人数');
        }
      }
      console.log(this.form.mode, '0000000', this.remain);

      this.showSetwat = false;
      this.$emit(
        'toggle',
        Object.assign({}, this.form, { remain: this.remain })
      );
    },
    startHandler() {
      this.$emit('toggle');
      if (!this.running) {
        this.showSetwat = true;
      }
    },
    transformList() {
      const { listStr } = this;
      if (!listStr) {
        this.$message.error('没有数据');
      }
      const list = [];

      const rows = listStr.split('\n');
      if (rows && rows.length > 0) {
        rows.forEach(item => {
          const rowList = item.split(/\t|\s/);
          if (rowList.length >= 2) {
            const key = Number(rowList[0].trim());
            const name = rowList.splice(1).join(' ');
            key &&
              list.push({
                key,
                name
              });
          }
        });
      }
      // console.log(list, 'listlist');
      this.$store.commit('setList', list);

      this.$message({
        message: '保存成功',
        type: 'success'
      });
      this.showImport = false;
      this.$nextTick(() => {
        this.$emit('resetConfig');
      });
    }
  }
};
</script>
<style lang="scss">
#tool {
  // width: 60px;

  // transform: translateY(-50%);
  .start {
    position: absolute;
    right: 20px;
    top: 50px;
  }
  .bu_style {
    position: absolute;

    top: 100px;
    right: 20px;
    // background-color: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    .el-button {
      text-align: right;
    }
    // align-items: right;
    // justify-content: right;
  }
  //   position: absolute;

  // }

  // .el-button + .el-button {
  //   margin-top: 0px;
  //   margin-left: 0px;
  // }
}
.setwat-dialog {
  .colorred {
    font-weight: bold;
  }
}
.import-dialog {
  .footer {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
.c-removeoptions {
  .form_style,
  .radio {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .el-dialog {
    // height: 290px;
  }
  .el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: 0px;
  }
  .el-radio.is-bordered {
    margin-bottom: 10px;
  }
}
</style>
