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
