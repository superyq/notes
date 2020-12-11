// 判断是否电话
export function isPhone(str) {
  return /^1[0-9]{10}$/.test(str)
}

// 判断是否为email
export function isEmail(str) {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(str);
}

// 判断是否对象
export const isObject = value => typeof value === 'object' && value !== null;

// 判断是否数组
export const isArray = value => Array.isArray(value);

// 判断对象是否有key键
export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

// 深拷贝
export const deepClone = src => {
  if (!isObject(src)) return src
  const target = isArray(src) ? [] : {}

  for (const key in src) {
    const v = src[key]
    target[key] = v && isObject(v) ? deepClone(v) : v;
  }

  return target
}

// 防抖 只触发一次
// 比如，拖拽触发函数，wait = 10秒，拖拽1分钟，只执行了1次
// 例子：缩放屏幕，echarts适应

export function debounce(fn, wait) {
  let timer;
  return function () {
    // let context = this; // 注意 this 指向
    let args = arguments; // arguments中存着e

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

// 节流 降低执行次数
// 比如，拖拽触发函数，wait = 10秒，拖拽1分钟，最多执行了6次
// 例子：输入框查询
export function throttle(fn, wait) {
  let timer
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this)
        timer = null
      }, wait)
    }
  }
}

// 数字转单位
// 例：toUnit(123, 1000, 2) 0.123
export function toUnit(number, unit, pre = 0) {
  if (typeof number != 'number') return '非数字'

  let unitL = (unit + "").length - 1
  let numberL = (number + "").split(".")[0].length
  let diff = numberL - unitL

  if (diff > 0) {
    return +`${(number + "").slice(0, diff)}.${(number + "").slice(diff, diff + pre)}`
  } else {
    return +`0.${"0".repeat(-diff)}${number}`
  }
}

// 获取数组大到小排序
// arr: 排序数组
// sort: 1，从小到大。-1，从大到小，
// params: 如果排序是对象，params为需要排序得参数
// 例：sort([{num:1}, {num: 11}], -1, "num") 输出 [{num: 11}, {num: 1}]
// 注释：由于sort函数会改变原数组排序，需要引用深拷贝函数，拷贝数组，这样就不会影响到
export function sortArr(arr, sort, params = null) {
  let _arr = deepClone(arr)

  function _sort(a, b) {
    let _a = params ? a[params] : a
    let _b = params ? b[params] : b

    if (_a - _b > 0) {
      return sort
    } else if (_a - _b < 0) {
      return -sort
    }
  }
  return _arr.sort(_sort)
}

// 补数
// 默认前置位补零到2位数
export function repair(number, count = 2, string = 0) {
  if (!number) return 0;
  return number.toString().padStart(count, string);
}