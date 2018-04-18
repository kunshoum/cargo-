/** 
* 马少良
*/

import {
  searchCity, 
  searchSenderReceiver, 
  searchAirport, 
  searchProduct, 
  searchProductCategory,
  searchPackage,
  searchCarrierCategory,
  getDepartListNoPage,
} from "../service"

// 城市
export const getCity = (This, query) => {
  if(query !== '') {
    This.loading = true
  }
  return searchCity({code: query}).then(res => {
    if(res.data.status === 200) {
      This.loading = false
      return res.data.data.map(item => {
        return {value: item.cn_name, label: item.cn_name}
      })
    }
  })
}

// 收发货人
export const getSenderReceiver = (This, query) => {
  if(query !== '') {
    This.loading = true
  }
  return searchSenderReceiver({code: query, is_start_relate: 1}).then(res => {
    if(res.data.status === 200) {
      This.loading = false
      return res.data.data
    }
  })
}

// 第一程、第二程
export const getAirport = (This, query, destination) => {
  if(query !== '') {
    This.loading = true
  }
  return searchAirport({airport_three_code: query, city: destination || ''}).then(res => {
    if(res.data.status === 200) {
      This.loading = false
      return res.data.data.map(item => {
        return {value: item.airport_name, label: item.airport_name}
      })
    }
  })
}

// 品名
export const getProduct = (This, query) => {
  if(query !== '') {
    This.loading = true
  }
  return searchProduct({code: query}).then(res => {
    if(res.data.status === 200) {
      This.loading = false
      return res.data.data
    }
  })
}

// 货物类别
export const getProductCategory = (This, query, type) => {
  if(query !== '') {
    This.loading = true
  }
  return searchProductCategory({code: query, type: type}).then(res => {
    if(res.data.status === 200) {
      This.loading = false
      return res.data.data
    }
  })
}

// 包装
export const getPackage = (This, query) => {
  if(query !== '') {
    This.loading = true
  }
  searchPackage({code: query}).then(res => {
    if(res.data.status === 200) {
      This.loading = false
      This.packages = res.data.data.map(item => {
        return {value: item, label: item}
      })

      This.allPackages = res.data.data.map(item => {
        return {value: item, label: item}
      })
    }
  })
}

// 自分类别
export const getCarrierCategory = (This, query, type) => {
  if(query !== '') {
    This.loading = true
  }
  return searchCarrierCategory({code: query, type: type}).then(res => {
    if(res.status === 200) {
      return res.data
    }
  })
}

// 部门
export const getCode = (This, query) => {
  if(query !== '') {
    This.loading = true
  }
  return getDepartListNoPage({code: query}).then(res => {
    if(res.data.status === 200) {
      This.loading = false
      return res.data.data.map(item => {
        return {value: item.name, label: item.name}
      })
    }
  })
}
