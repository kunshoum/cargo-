import { LXHR } from "@/config/LXHR.js"

export const resetCoordinate  = params => LXHR.GETREMOTE("http://restapi.amap.com/v3/assistant/coordinate/convert", params)
export const resetApi = () => LXHR.POST("/def/ads_b_system/flight_gps_reset")
export const getFlightDetail = params => LXHR.POST("/def/ads_b_system/get_flight_route", params)
export const getFlightInfo = params => LXHR.POST("/def/ads_b_system/get_icao_by_flight_no", params)