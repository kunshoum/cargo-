const axios = require('axios')
const qs = require('qs')
import { baseUrl } from "./env.js"

// axios.defaults.withCredentials = true

const service = axios.create()

import { Notification } from 'element-ui'

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if(response.data.status === 400) {
      Notification({
        customClass: "warnNotification",
        title: "警告",
        message: response.data.message,
        type: "warning",
      })
    }

    return response
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)


export const LXHR = {
  POST(url, params, type) {
    if(type && type.toLowerCase() === "json") {
      return service.post(baseUrl + url, params)
    }else {
      return service.post(baseUrl + url, qs.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
      })
    }
  },
  GET(url, params) {
    return service.get(baseURL + url, params)
  },
  GETREMOTE(url, params) {
    return service.get(url, {
      params: params
    })
  }
}