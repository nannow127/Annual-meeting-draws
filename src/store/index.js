import Vue from 'vue';
import Vuex from 'vuex';
import {
  setData,
  resultField,
  newLotteryField,
  listField,
  studentField,
  attendField
} from '@/helper/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    studentList: [],
    attendList: [],
    config: {
      name: '2025 HIBA',
      number: 70,
      Award: 1,
      Award2: 2,
      firstPrize1: 2,
      firstPrize2: 2,
      twoPrize1: 5,
      twoPrize2: 5,
      twoPrize3: 2,
      threePrize: 13
      // threePrize1: 1,
      // threePrize2: 1,
      // threePrize3: 1,
      // threePrize4: 1,
      // threePrize5: 1,
      // threePrize6: 1,
      // threePrize7: 1,
      // threePrize8: 1,
      // threePrize9: 1,
      // threePrize10: 1,
      // threePrize11: 1,
      // threePrize12: 1,
      // threePrize13: 1
    },

    result: {
      firstPrize: []
    },
    newLottery: [
      {
        key: 'Award',
        name: '特特特等奖(Huawei Mate XT 华为非凡大师三折叠屏手机-512GB)'
      },
      {
        key: 'Award2',
        name: '特等奖(Apple iphone 17 pro max 全网通5G手机-512GB)'
      },
      {
        key: 'firstPrize1',
        name: '一等奖(Dyson V12 Detect Slim™ Vacuum 戴森吸尘器V12)'
      },
      {
        key: 'firstPrize2',
        name:
          '一等奖(Disney Gift Package (Including 2 adults and 1 child tickets and one night Disney Resort) 迪士尼礼包（含2大1小1日门票&1晚迪士尼度假区住宿）)'
      },
      {
        key: 'twoPrize1',
        name: '二等奖(Dyson Supersonic Hair Dryer 戴森吹风机)'
      },
      { key: 'twoPrize2', name: '二等奖(Apple Watch S11 苹果智能手表GPS款)' },
      {
        key: 'twoPrize3',
        name: '二等奖(DJI Osmo Pocket 3 大疆一英寸口袋云台相机)'
      },
      { key: 'threePrize', name: '三等奖' }
      // { key: 'threePrize1', name: '三等奖(iPAD 256GB-A16 苹果平板电脑)' },
      // { key: 'threePrize2', name: '三等奖(DJI Drone Neo 大疆掌上无人机)' },
      // {
      //   key: 'threePrize3',
      //   name:
      //     '三等奖(Marshall ACTON III Wireless Bluetooth speaker 马歇尔第三代家用无线音箱)'
      // },
      // {
      //   key: 'threePrize4',
      //   name:
      //     '三等奖(Marshall ACTON III Wireless Bluetooth speaker 马歇尔第三代家用无线音箱)'
      // },
      // { key: 'threePrize5', name: '三等奖(Apple AirPods Pro3 苹果蓝牙耳机)' },
      // { key: 'threePrize6', name: '三等奖(Apple AirPods Pro3 苹果蓝牙耳机)' },
      // {
      //   key: 'threePrize7',
      //   name: '三等奖(2000 Yuan Airline voucher 机票代金券2000元)'
      // },
      // {
      //   key: 'threePrize8',
      //   name: '三等奖(La Prairie SKIN CAVIAR LUXE EYE CREAM 莱珀妮鱼子酱眼霜)'
      // },
      // {
      //   key: 'threePrize9',
      //   name: '三等奖(1000 Yuan JD Card 京东购物卡1000元-1)'
      // },
      // {
      //   key: 'threePrize10',
      //   name: '三等奖(1000 Yuan JD Card 京东购物卡1000元-2)'
      // },
      // {
      //   key: 'threePrize11',
      //   name:
      //     '三等奖(One-night accommodation voucher for Waldorf Astoria 华尔道夫住宿券壹晚)'
      // },
      // {
      //   key: 'threePrize12',
      //   name: '三等奖(Microsoft Audio Dock 微软多媒体音响)'
      // },
      // {
      //   key: 'threePrize13',
      //   name: '三等奖(Microsoft Audio Dock 微软多媒体音响)'
      // }
    ],
    list: [
      {
        key: '1',
        name: 'Dickson Li'
      }
    ],
    photos: [],
    allList: []
  },
  mutations: {
    setNewLottery(state, newLottery) {
      if (state.newLottery.find(item => item.name === newLottery.name)) {
        return;
      }
      state.newLottery.push(newLottery);
      setData(newLotteryField, state.newLottery);
    },
    setStudentList(state, list) {
      state.studentList = list;
      setData(studentField, state.studentList);
    },
    setAttendList(state, list) {
      state.attendList = list;
      setData(attendField, state.attendList);
    },
    setClearConfig(state) {
      state.config = {
        name: '2025 HIBA',
        number: 70,
        Award: 1,
        Award2: 2,
        firstPrize1: 2,
        firstPrize2: 2,
        twoPrize1: 5,
        twoPrize2: 5,
        twoPrize3: 2,
        threePrize: 13
      };
      state.newLottery = [
        {
          key: 'Award',
          name: '特特特等奖(Huawei Mate XT 华为非凡大师三折叠屏手机-512GB)'
        },
        {
          key: 'Award2',
          name: '特等奖(Apple iphone 17 pro max 全网通5G手机-512GB)'
        },
        {
          key: 'firstPrize1',
          name: '一等奖(Dyson V12 Detect Slim™ Vacuum 戴森吸尘器V12)'
        },
        {
          key: 'firstPrize2',
          name:
            '一等奖(Disney Gift Package (Including 2 adults and 1 child tickets and one night Disney Resort) 迪士尼礼包（含2大1小1日门票&1晚迪士尼度假区住宿）)'
        },
        {
          key: 'twoPrize1',
          name: '二等奖(Dyson Supersonic Hair Dryer 戴森吹风机)'
        },
        { key: 'twoPrize2', name: '二等奖(Apple Watch S11 苹果智能手表GPS款)' },
        {
          key: 'twoPrize3',
          name: '二等奖(DJI Osmo Pocket 3 大疆一英寸口袋云台相机)'
        },
        { key: 'threePrize', name: '三等奖' }
        // { key: 'threePrize1', name: '三等奖(iPAD 256GB-A16 苹果平板电脑)' },
        // { key: 'threePrize2', name: '三等奖(DJI Drone Neo 大疆掌上无人机)' },
        // {
        //   key: 'threePrize3',
        //   name:
        //     '三等奖(Marshall ACTON III Wireless Bluetooth speaker 马歇尔第三代家用无线音箱)'
        // },
        // {
        //   key: 'threePrize4',
        //   name:
        //     '三等奖(Marshall ACTON III Wireless Bluetooth speaker 马歇尔第三代家用无线音箱)'
        // },
        // { key: 'threePrize5', name: '三等奖(Apple AirPods Pro3 苹果蓝牙耳机)' },
        // { key: 'threePrize6', name: '三等奖(Apple AirPods Pro3 苹果蓝牙耳机)' },
        // {
        //   key: 'threePrize7',
        //   name: '三等奖(2000 Yuan Airline voucher 机票代金券2000元)'
        // },
        // {
        //   key: 'threePrize8',
        //   name: '三等奖(La Prairie SKIN CAVIAR LUXE EYE CREAM 莱珀妮鱼子酱眼霜)'
        // },
        // {
        //   key: 'threePrize9',
        //   name: '三等奖(1000 Yuan JD Card 京东购物卡1000元-1)'
        // },
        // {
        //   key: 'threePrize10',
        //   name: '三等奖(1000 Yuan JD Card 京东购物卡1000元-2)'
        // },
        // {
        //   key: 'threePrize11',
        //   name:
        //     '三等奖(One-night accommodation voucher for Waldorf Astoria 华尔道夫住宿券壹晚)'
        // },
        // {
        //   key: 'threePrize12',
        //   name: '三等奖(Microsoft Audio Dock 微软多媒体音响)'
        // },
        // {
        //   key: 'threePrize13',
        //   name: '三等奖(Microsoft Audio Dock 微软多媒体音响)'
        // }
      ];
    },
    setClearList(state) {
      state.list = [];
    },
    setClearPhotos(state) {
      state.photos = [];
    },
    setClearResult(state) {
      state.result = {
        firstPrize: []
      };
    },
    setClearStore(state) {
      state.config = {
        name: '2025 HIBA',
        number: 70,
        Award: 1,
        Award2: 1,
        Award3: 1,
        firstPrize1: 2,
        firstPrize2: 2,
        twoPrize1: 5,
        twoPrize2: 5,
        twoPrize3: 2,
        threePrize: 13,
        prize500: 15
      };
      state.result = {
        firstPrize: []
      };
      state.newLottery = [
        {
          key: 'Award',
          name: '特特特等奖(Huawei Mate XT 华为非凡大师三折叠屏手机-512GB)'
        },
        {
          key: 'Award2',
          name: '特等奖(Apple iphone 17 pro max 全网通5G手机-512GB)银色'
        },
        {
          key: 'Award3',
          name: '特等奖(Apple iphone 17 pro max 全网通5G手机-512GB)橘色'
        },
        {
          key: 'firstPrize1',
          name: '一等奖(Dyson V12 Detect Slim™ Vacuum 戴森吸尘器V12)'
        },
        {
          key: 'firstPrize2',
          name:
            '一等奖(Disney Gift Package (Including 2 adults and 1 child tickets and one night Disney Resort) 迪士尼礼包（含2大1小1日门票&1晚迪士尼度假区住宿）)'
        },
        {
          key: 'twoPrize1',
          name: '二等奖(Dyson Supersonic Hair Dryer 戴森吹风机)'
        },
        { key: 'twoPrize2', name: '二等奖(Apple Watch S11 苹果智能手表GPS款)' },
        {
          key: 'twoPrize3',
          name: '二等奖(DJI Osmo Pocket 3 大疆一英寸口袋云台相机)'
        },
        { key: 'threePrize', name: '三等奖' },
        { key: 'prize500', name: '福袋-500' }
        // { key: 'threePrize1', name: '三等奖(iPAD 256GB-A16 苹果平板电脑)' },
        // { key: 'threePrize2', name: '三等奖(DJI Drone Neo 大疆掌上无人机)' },
        // {
        //   key: 'threePrize3',
        //   name:
        //     '三等奖(Marshall ACTON III Wireless Bluetooth speaker 马歇尔第三代家用无线音箱)'
        // },
        // {
        //   key: 'threePrize4',
        //   name:
        //     '三等奖(Marshall ACTON III Wireless Bluetooth speaker 马歇尔第三代家用无线音箱)'
        // },
        // { key: 'threePrize5', name: '三等奖(Apple AirPods Pro3 苹果蓝牙耳机)' },
        // { key: 'threePrize6', name: '三等奖(Apple AirPods Pro3 苹果蓝牙耳机)' },
        // {
        //   key: 'threePrize7',
        //   name: '三等奖(2000 Yuan Airline voucher 机票代金券2000元)'
        // },
        // {
        //   key: 'threePrize8',
        //   name: '三等奖(La Prairie SKIN CAVIAR LUXE EYE CREAM 莱珀妮鱼子酱眼霜)'
        // },
        // {
        //   key: 'threePrize9',
        //   name: '三等奖(1000 Yuan JD Card 京东购物卡1000元-1)'
        // },
        // {
        //   key: 'threePrize10',
        //   name: '三等奖(1000 Yuan JD Card 京东购物卡1000元-2)'
        // },
        // {
        //   key: 'threePrize11',
        //   name:
        //     '三等奖(One-night accommodation voucher for Waldorf Astoria 华尔道夫住宿券壹晚)'
        // },
        // {
        //   key: 'threePrize12',
        //   name: '三等奖(Microsoft Audio Dock 微软多媒体音响)'
        // },
        // {
        //   key: 'threePrize13',
        //   name: '三等奖(Microsoft Audio Dock 微软多媒体音响)'
        // }
      ];
      state.list = [];
      state.photos = [];
    },
    setConfig(state, config) {
      state.config = config;
    },
    setResult(state, result = {}) {
      state.result = result;
      state.allList = state.list;
      setData(resultField, state.result);
    },
    setList(state, list) {
      console.log(state, list, 'state, liststate, list');

      const arr = state.list;
      list.forEach(item => {
        const arrIndex = arr.findIndex(data => data.key === item.key);
        if (arrIndex > -1) {
          arr[arrIndex].name = item.name;
        } else {
          arr.push(item);
        }
      });
      state.list = arr;
      setData(listField, arr);
    },

    setPhotos(state, photos) {
      state.photos = photos;
    }
  },
  actions: {},
  modules: {}
});
