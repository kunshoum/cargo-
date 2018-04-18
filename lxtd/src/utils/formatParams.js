/**
 * 马少良
 * localParamsObj: 本地参数对象
 * backParamsObj: 后台返回参数对象
 */

let arrToObj = arr => {
  let obj = {}
  arr.forEach(item => {
    obj = {...obj, [item[0]]: item[1]}
  })
  return obj
}

let filterArr = (fullArr, filterArr) => {
  return fullArr.filter(item => {
    return filterArr.some(filterItem => filterItem[0] === item[0])
  })
}
  
export default (localParamsObj, backParamsObj) => arrToObj( filterArr(Object.entries(backParamsObj), Object.entries(localParamsObj)) )