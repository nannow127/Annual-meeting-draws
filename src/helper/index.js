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
export function conversionCategoryName(key) {
  let name = '';
  switch (key) {
    case 'firstPrize':
      name = '一等奖(iPhone 15 Pro Max 512G-Gray)';
      break;
    case 'twoPrize':
      name = '二等奖(Dyson Dust Catcher)';
      break;
    case 'threePrize1':
      name = '三等奖(Surface Lapto Go 2)';
      break;
    case 'threePrize2':
      name = '三等奖(iPad mini6-64GB)';
      break;
    case 'threePrize3':
      name = '三等奖(Dyson Supersonic Hair Dryer)';
      break;
    case 'prizeOne2000':
      name = '福袋-2000';
      break;
    case 'prizeOne1000':
      name = '福袋-1000';
      break;
    case 'prizeOne500':
      name = '福袋-500';
      break;
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
