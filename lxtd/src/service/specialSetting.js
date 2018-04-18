/**
 * 马少良
 */

import {LXHR} from '../config/LXHR.js'

export const getSpecialList = params => LXHR.POST('/def/cost_special_setting/get_priority_list', params)
export const setTop = params => LXHR.POST('/def/cost_special_setting/setting_priority_top', params)
export const deleteSpecialItem = params => LXHR.POST('/def/cost_special_setting/delete_priority_by_id', params)