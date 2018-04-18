/** 
* 马少良
*/

export default {
  methods: {
    filterPackage(query) {  // 包装
      if(query !== '') {
        this.packages = this.allPackages.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1) 
          && (item.label.toLowerCase()[0] === query.toLowerCase()[0])
        })
      }else {
        this.packages = this.allPackages
      }
    },
    filterProducts(query) {  // 品名
      if(query !== '') {
        this.products = this.allProducts.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1) 
          && (item.label.toLowerCase()[0] === query.toLowerCase()[0])
        })
      }else {
        this.products = this.allProducts
      }
    },
    filterProductCategorys(query) {  // 货物类别
      if(query !== '') {
        this.productCategorys = this.allProductCategorys.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1) 
          && (item.label.toLowerCase()[0] === query.toLowerCase()[0])
        })
      }else {
        this.productCategorys = this.allProductCategorys
      }
    },
    filterDepartures(query) { // 始发站
      if(query !== '') {
        this.departures = this.allCitys.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1) 
          && (item.label.toLowerCase()[0] === query.toLowerCase()[0])
        })
      }else {
        this.departures = this.allCitys
      }
    },
    filterDestinations(query) { // 目的站
      if(query !== '') {
        this.destinations = this.allCitys.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1) 
          && (item.label.toLowerCase()[0] === query.toLowerCase()[0])
        })
      }else {
        this.destinations = this.allCitys
      }
    },
    filterAssociationPoints(query) {  // 关联点
      if(query !== '') {
        this.associationPoints = this.allCitys.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1) 
          && (item.label.toLowerCase()[0] === query.toLowerCase()[0])
        })
      }else {
        this.associationPoints = this.allCitys
      }
    },
    filterSenders(query) {  // 发货人
      if(query !== '') {
        this.senders = this.allSenders.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1) 
          && (item.label.toLowerCase()[0] === query.toLowerCase()[0])
        })
      }else {
        this.senders = this.allSenders
      }
    },
    filterReceivers(query) {  // 收货人
      if(query !== '') {
        this.receivers = this.allReceivers.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1) 
          && (item.label.toLowerCase()[0] === query.toLowerCase()[0])
        })
      }else {
        this.receivers = this.allReceivers
      }
    },
    filterFirstAirports(query) {  // 第一程
      if(query !== '') {
        this.firstAirports = this.allAirports.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1) 
          && (item.label.toLowerCase()[0] === query.toLowerCase()[0])
        })
      }else {
        this.firstAirports = this.allAirports
      }
    },
    filterSecondAirports(query) { // 第二程
      if(query !== '') {
        this.secondAirports = this.allAirports.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1) 
          && (item.label.toLowerCase()[0] === query.toLowerCase()[0])
        })
      }else {
        this.secondAirports = this.allAirports
      }
    },
    filterJointCompanys(query) {  // 拼货网络公司
      if(query !== '') {
        this.jointCompanys = this.allJointCompanys.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1) 
          && (item.label.toLowerCase()[0] === query.toLowerCase()[0])
        })
      }else {
        this.jointCompanys = this.allJointCompanys
      }
    },
  },
}