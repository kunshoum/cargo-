/**
 * 转换坐标
 * @param locations 坐标数组
 * 参考 http://lbs.amap.com/api/webservice/guide/api/convert
 */

import { resetCoordinate } from "@/service"
import { chunk } from "./dataMethods"

let formatLocations = locations => locations.map(item => item.join()).join("|")

let resetLocations = locations => {
  return resetCoordinate({key: "1ed6818a649fe5e292ddc7379a0121de", coordsys: "gps", locations: formatLocations(locations)}).then(res => {
    if(res.status === 200) {
      return res.data.locations.split(";").map( item => item.split(",").map(v => v*1) )
    }
  })
}

export default locations => Promise.all( chunk(locations, 40).map(resetLocations) )