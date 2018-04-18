/** 
* 马少良
*/

import { sessionTimeOut } from "@/service"

var timer = null
export const start = () => {
  timer = setInterval(() => {
    try {
      sessionTimeOut().then(res => {

      }).catch(err => {
        clearInterval(timer)
      })
    }catch(err){
      clearInterval(timer)
    }
  }, 1800000)
}

export const end = () => {
  clearInterval(timer)
}
