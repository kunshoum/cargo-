let numberRegx = /^\d+\.?\d*$/
let certificateRegx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
let numberAndAbcRegx = /^[0-9a-zA-Z]*$/g
let phoneRegx = /^1[3|4|5|7|8][0-9]{9}$/
let specialRegx = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
// 验证电话、手机号
let telPhone = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^0?[1][345789][0-9]{9}$)/
let times = /([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/

export const isRequired = (rule, value, callback) => {
  if (!value || value.toString().trim() === "") {
    callback(new Error("请输入体积"))
  } else if (value !== "" && !numberRegx.test(value * 1)) {
    callback(new Error("必须为数字值"))
  } else {
    callback()
  }
}

export const isNumber = (rule, value, callback) => {
  if (value !== "" && !numberRegx.test(value * 1)) {
    callback(new Error("必须为数字值"))
  } else {
    callback()
  }
}

export const isTimes = (rule, value, callback) => {
  if (value !== "" && !times.test(value)) {
    callback(new Error("必须为时间日期格式"))
  } else {
    callback()
  }
}

export const isnumRequired = (rule, value, callback) => {
  if (value !== "" && !numberRegx.test(value * 1)) {
    callback(new Error("必须为数字值"))
  } else {
    callback()
  }
}

export const priceRequired = (rule, value, callback) => {
  if (typeof value === "object") {
    if (value.price_species) {
      if (value.price_species.toString().trim() === "") {
        callback(new Error("请选择价种"))
      } else {
        callback()
      }
    } else {
      callback(new Error("请选择价种"))
    }
  } else {
    callback(new Error("请选择价种"))
  }
}

export const regCertificate = (rule, value, callback) => {
  if (value && !certificateRegx.test(value)) {
    callback(new Error("请输入正确的证件号"))
  } else {
    callback()
  }
}

export const regThreeCode = (rule, value, callback) => {
  if (!numberAndAbcRegx.test(value)) {
    callback(new Error("请输入正确格式的三字码"))
  } else {
    callback()
  }
}

export const regPhone = (rule, value, callback) => {
  if (!phoneRegx.test(value)) {
    callback(new Error("格式不正确"))
  } else {
    callback()
  }
}

export const telPhones = (rule, value, callback) => {
  console.log(value)
  if (value && value !== "" && !telPhone.test(value)) {
    callback(new Error("格式不正确")) 
  } else {
    callback()
  }
}

export const regSpecial = (rule, value, callback) => {
  if (value && value.length && !specialRegx.test(value)) {
    callback(new Error("不可包含特殊字符"))
  } else {
    callback()
  }
}

let englich = /^[A-Za-z]*$/
export const isEnglich = (rule, value, callback) => {
  if (value !== "" && !englich.test(value)) {
    callback(new Error("必须为英文字母"))
  } else {
    callback()
  }
}
