
// 本地储存
const setLocalStorage = (keyname, value) => {
  let newVal = value;
  if (typeof (value) === 'object') newVal = JSON.stringify(newVal);
  window.localStorage.setItem(keyname, newVal);
};

// 获取本地储存
export function getLocalStorage(keyname) {
  const val = window.localStorage.getItem(keyname);
  if (/^{.*}$/.test(val) || /^\[.*\]$/.test(val)) {
    return JSON.parse(val);
  }
  return val;
}

/**
 * 搜索参数对象过滤空参数
 * @param {Object} obj 搜索参数对象
 * @return {Object} 返回对象
 */
const removeEmpty = (obj) => {
  Object.keys(obj).forEach(key => (!obj[key]) && delete obj[key]);
  return obj;
};

/**
 * 根据子项key值数组去重
 * @param {Array} arr 传入数组
 * @param {String} key 子项key值
 * @return {Array} 返回新数组
 */
export function unique(arr, key) {
  const res = new Map();
  return arr.filter(a => !res.has(a[key]) && res.set(a[key], 1));
}

/**
 * 校验小数点保留几位数
 * @param {Number} num 传入数组
 * @param {Number} key 保留几位
 * @return {Boolean} 返回是否通过校验
 */
export function validatePoint(num, pointNum) {
  const str = `${num}`;
  const pointIndex = str.indexOf('.');
  if (pointIndex === -1) {
    return true;
  }
  return (str.length - pointIndex - 1) <= pointNum;
}

export { removeEmpty, setLocalStorage };
