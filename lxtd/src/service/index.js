import { LXHR } from "../config/LXHR.js"
//王艺蒙

// 收货预计航班四字码
export const getFlightNum = params => LXHR.POST("/def/receive/get_flight_no_by_flight_num", params)
// 收货预计航班四字码验证
export const getNoByFlightInfo = params => LXHR.POST("/def/receive/get_flight_no_by_flight_info", params)
export const login = params => LXHR.POST("/auth/login", params) // 登陆
export const loginOut = params => LXHR.POST("/auth/logOut", params) // 登陆
export const getReciveList = params => LXHR.POST("/def/receive/pageQueryReceive", params) // 查询收货列表
export const saveRecive = params => LXHR.POST("/def/receive/insertReceive", params, "json") // 保存收货单
export const beforeEditRecive = params => LXHR.POST("/def/receive/beforeEditReceive", params) // 编辑前查询收货单
export const editRecive = params => LXHR.POST("/def/receive/editReceive", params, "json") // 编辑前查询收货单
export const isOrderUsed = params => LXHR.POST("/def/order/check_order", params) // 查询单号是否可用
export const searchMainPrint = params => LXHR.POST("/def/receive/print/get_main_single", params) // 查询主单打印数据
export const consignmentReceive = params => LXHR.POST("/def/receive/get_product_go_to", params) // 发货去向


export const priceRate = params => LXHR.POST("/def/receive/check_cost", params) // 运价对比

export const cancelOrders = params => LXHR.POST("/def/receive/deleteReceive", params, "json") // 作废单号

export const deleteOrders = params => LXHR.POST("/def/receive/delete_receive_from_data_base", params, "json") // 删除换单

export const checkCost = params => LXHR.POST("/def/receive/check_cost", params) // 费用


export const listFlightInfo = params => LXHR.POST("/def/flight_manage/listFlightInfo", params) // 航班

export const bindFilterItem = () => LXHR.POST("/def/receive/list_joint_cargo_user_item") // 拼单筛选条件查询
export const saveBindFilterItem = params => LXHR.POST("/def/receive/save_joint_cargo_user_item", params, "json") // 拼单筛选条件保存

// 获取单号
export const searchOrderNo = params => LXHR.POST("/def/receive/getOrderNo", params)
export const searchBindList = params => LXHR.POST("/def/receive/getUnSeclected", params) // 获取可拼单

export const searchCity = params => LXHR.POST("/def/receive/getCity", params) // 查询城市(始发站、目的站)
export const searchSenderReceiver = params => LXHR.POST("/def/receive/getSenderReceiver", params) // 查询收发货人
export const searchAirport = params => LXHR.POST("/def/receive/getAirport", params) // 查询第一程第二程

export const searchTransferProcess = params => LXHR.POST("/def/receive/get_transfer_process", params) // 查询第一程第二程

export const searchProduct = params => LXHR.POST("/def/receive/getProduct", params) // 查询品名
export const searchProductCategory = params => LXHR.POST("/def/receive/getProductCategory", params) // 查询货物类别
export const searchPackage = params => LXHR.POST("/def/receive/getPackage", params) // 查询包装
export const searchCarrierCategory = params => LXHR.POST("/def/receive/getCarrierCategory", params) // 查询自分类别
export const searchReceiver = params => LXHR.POST("/def/receive/getReceiver", params) // 查询收货人
export const searchJointCompany = params => LXHR.POST("/def/receive/getJointCargoNetworkCompany", params) // 查询拼货网络公司
export const searchServiceState = params => LXHR.POST("/def/service/queryCustServiceState", params) // 查询客服状态
export const searchClearUnit = params => LXHR.POST("/def/receive/getClearing_unit", params) // 查询结算单位

export const searchPrice = params => LXHR.POST("/def/receive/getMainSingleFlightRate", params) // 查询价种
export const searchCost = params => LXHR.POST("/def/receive/getCostItem", params) // 查询费用
export const getFlightInfo = params => LXHR.POST("/def/output/booking/getFlightListRelated", params) // 获取相关航班信息
export const getBookingByOrder = params => LXHR.POST("/def/output/booking/getBookingByOrder", params) // 订舱情况
export const insertUrl = params => LXHR.POST("/def/receive/insertArrive/", params) // 添加到达情况
export const getDeleteUrl = params => LXHR.POST("/def/receive/deleteArrive/", params) // 删除到达情况
export const getArriveUrl = params => LXHR.POST("/def/receive/getArrive/", params) // 查询到达情况
export const editUrl = params => LXHR.POST("/def/receive/editArrive/", params) // 编辑到达情况
export const getStart = params => LXHR.POST("/def/receive/getStart/", params) // 出发情况

export const searchRelevance = () => LXHR.POST("/def/cost/basic_data/get_relevance") // 关联性
export const searchChoiceWay = () => LXHR.POST("/def/cost/basic_data/get_invoice_choice_way") // 取舍方式
export const searchCostName = params => LXHR.POST("/def/cost/basic_data/get_cost_name", params) // 费用名称
export const searchSummary = params =>
  LXHR.POST("/def/receive/calculate_clear_unit_count_by_update_cost", params, "json") // 按结算单位汇总

export const searchSpecialSet = params => LXHR.POST("/def/cost_special_setting/get_special_info", params) // 特殊设置

// 民航快递
export const pageQueryCA = params => LXHR.POST("/def/receive/pageQueryReceive/", params) // 民航快递查询
export const queryCustServiceState = params => LXHR.POST("/def/service/queryCustServiceState", params) // 民航快递获取下拉菜单
export const insertCA = params => LXHR.POST("/def/express/ca/insertCA/", params) // 民航快递添加
export const editCA = params => LXHR.POST("/def/express/ca/editCA/", params) // 民航快递编辑
export const beforeEditCA = params => LXHR.POST("/def/express/ca/beforeEditCA/", params) // 民航快递编辑前查询

export const searchPriceCA = params => LXHR.POST("/def/express/ca/get_ca_pricespecies", params) // 查询价种
export const searcharea = params => LXHR.POST("/def/express/ca/get_area_by_destination", params) // 区域
export const searchCostCA = params => LXHR.POST("/def/express/ca/get_ca_cost_item", params) // 费用

//进港查询
export const ArrivalSearch = params => LXHR.POST("/def/input/list_input", params)
//货物状态
export const ArrivalCargo = params => LXHR.POST("/def/input/basic_data/get_cargo_status", params)
//提货地点
export const ArrivaLocation = params => LXHR.POST("/def/pick_up/basic_data/get_pick_up_location", params)

// 订舱
export const bookingFlightList = params => LXHR.POST("/def/output/booking/getFlightList", params)
export const bookingDetail = params => LXHR.POST("/def/output/booking/getBookingDetail", params) // 订舱详情
export const bookingList = params => LXHR.POST("/def/output/booking/getBookingList", params) // 订舱列表

//进港添加
export const ArrivaInsert = params => LXHR.POST("/def/input/insert_input", params, "json")
//进港编辑前查询
export const Arrivaby = params => LXHR.POST("/def/input/get_input_by_id", params)
//进港编辑修改
export const ArrivaUpdateby = params => LXHR.POST("/def/input/update_input_by_id", params, "json")
//结算方式
// /def/finance_basic_data/get_pay_method
export const getPayMethod = params => LXHR.POST("/def/cost/basic_data/get_pay_method", params)
//进港分单   区域
export const getAreaArea = params => LXHR.POST("/def/pick_up/basic_data/getArea", params)
//进港分单  付款方式
// export const getPayBasicData = params => LXHR.POST('/def/cost/basic_data/get_pay_method', params)
//进港分单   派送路线
export const getDeliveryLine = params => LXHR.POST("/def/input/basic_data/get_delivery_line", params)
//进港分单   库房
export const storeRoom = params => LXHR.POST("/def/store_room/store_room", params)

//进港分批记录，删除
export const getInputSingle = params => LXHR.POST("/def/input/delete_by_single_order_no", params)

//提货：收货人证件类别调接口
export const getcertificate = params => LXHR.POST("/def/pick_up/basic_data/get_certificate_category", params)
//提货查询
export const deliverySearch = params => LXHR.POST("/def/pick_up/list_pick_up", params)
//提货编辑前查询
export const deliveryby = params => LXHR.POST("/def/pick_up/get_pick_up_by_id", params)
//提货编辑修改
export const deliveryUpdateby = params => LXHR.POST("/def/pick_up/update_pick_up_by_id", params, "json")
//提货添加
export const deliveryInsert = params => LXHR.POST("/def/pick_up/insert_pick_up", params, "json")
//
export const getDelivery = params => LXHR.POST("/def/input/get_input_by_order_no", params)

//提货按钮
export const clickPickUp = params => LXHR.POST("/def/pick_up/click_pick_up", params)

export const deliverygetFlightInfo = params => LXHR.POST("/def/input/basic_data/get_flight_info", params)
// 提货费用
export const deliverygetCostItem = params => LXHR.POST("/def/pick_up/getCostItem", params)
//基础数据
export const oftenDeliveryPerson = params => LXHR.POST("/def/pick_up/basic_data/get_often_delivery_person", params)

//基础数据
export const emportExcel = params => LXHR.POST("/def/basic/util/exportXls", params) // 导出
export const loadPageItem = params => LXHR.POST("/def/basic/util/getSelectParamAndShowColList", params) // 获取页面显示项，查询项
export const importExcel = params => LXHR.POST("/def/basic/util/uploadExcel", params, "json") // 导入
export const searchExcel = params => LXHR.POST("/def/basic/util/getDataList", params, "json") // 查询

export const addBasicData = params => LXHR.POST("/def/basic/util/addByCopy", params, "json") // 添加
export const editBasicData = params => LXHR.POST("/def/basic/util/editBatch", params, "json") // 编辑
export const batchDelete = params => LXHR.POST("/def/basic/util/deleteBatch", params, "json") // 批量删除
export const beforeEditBasic = params => LXHR.POST("/def/basic/util/beforeEdit", params) // 编辑前查询
export const saveBasicSet = params => LXHR.POST("/def/basic/util/save_basic_items", params, "json") // 保存设置项
export const beforeEditInline = params => LXHR.POST("/def/basic/util/before_edit_inline", params) // 行内编辑前查询


// 报表
export const searchReportSet = params => LXHR.GET("/def/zhcx/reportHistory/queryReportItems", params) // 导出
export const searchDeliveryReport = params => LXHR.POST("/def/zhcx/delivery/get_delivery_produce_report", params) // 查询收货报表列表
export const saveReportSet = params => LXHR.POST("/def/zhcx/reportHistory/saveReportItem", params, "json") // 保存列表设置项

//仓库
export const searchLocation = params => LXHR.POST("/def/storage_location/query_location", params) // 库位查询
export const getStore = params => LXHR.POST("/def/goods_detail/goods", params) // 入库
export const kuwDoods = params => LXHR.POST("/def/goods_detail/detail", params) // 库位下货物检索
export const inidGet = params => LXHR.POST("/def/goods_detail/in_id", params) // 入库单号
export const orderBack = params => LXHR.POST("/def/goods_detail/surplus", params) // 运单号反写
export const deleteStore = params => LXHR.POST("/def/goods_detail/delete", params) // 删除
export const gostore = params => LXHR.POST("/def/goods_detail/batch", params, "json") // 出库
export const batchStore = params => LXHR.POST("/def/goods_detail/not_in", params) // 批量入库未入库运单查询
export const getStoreBatch = params => LXHR.POST("/def/goods_detail/batch_in", params, "json") // 批量入库



//查询订舱列表
export const listBookingOut = params => LXHR.POST("/def/output/booking/list_booking", params)
//普通订舱
export const addBookingOut = params => LXHR.POST("/def/output/booking/add_booking", params)
//普通订舱   运单号
export const getOrderInfoByOrderNo = params => LXHR.POST("/def/output/stowage/get_order_info_by_order_no", params)

//订舱查看
export const getBookingOut = params => LXHR.POST("/def/output/booking/get_booking_info_by_id", params)
//订舱取消
export const BookingOutStatus = params => LXHR.POST("/def/output/booking/update_booking_status", params, "json")
//查看订舱日志
export const listBookingLogOut = params => LXHR.POST("/def/output/booking/list_booking_log", params)
//订舱日志点击查看
export const getBookingLogById = params => LXHR.POST("/def/output/booking/get_booking_log_by_id", params)
//订舱修改
export const upDateBookingOut = params => LXHR.POST("/def/output/booking/update_booking_by_id", params)
//订舱号
export const getBookingNo = params => LXHR.POST("/def/output/booking/get_booking_no", params)

//系统设置
export const getLevel = params => LXHR.POST("/def/empl_manage/get_level", params) //级别
export const getEmpList = params => LXHR.POST("/def/empl_manage/get_empl_list", params) //用户管理查询
export const getEmplById = params => LXHR.POST("/def/empl_manage/get_empl_by_id", params) //用户管理编辑前查询
export const updateEmplById = params => LXHR.POST("/def/empl_manage/update_empl_by_id", params) //用户管理编辑保存     //个人信息编辑保存
export const deleteEmplById = params => LXHR.POST("/def/empl_manage/delete_empl_by_id", params) //用户管理删除
export const addEmpl = params => LXHR.POST("/def/empl_manage/add_empl", params) //用户管理添加
export const getEmplAuthByUserid = params => LXHR.POST("/def/empl_manage/get_empl_auth_by_userid", params) //用户管理设置
export const saveEmplAuth = params => LXHR.POST("/def/empl_manage/save_empl_auth", params, "json") //用户管理设置   保存权限

export const getEmplDataAuthByUserid = params => LXHR.POST("/def/data_auth_manage/list_empl_data_auth", params) //用户管理数据权限设置
export const saveEmplDataAuthByUserid = params => LXHR.POST("/def/data_auth_manage/save_empl_data_auth", params, "json") //保存用户管理数据权限设置

export const getDepartListNoPage = params => LXHR.POST("/def/depart_manage/get_depart_list_no_page", params) //部门    部门管理查询
export const getDepartList = params => LXHR.POST("/def/depart_manage/get_depart_list", params) //部门    部门管理查询 分页
export const getDepartById = params => LXHR.POST("/def/depart_manage/get_depart_by_id", params) //部门    部门管理编辑前查询
export const updateDepartById = params => LXHR.POST("/def/depart_manage/update_depart_by_id", params) //部门    部门管理编辑保存
export const addDepart = params => LXHR.POST("/def/depart_manage/add_depart", params) //部门    部门管理添加保存
export const updatePasswordById = params => LXHR.POST("/def/empl_manage/update_password_by_id", params) //修改密码
export const getDepartAuthByid = params => LXHR.POST("/def/depart_manage/get_depart_auth_byid", params) //部门管理   权限管理
export const saveDepartAuth = params => LXHR.POST("/def/depart_manage/save_depart_auth", params, "json") //部门管理   权限管理
export const getDepartdataById = params => LXHR.POST("/def/data_auth_manage/list_depart_data_auth", params) //用户管理数据权限设置
export const deleteDepartById = params => LXHR.POST("/def/depart_manage/delete_depart_by_id", params) //部门管理  删除
export const saveDepartdataById = params => LXHR.POST("/def/data_auth_manage/save_depart_data_auth", params, "json") //保存部门管理数据权限设置

//票证

export const tickeSearch = params => LXHR.POST("/def/order/search", params, "json") //票证查询
export const storageOpe = params => LXHR.POST("/def/unit/to_unit") //入库操作下拉框
export const sourceUnit = params => LXHR.GET("/def/unit/from_unit", params) //源单位下拉框
export const tickeType = params => LXHR.POST("/def/order_type", params) //票证类型下拉框
export const sureStorage = params => LXHR.POST("/def/order", params, "json") //确认入库
export const tickeOpdaily = params => LXHR.POST("/def/order/record/op_record", params) //票证操作日志
export const tickeDaily = params => LXHR.POST("/def/order/record/flow_record", params) //票证流转日志
export const difDaily = params => LXHR.POST("/def/order/record/exception_record", params) //票证异常日志
export const difdailyEdit = params => LXHR.POST("/def/order/record/update_exception_record", params) //票证异常日志修改
export const divisionTicket = params => LXHR.POST("/def/order/change_order", params) //确认分领
export const ticketOpera = params => LXHR.POST("/def/order/op_order", params, "json") //票证操作
export const prefixTicket = params => LXHR.POST("/def/order_type/order_prefix", params) //单证前缀

// 报表收货销售类  page_id
export const getReportItems = params => LXHR.POST("/def/zhcx/util/get_report_items", params)
// 报表收货销售类   所有的保存接口
export const saveReportItems = params => LXHR.POST("/def/zhcx/util/save_report_items", params, "json")
// 报表收货销售类   查询
export const listReportRecords = params => LXHR.POST("/def/zhcx/util/list_report_records", params)

// 报表收货销售类   导出
export const exportXlsListReportRecords = params => LXHR.POST("/def/zhcx/util/export_xls_list_report_records", params)

export const renderReport = params => LXHR.POST("/def/zhcx/report_items", params) // M 报表渲染页
export const setReport = params => LXHR.POST("/def/zhcx/report_items/report_user_items", params, "json") // M 报表保存
export const searchReportm = params => LXHR.POST("/def/zhcx/pick_up/income_report", params) // M 报表查询
export const searchlistReportm = params => LXHR.POST("/def/zhcx/pick_up/sell_report", params) //提货收益
export const searchroomReportm = params => LXHR.POST("/def/zhcx/arrive/storeroom", params) //提货销售
export const searchpickupReportm = params => LXHR.POST("/def/zhcx/pick_up/arrive_order", params) //到达提货单
export const searchinternetReportm = params => LXHR.POST("/def/zhcx/pick_up/clear_order", params) //网络公司到达结算清单
export const searchlocalReportm = params => LXHR.POST("/def/zhcx/arrive/local_clear", params) //本地到达结算清单
export const selectItem = params => LXHR.POST("/def/zhcx/report_items/select_detail", params) // M 报表下拉选
export const exportReport = params => LXHR.POST("/develop_tool/table2Excel", params) // M 导出

export const updatePrintNum = params => LXHR.POST("/def/receive/print/print_main_single", params)
export const pickUpPrint = params => LXHR.POST("/def/pick_up/print_pick_up_order", params)
export const outLet = params => LXHR.POST("/def/store_room/basic/outlet", params)

export const searchStoreInfo = params => LXHR.POST("/def/receive/get_product_detail_by_store_room", params)
export const printEnd = params => LXHR.POST("/def/output/stowage/print/out_bill", params) //终舱单打印出港出货单
export const printEndload = params => LXHR.POST("/def/output/stowage/print/apply_bill", params) //终舱单打印装载申请单

export const printPlanBooking = params => LXHR.POST("/def/output/booking/print_plan_booking", params) //订舱 预配表打印

export const deliveryPrint = params => LXHR.POST("/def/receive/print/get_delivery_order_by_order_no", params) // 派送单打印

export const searchPaymentMethod = params => LXHR.POST("/def/receive/get_payment_method", params) // 获取付款方式

export const batchBill = params => LXHR.POST("/def/output/stowage/print/batch_bill", params) // 分批打印单

export const listModule = params => LXHR.POST("/def/right_module/list_module", params) // 航班组件查询

export const saveModule = params => LXHR.POST("/def/right_module/save_module", params) // 航班组件查询

export const insertFlight = params => LXHR.POST("/def/right_module/insert_flight", params) // 航班组件查询

export const deleteFlight = params => LXHR.POST("/def/right_module/delete_flight", params) // 航班组件查询


// 收付款
export const listOrder = params => LXHR.POST("/def/finance/receive_payment/list_order", params) // 收款--运单查询（主页面）

export const getCostDetailByOrderNo = params => LXHR.POST("/def/finance/receive_payment/get_cost_detail_by_order_no", params) // 运单费用详情

export const countSettlementOrder = params => LXHR.POST("/def/finance/receive_payment/count_settlement_order", params, "json") // 生成结算单--弹窗（转json）

export const saveSettlementOrder = params => LXHR.POST("/def/finance/receive_payment/save_settlement_order", params, "json") // 生成结算单--弹窗确认（转json）

export const listSettlement = params => LXHR.POST("/def/finance/receive_payment/list_settlement", params) // 查询结算单（主页面）

export const getSettlementById = params => LXHR.POST("/def/finance/receive_payment/get_settlement_by_id", params) // 结算单详情

export const listReceipt = params => LXHR.POST("/def/finance/receive_payment/list_receipt", params) // 收款单查询（主页面）

export const updateCheckStatus = params => LXHR.POST("/def/finance/receive_payment/update_check_status", params, "json") // 核账通过/不通过（转json）

export const updateInvalidStatus = params => LXHR.POST("/def/finance/receive_payment/update_invalid_status", params, "json") // 作废（转json）

export const saveReceipt = params => LXHR.POST("/def/finance/receive_payment/save_receipt", params, "json") // 结算单选中几条 点击结算--->生成收款单

export const getReceiptById = params => LXHR.POST("/def/finance/receive_payment/get_receipt_by_id", params) // 通过id查询收款单详情

export const updateSaleStatus = params => LXHR.POST("/def/finance/receive_payment/update_sale_status", params, "json") // 销账

export const singleTicketReceipt = params => LXHR.POST("/def/finance/receive_payment/single_ticket_receipt", params, "json") // 单票收款

export const financeGetPayMethod = params => LXHR.POST("/def/finance/receive_payment/get_pay_method", params, "json")   //付款方式 
export const loginDailySearch = params => LXHR.POST("/def/login_log/list_login_log", params)   //登录日志查询 

// 读身份证
export const readCard = () => LXHR.READE("http://127.0.0.1:24010/ZKIDROnline/ScanReadIdCardInfo?OP-DEV=1&CMD-URL=4")

export const getFlightJson = () => LXHR.READE("http://10.10.15.15/aircraftlist.json")

// session timeout
export const sessionTimeOut = () => LXHR.POST("/auth/verification_session_invalid")

export const isarrivelOrderUsed = params => LXHR.POST("/def/order/arrive_check_order", params) // 查询单号是否可用进港中转货