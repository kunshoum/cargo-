/** 
* 马少良
*/

import Vue from 'vue'
import { Notification } from 'element-ui'

let add0 = (n) => {
  n = n > 9 ? n : '0' + n 
  return n
}

export const getTime = () => {
  let oDate = new Date()
  let y = oDate.getFullYear()
  let m = oDate.getMonth() + 1
  let d = oDate.getDate()
  let h = oDate.getHours()
  let min = oDate.getMinutes() 
  let s = oDate.getSeconds()
  let nowTime = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(min) + ':' + add0(s)
  return nowTime
}

export const getDate = () => {
  let oDate = new Date()
  let y = oDate.getFullYear()
  let m = oDate.getMonth() + 1
  let d = oDate.getDate()
  let nowDate = y + '-' + add0(m) + '-' + add0(d)
  return nowDate
}

export const formatDate = date => {
  date = date ? date : ''
  return date.slice(0,10)
}

// 格式化时间
export const formatTime = time => {
  time = time ? time : ''
  return time.slice(0,19)
}

let dateRegx = /^\d{8}$/
let fullDateRegx = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
let timeRegx = /^\d{14}$/
// 格式化输入的日期 20180101 => 2018-01-01
export const formatIptDate = date => {
  if(dateRegx.test(date)) {
    return date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8)
  } else if(fullDateRegx.test(date)) {
    return date
  } else {
    Notification({
      title: "警告",
      message: '日期格式不正确',
      type: "warning",
    })
    return date
  }
}

// 格式化输入的时间 20180101120000 => 2018-01-01 12:00:00
export const formatIptTime = time => {
  if(timeRegx.test(time)) {
    return time.slice(0, 4) + '-' + time.slice(4, 6) + '-' + time.slice(6, 8) + ' ' 
    + time.slice(8, 10) + ':' + time.slice(10, 12) + ':' + time.slice(12, 14)
  }else {
    return time
  }
}

Vue.filter('formatDate', formatDate)
Vue.filter('formatTime', formatTime)