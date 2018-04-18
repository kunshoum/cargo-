/** 
* 马少良
*/

export const splitCodeName = str => {
  if(str) {
    let res = str.split('/')
    if(res.length > 1) {
      return res[1]
    }else {
      return res[0]
    }
  }else {
    return ''
  }
}