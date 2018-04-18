export default [
  {
    index: "1",
    name: "收货",
    icon: "el-icon-fa-th",
    children: [
      {
        name: "国内",
        index: "1-1",
        children: [
          {
            index: "1-1-1",
            name: "收货主单管理",
            route: "/receive/main",
            title: "收货主单-查询",
            children: [],
          },
          {
            index: "1-1-2",
            name: "收货分单管理",
            route: "/receive/sub",
            title: "收货分单-查询",
            children: [],
          },
        ],
      },
    ],
  },
  {
    index: "2",
    name: "快件",
    icon: "el-icon-fa-rocket",
    children: [
      {
        name: "国内",
        index: "2-1",
        children: [
          {
            index: "2-1-1",
            name: "邮件管理",
            route: "/mail",
            title: "邮件-查询",
            children: [],
          },
          {
            index: "2-1-2",
            name: "民航快递",
            route: "/cae/sub",
            title: "民航快递-查询",
            children: [],
          },
        ],
      },
    ],
  },
  {
    index: "3",
    name: "出港",
    icon: "el-icon-fa-plane",
    children: [
      {
        name: "订舱",
        index: "3-1",
        children: [
          {
            index: "3-1-1",
            name: "订舱列表",
            route: "/booking/list",
            title: "订舱列表",
            children: [],
          },
          {
            index: "3-1-2",
            name: "按作业航班订舱",
            route: "/booking/byflight",
            title: "按作业航班订舱",
            children: [],
          },
          {
            index: "3-1-3",
            name: "普通订舱",
            route: "/booking/normal",
            title: "普通订舱",
            children: [],
          },
          {
            index: "3-1-4",
            name: "订舱日志",
            route: "/booking/log",
            title: "订舱日志",
            children: [],
          },
        ],
      },
      {
        name: "配载",
        index: "3-2",
        children: [
          {
            index: "3-2-1",
            name: "配载订舱",
            route: "/stowage/booking",
            title: "配载订舱",
            children: [],
          },
          {
            index: "3-2-2",
            name: "配载订舱列表",
            route: "/stowage/list",
            title: "配载订舱列表",
            children: [],
          },
          {
            index: "3-2-3",
            name: "初舱单",
            route: "/stowage/start",
            title: "初舱单",
            children: [],
          },
          {
            index: "3-2-4",
            name: "终舱单",
            route: "/stowage/end",
            title: "终舱单",
            children: [],
          },
          {
            index: "3-2-5",
            name: "航班关闭",
            route: "/stowage/close",
            title: "航班关闭",
            children: [],
          },
        ],
      },
    ],
  },
  {
    index: "4",
    name: "进港",
    icon: "el-icon-fa-fighter-jet",
    children: [
      {
        name: "国内",
        index: "4-1",
        children: [
          {
            index: "4-1-1",
            name: "进港主单管理",
            route: "/arrival/main",
            title: "进港主单-查询",
            children: [],
          },
          {
            index: "4-1-2",
            name: "进港分单管理",
            route: "/arrival/sub",
            title: "进港分单-查询",
            children: [],
          },
        ],
      },
    ],
  },
  {
    index: "5",
    name: "提货",
    icon: "el-icon-fa-truck",
    children: [
      {
        name: "国内",
        index: "5-1",
        children: [
          {
            index: "5-1-1",
            name: "提货主单管理",
            route: "/delivery/main",
            title: "提货主单-查询",
            children: [],
          },
          {
            index: "5-1-2",
            name: "提货分单管理",
            route: "/delivery/sub",
            title: "提货分单-查询",
            children: [],
          },
        ],
      },
    ],
  },
  {
    index: "6",
    name: "基础数据",
    icon: "el-icon-fa-bar-chart",
    children: [
      {
        name: "通用数据字典",
        index: "6-1",
        children: [
          {
            index: "6-1-1",
            name: "结算单位信息",
            route: "/basicData/1504",
            title: "通用数据字典 - 结算单位信息",
            children: [],
          },
        ],
      },
    ],
  },
  {
    index: "7",
    name: "综合查询",
    icon: "el-icon-fa-search",
    children: [
      {
        name: "收货相关报表",
        index: "7-1",
        children: [
          {
            index: "7-1-1",
            name: "收货生产报表-收益类",
            route: "/report/1184",
            title: "收货生产报表-收益类",
            children: [],
          },
        ],
      },
    ],
  },
  {
    index: "8",
    name: "仓库管理",
    icon: "el-icon-fa-cube",
    children: [
      {
        index: "8-1",
        name: "进港仓库管理",
        route: "/storeRoom/arrive/search",
        title: "进港仓库管理-查询",
        children: [],
      },
    ],
  },
  {
    index: "8-2",
    name: "出港仓库管理",
    route: "/storeRoom/departure/orderStore",
    title: "出港仓库管理-查询",
    children: [],
  },
  {
    index: "9",
    name: "系统设置",
    icon: "el-icon-setting",
    children: [
      {
        name: "用户管理",
        index: "9-1-1",
        route: "/system/byUser",
        title: "用户管理-查询",
        children: [],
      },
      {
        name: "部门管理",
        index: "9-1-2",
        route: "/system/byDepart",
        title: "部门管理-查询",
        children: [],
      },
      {
        name: "个人中心",
        index: "9-1-3",
        route: "/system/byPersonal",
        title: "个人中心-查询",
        children: [],
      },
    ],
  },
  {
    index: "10",
    name: "票证管理",
    icon: "el-icon-fa-ticket",
    children: [
      {
        name: "票证管理",
        index: "10-1-5",
        route: "/ticket/management",
        title: "票证管理-查询",
        children: [],
      },
      {
        name: "票证操作",
        index: "10-1-2",
        route: "/ticket/currentOperation",
        title: "票证操作",
        children: [],
      },
      {
        name: "票证入库",
        index: "10-1-1",
        route: "/ticket/entry",
        title: "票证入库",
        children: [],
      },
      {
        name: "票证分领",
        index: "10-1-3",
        route: "/ticket/division",
        title: "票证分领",
        children: [],
      },
      {
        name: "票证日志",
        index: "10-1-4",
        route: "/ticket/daily",
        title: "票证日志",
        children: [],
      },
      {
        name: "异常票证日志",
        index: "10-1-6",
        route: "/ticket/difdaily",
        title: "异常票证日志",
        children: [],
      },
    ],
  },
  {
    index: "11",
    name: "收付款管理",
    icon: "el-icon-sold-out",
    children: [
      {
        index: "11-1",
        name: "收款明细",
        route: "/repayment/recipt/detail",
        title: "收款明细-查询",
        children: [],
      },
    ],
  },
  {
    index: "11-2",
    name: "收款账单",
    route: "/repayment/recipt/list",
    title: "收款账单-查询",
    children: [],
  },
  {
    index: "11-3",
    name: "付款明细",
    route: "/repayment/payment/detail",
    title: "付款账单-查询",
    children: [],
  },
  {
    index: "11-4",
    name: "付款账单",
    route: "/repayment/payment/list",
    title: "付款账单-查询",
    children: [],
  },
]
