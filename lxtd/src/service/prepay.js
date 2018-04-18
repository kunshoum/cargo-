/**
 * 马少良
 * 预付款
 */
import {LXHR} from '../config/LXHR.js'

export const getList = params => LXHR.POST('/def/finance/pre_payment/list_clearing_unit_info', params) // 预付款列表
export const addItem = params => LXHR.POST('/def/finance/pre_payment/add_clearing_unit_info', params)  // 预付款添加
export const updateItem = params => LXHR.POST('/def/finance/pre_payment/update_clearing_unit_info_by_id', params) // 预付款编辑
export const cancelItem = params => LXHR.POST('/def/finance/pre_payment/delete_clearing_unit_by_list_id', params) // 预付款删除
export const charge = params => LXHR.POST('/def/finance/pre_payment/save_prepayment_recharge', params) // 预付款充值
export const chargeLog = params => LXHR.POST('/def/finance/pre_payment/list_prepayment_recharge_log', params) // 预付款充值日志
export const beforeEdit = params => LXHR.POST('/def/finance/pre_payment/get_clearing_unit_by_id', params) // 编辑前查询




