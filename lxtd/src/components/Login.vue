<!--王艺蒙-->
 <template>
  <div class="Login">
    <img src="../images/fgbg.png" alt="">
  	<div class="box_flight">
      	    <!-- <img class="flight_img" src="../images/flight.png"> -->
      	    <div class="login_form">
			    <div class="logo">
			        <img src="../images/cargocare-01copy.png">
			    </div>
		      	<el-card class="box_card">
			        <el-form ref="form">
			          <el-input class="login_ipt" placeholder="userName" prefix-icon="el-icon-fa-user" v-model="username"></el-input>
			          <el-input class="login_ipt" type="password" placeholder="Password" prefix-icon="el-icon-fa-lock" v-model="password"
			          @keyup.enter.native="login"></el-input>
			          <el-button class="login_btn" @click="login" type="primary">Login</el-button>
			        </el-form>
			    </el-card>
	      
	    	</div>
     </div>
    <div class="login_bg">
      <!-- <img class="yun_img" src="../images/yun.png">
      <img class="yun_img_one" src="../images/yun.png"> -->

     
    </div>
    
    
    <div class="login_wrap">
      <h1>更新公告</h1>
      <p class="content">尊敬的CargoCare用户：CargoCare于今日（1月3日0时）进行版本更新，请您及时保存数据，本次更新将于1月5日0时结束。</p>
    </div>

  </div>
</template>

<script>
import { login } from "../service"
import { getStore } from "@/config/localStore.js"
import {start} from "@/utils/sessionTimeOut"
import NProgress from 'nprogress'

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    }
  },
  beforeRouteEnter(to, from, next) {
    if(getStore("authList")) {
      console.log('已登录')
      next(from.path)
      NProgress.done()
    }else {
      next()
    }
  },
  methods: {
    login() {
      login({ name: this.username, password: this.password }).then(res => {
        if (res.data.status === 200) {
          start()
          let resObj = res.data
          this.$setStore("depart_name", resObj.data[0].depart_name)
          this.$setStore("authList", resObj.data[0].authNameList)
          this.$setStore("admin", resObj.data[0].is_admin)
          this.$setStore("departId", resObj.data[0].depart_id)
          this.$setStore("userId", resObj.data[0].id)
          this.$setStore("real_name", resObj.data[0].real_name)
          this.$setStore("city", resObj.data[0].city)
          this.$setStore("unit", resObj.data[0].unit)
          this.$setStore("unit_tel", resObj.data[0].unit_tel)
          // 地点
          this.$setStore("operateDepart", resObj.data[0].operateDepart)
          // this.$router.push({ name: "home" })
          
          this.$router.push(`/home`)
        }
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../style/pages/login.less";
</style>
