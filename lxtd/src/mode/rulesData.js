// 校验对应单号
let correspondOrderRegx = /^\w{11,12}(\(\d+\))?(\/\w{11,12}\(\d+\))*$/
const validateCorrespondOrder = (rule, value, callback) => {
  if (value !== "" && !correspondOrderRegx.test(value)) {
    callback(new Error("请按“单号(件数)/单号(件数)”的格式输入,只有一个单号时可不输入件数"))
  } else {
    callback()
  }
}

let numberRegx = /^[0-9]*$/
const validateNumber = (rule, value, callback) => {
  if (value !== "" && !numberRegx.test(value)) {
    callback(new Error("必须为数字值"))
  } else {
    callback()
  }
}

const validateOrderNum = (rule, value, callback) => {
  if (value === "" || !numberRegx.test(value)) {
    callback(new Error("请输入单号数字"))
  } else {
    callback()
  }
}

import {regThreeCode} from "./ruleMethods"

export default {
  // "params.order_three_code": [{ validator: regThreeCode, trigger: "blur"}],
  "params.order_num": [{ required: true, validator: validateOrderNum, trigger: "blur" }],
  "params.departure_code": [{ required: true, message: "请输入始发站代码", trigger: "blur" }],
  "params.destination_code": [{ required: true, message: "请输入目的站代码", trigger: "blur" }],
  "params.quantity": [{ required: true, message: "请输入件数" }, { type: "integer", message: "必须为整数值" }],
  "params.net_weight": [{ required: true, message: "请输入实重" }, { type: "number", message: "必须为数字值" }],
  "params.weight": [{ required: true, message: "请输入计重" }, { type: "number", message: "必须为数字值" }],
  "params.insurance_value": [{ validator: validateNumber}],
  "params.declared_value": [{ validator: validateNumber}],
  "params.correspond_order_no": [{ validator: validateCorrespondOrder}],
  "params.endNum": [{ required: true, message: "请输入大于起始号段的号段", trigger: "blur" }],
}
