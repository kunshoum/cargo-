/** 
* 马少良
*/

import {router} from '@/router/index'
const axios = require('axios')
const qs = require('qs')

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

import { Message, Notification } from 'element-ui'
import {baseUrl} from './env.js'

import { clearStore } from "@/config/localStore.js"

axios.defaults.withCredentials = true
const service = axios.create({
  // timeout: 5000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // console.log('service start')
  NProgress.start()
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // console.log('service end')
    NProgress.done()
  
    if(response.data.status === 400) {
      Notification({
        title: "警告",
        message: response.data.message,
        type: "warning",
      })
    }
    
    return response
  },
  error => {
    console.log('err' + error) // for debug
    NProgress.done()
    if (error.response.status === 302) {
      Notification({
        title: "警告",
        message: '登录超时',
        type: "warning",
      })

      setTimeout(() => {
        router.replace({
          path: '/login'
        })
        clearStore()
        window.location.reload()
      }, 500)
      
    }else {
      Message({
        message: '网络不稳定',
        type: 'warning',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export const LXHR = {
  POST(url, params, type) {
    if(type === 'json') {
      return service.post(baseUrl + url, params)
    }else{
      return service.post(baseUrl + url, qs.stringify(params), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          }
      })
    }
  },
  GET(url, params) {
    return service.get(baseUrl + url + '/' + params, {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
  },
  READE(url) {
    return service.get(url, {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;text/plain'}, withCredentials: false})
  },
}