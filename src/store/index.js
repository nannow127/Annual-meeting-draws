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
      name: '2023 Huili',
      number: 70,
      firstPrize: 2,
      twoPrize: 2,
      threePrize1: 1,
      threePrize2: 1,
      threePrize3: 4,
      threePrize4: 2,
      prizeOne2000: 16,
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
        name: '三等奖(iPad mini6)',
        key: 'threePrize2'
      },
      {
        name: '三等奖(Dyson Supersonic Hair Dryer)',
        key: 'threePrize3'
      },
      {
        name: '三等奖(HUAWEI Watch 3 Pro)',
        key: 'threePrize4'
      },
      {
        name: 'Blessing Bag-2000',
        key: 'prizeOne2000'
      },
      {
        name: 'Blessing Bag-1000',
        key: 'prizeOne1000'
      },
      {
        name: 'Blessing Bag-500',
        key: 'prizeOne500'
      }
    ],
    list: [],
    photos: [],
    allList: []
  },
  mutations: {
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
        name: '2023 Huili',
        number: 70,
        firstPrize: 2,
        twoPrize: 2,
        threePrize1: 1,
        threePrize2: 1,
        threePrize3: 4,
        threePrize4: 2,
        prizeOne2000: 16,
        prizeOne1000: 13,
        prizeOne500: 42
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
          name: '三等奖(iPad mini6)',
          key: 'threePrize2'
        },
        {
          name: '三等奖(Dyson Supersonic Hair Dryer)',
          key: 'threePrize3'
        },
        {
          name: '三等奖(HUAWEI Watch 3 Pro)',
          key: 'threePrize4'
        },
        {
          name: 'Blessing Bag-2000',
          key: 'prizeOne2000'
        },
        {
          name: 'Blessing Bag-1000',
          key: 'prizeOne1000'
        },
        {
          name: 'Blessing Bag-500',
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
        threePrize4: 2,
        prizeOne2000: 16,
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
          name: '三等奖(iPad mini6)',
          key: 'threePrize2'
        },
        {
          name: '三等奖(Dyson Supersonic Hair Dryer)',
          key: 'threePrize3'
        },
        {
          name: '三等奖(HUAWEI Watch 3 Pro)',
          key: 'threePrize4'
        },
        {
          name: 'Blessing Bag-2000',
          key: 'prizeOne2000'
        },
        {
          name: 'Blessing Bag-1000',
          key: 'prizeOne1000'
        },
        {
          name: 'Blessing Bag-500',
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
