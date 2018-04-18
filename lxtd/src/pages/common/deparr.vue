/**
 * 马少良
 */
 
<template>
  <div class="billing_common">
  	<!--出发情况-->
  	<departure-info v-if="parent !== '/arrival/main/billing/deparr/' && parent !== '/arrival/sub/billing/deparr/'" />
  	<!--客服记录-->
  	<custom-info />
		<!--到达情况-->
		<arrive-info />
	</div>
</template>

<script>
	import CustomInfo from "./custom"
	import DepartureInfo from "./departure"
	import ArriveInfo from "./arrive"

	export default {
		data() {
			return {
				parent: '',
			}
		},
		components: {
			CustomInfo,
			DepartureInfo,
			ArriveInfo,
		},
		mounted() {
			this.parent = this.$route.path
			// console.log(this.parent)
		}
	}
</script>
