export function setData(key, value) {
  if (typeof value === 'string') {
    return localStorage.setItem(key, value);
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    return err;
  }
}

export function getData(key) {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}

export function removeData(key) {
  return localStorage.removeItem(key);
}

export function clearData() {
  return localStorage.clear();
}

export function getDomData(element, dataName) {
  if (!element || !dataName || !element.getAttribute) {
    return;
  }
  return element.getAttribute('data-' + dataName);
}
export function getName() {
  // console.log(this.$store.state.allList);
  return;
}

export const configField = 'config'; // 配置数据
export const resultField = 'result'; // 抽奖结果
export const newLotteryField = 'newLottery'; // 新增奖项
export const listField = 'list'; // 名单
export const studentField = 'studentList'; // 学生名单
export const attendField = 'attendList' || []; // 参与人员名单

export function conversionCategoryName(key) {
  let name = '';
  switch (key) {
    case 'Award':
      name = '特特特等奖(Huawei Mate XT 华为非凡大师三折叠屏手机-512GB)';
      break;
    case 'Award2':
      name = '特等奖(Apple iphone 17 pro max 全网通5G手机-512GB)银色';
      break;
    case 'Award3':
      name = '特等奖(Apple iphone 17 pro max 全网通5G手机-512GB)橘色';
      break;
    case 'firstPrize1':
      name = '一等奖(Dyson V12 Detect Slim™ Vacuum 戴森吸尘器V12)';
      break;
    case 'firstPrize2':
      name =
        '一等奖(Disney Gift Package (Including 2 adults and 1 child tickets and one night Disney Resort) 迪士尼礼包（含2大1小1日门票&1晚迪士尼度假区住宿）)';
      break;
    case 'twoPrize1':
      name = '二等奖(Dyson Supersonic Hair Dryer 戴森吹风机)';
      break;
    case 'twoPrize2':
      name = '二等奖(Apple Watch S11 苹果智能手表GPS款)';
      break;
    case 'twoPrize3':
      name = '二等奖(DJI Osmo Pocket 3 大疆一英寸口袋云台相机)';
      break;
    case 'threePrize':
      name = '三等奖';
      break;
    case 'prize500':
      name = '福袋-500';
      break;
    // case 'threePrize1':
    //   name = '三等奖(iPAD 256GB-A16 苹果平板电脑)';
    //   break;
    // case 'threePrize2':
    //   name = '三等奖(DJI Drone Neo 大疆掌上无人机)';
    //   break;
    // case 'threePrize3':
    //   name =
    //     '三等奖(Marshall ACTON III Wireless Bluetooth speaker 马歇尔第三代家用无线音箱)';
    //   break;
    // case 'threePrize4':
    //   name =
    //     '三等奖(Marshall ACTON III Wireless Bluetooth speaker 马歇尔第三代家用无线音箱)';
    //   break;
    // case 'threePrize5':
    //   name = '三等奖(Apple AirPods Pro3 苹果蓝牙耳机)';
    //   break;
    // case 'threePrize6':
    //   name = '三等奖(Apple AirPods Pro3 苹果蓝牙耳机)';
    //   break;
    // case 'threePrize7':
    //   name = '三等奖(2000 Yuan Airline voucher 机票代金券2000元)';
    //   break;
    // case 'threePrize8':
    //   name = '三等奖(La Prairie SKIN CAVIAR LUXE EYE CREAM 莱珀妮鱼子酱眼霜)';
    //   break;
    // case 'threePrize9':
    //   name = '三等奖(1000 Yuan JD Card 京东购物卡1000元-1)';
    //   break;
    // case 'threePrize10':
    //   name = '三等奖(1000 Yuan JD Card 京东购物卡1000元-2)';
    //   break;
    // case 'threePrize11':
    //   name =
    //     '三等奖(One-night accommodation voucher for Waldorf Astoria 华尔道夫住宿券壹晚)';
    //   break;
    // case 'threePrize12':
    //   name = '三等奖(Microsoft Audio Dock 微软多媒体音响)';
    //   break;
    // case 'threePrize13':
    // name = '三等奖(Microsoft Audio Dock 微软多媒体音响)';
    // break;
    // case 'prizeTwo2000':
    //   name = '福袋-2000()';
    //   break;
    // case 'prizeOne1000':
    //   name = '福袋-1000()';
    //   break;
    // case 'prizeTwo1000':
    //   name = '福袋-1000()';
    //   break;
    // case 'prizeOne500':
    //   name = '福袋-500()';
    //   break;
    // case 'prizeTwo500':
    //   name = '福袋-500()';
    //   break;
    // case 'prizeThree500':
    //   name = '福袋-500()';
    //   break;
    default:
      break;
  }
  const newLottery = getData(newLotteryField) || [];
  const findres = newLottery.find(item => item.key === key);
  if (findres) {
    name = findres.name;
  }
  return name;
}
