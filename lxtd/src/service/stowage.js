/**
 * 马少良
 * 配载
 */
import {LXHR} from '../config/LXHR.js'

export const getOrderList = params => LXHR.POST('/def/output/stowage/list_order', params) // 运单列表
export const confirmBooking = params => LXHR.POST('/def/output/stowage/insert_stowage', params,  'json')  // 确认订舱

export const getOrderListByFlight = params => LXHR.POST('/def/output/stowage/list_stowage_by_flight_info', params) // 查看配载列表（初舱单、终舱单）
export const updateStowageBooking = params => LXHR.POST('/def/output/stowage/update_stowage', params, 'json') // 修改配载订舱航班/生成初、终舱单
export const cancelStowageBooking = params => LXHR.POST('/def/output/stowage/cancel_stowage', params, 'json') // 配载订舱取消

export const getFlightList = params => LXHR.POST('/def/output/booking/getFlightList', params)
export const closeFlight = params => LXHR.POST('/def/output/booking/close_flight_list', params, 'json')

export const getQunatity = params => LXHR.POST('/def/output/stowage/get_order_info_by_order_no', params)

export const getCabin = params => LXHR.POST('/def/output/booking/get_cabin_by_flight_info', params)



