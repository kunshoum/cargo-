/** 
* 马少良
*/

import { getAirport } from "@/linkQuery"

export default {
  methods: {
    getDepartures(query) {
      getAirport(this, '').then(res => {
        this.departures = res
      })
    },
    getDestination(query) {
      getAirport(this, '').then(res => {
        this.destinations = res
      })
    },
  },
}