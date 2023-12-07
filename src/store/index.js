import Vue from 'vue';
import Vuex from 'vuex';
import {
  setData,
  resultField,
  newLotteryField,
  listField
} from '@/helper/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      name: '2023 Huili',
      number: 70,
      firstPrize: 2,
      twoPrize: 2,
      threePrize1: 1,
      threePrize2: 1,
      threePrize3: 4,
      prizeOne2000: 15,
      prizeOne1000: 13,
      prizeOne500: 42
      // prizeOne2000: 8,
      // prizeTwo2000: 7,
      // prizeOne1000: 6,
      // prizeTwo1000: 7,
      // prizeOne500: 10,
      // prizeTwo500: 10,
      // prizeThree500: 12
    },
    result: {
      firstPrize: []
    },
    newLottery: [
      {
        name: '二等奖(Dyson Dust Catcher)',
        key: 'twoPrize'
      },
      {
        name: '三等奖(Surface Lapto Go 2)',
        key: 'threePrize1'
      },
      {
        name: '三等奖(iPad mini6-64GB)',
        key: 'threePrize2'
      },
      {
        name: '三等奖(Dyson Supersonic Hair Dryer)',
        key: 'threePrize3'
      },
      {
        name: '福袋-2000',
        key: 'prizeOne2000'
      },
      {
        name: '福袋-1000',
        key: 'prizeOne1000'
      },
      {
        name: '福袋-500',
        key: 'prizeOne500'
      }
      // {
      //   name: '福袋-2000(7)',
      //   key: 'prizeTwo2000'
      // },
      // {
      //   name: '福袋-1000',
      //   key: 'prizeOne1000'
      // },
      // // {
      // //   name: '福袋-1000(7)',
      // //   key: 'prizeTwo1000'
      // // },
      // {
      //   name: '福袋-500(',
      //   key: 'prizeOne500'
      // }
      // {
      //   name: '福袋-500(10)',
      //   key: 'prizeTwo500'
      // },
      // {
      //   name: '福袋-500(12)',
      //   key: 'prizeThree500'
      // }
    ],
    list: [],
    photos: [],
    allList: []
  },
  mutations: {
    setClearConfig(state) {
      state.config = {
        name: '2023 Huili',
        number: 70,
        firstPrize: 2,
        twoPrize: 2,
        threePrize1: 1,
        threePrize2: 1,
        threePrize3: 4,
        prizeOne2000: 15,
        prizeOne1000: 13,
        prizeOne500: 42
        // prizeOne2000: 8,
        // prizeTwo2000: 7,
        // prizeOne1000: 6,
        // prizeTwo1000: 7,
        // prizeOne500: 10,
        // prizeTwo500: 10,
        // prizeThree500: 12
      };
      state.newLottery = [
        {
          name: '二等奖(Dyson Dust Catcher)',
          key: 'twoPrize'
        },
        {
          name: '三等奖(Surface Lapto Go 2)',
          key: 'threePrize1'
        },
        {
          name: '三等奖(iPad mini6-64GB)',
          key: 'threePrize2'
        },
        {
          name: '三等奖(Dyson Supersonic Hair Dryer)',
          key: 'threePrize3'
        },
        {
          name: '福袋-2000',
          key: 'prizeOne2000'
        },
        {
          name: '福袋-1000',
          key: 'prizeOne1000'
        },
        {
          name: '福袋-500',
          key: 'prizeOne500'
        }
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
        name: '2023 Huili',
        number: 70,
        firstPrize: 2,
        twoPrize: 2,
        threePrize1: 1,
        threePrize2: 1,
        threePrize3: 4,
        prizeOne2000: 15,
        prizeOne1000: 13,
        prizeOne500: 42
      };
      state.result = {
        firstPrize: []
      };
      state.newLottery = [
        {
          name: '二等奖(Dyson Dust Catcher)',
          key: 'twoPrize'
        },
        {
          name: '三等奖(Surface Lapto Go 2)',
          key: 'threePrize1'
        },
        {
          name: '三等奖(iPad mini6-64GB)',
          key: 'threePrize2'
        },
        {
          name: '三等奖(Dyson Supersonic Hair Dryer)',
          key: 'threePrize3'
        },
        {
          name: '福袋-2000',
          key: 'prizeOne2000'
        },
        {
          name: '福袋-1000',
          key: 'prizeOne1000'
        },
        {
          name: '福袋-500',
          key: 'prizeOne500'
        }
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
    setNewLottery(state, newLottery) {
      if (state.newLottery.find(item => item.name === newLottery.name)) {
        return;
      }
      state.newLottery.push(newLottery);
      setData(newLotteryField, state.newLottery);
    },
    setList(state, list) {
      // console.log(state, list, '890809890');
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
