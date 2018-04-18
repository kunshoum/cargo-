// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {router} from './router'
import store from './store/'
import 'babel-polyfill'
import './router/nprogress'
import { getStore } from "@/config/localStore"

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import App from './App'

import { LocalStore } from './config/localStore.js'
Vue.use(LocalStore)

import VueDND from 'awe-dnd'
Vue.use(VueDND)

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

import './style/reset.css'
import './style/cargo-font/iconfont.css'
import './style/cargo-font/iconfont.js'

Vue.directive('OnEnter', {
  bind: function(el, {
    value
  }, vnode) {
    if(el.className.indexOf('el-select') > -1) {
      el = el.querySelector('input')
    }
    
    el.addEventListener('keyup', (ev) => {
      if (ev.keyCode === 13) {
        let nextInput = vnode.context.$refs[value]
        if(vnode.componentInstance.handleClose) {
          vnode.componentInstance.handleClose()
        }

        if (nextInput && typeof nextInput.focus === 'function') {
          setTimeout(() => {
            nextInput.focus()
          }, 300)
        }
      }
    })
  }
})

let developer = ['平平', '君君', '超超', '良良', '朵朵', '蒙蒙', '管理员', '超级管理员', 'null']

document.addEventListener('contextmenu', function(evt) {
  if(developer.indexOf(getStore('real_name')) < 0) {
    evt.preventDefault()
  }
})

document.addEventListener('keydown', function(evt) {
  if(developer.indexOf(getStore('real_name')) < 0) {
    if(evt.keyCode === 123) {
      evt.preventDefault()
    }
  } 
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
