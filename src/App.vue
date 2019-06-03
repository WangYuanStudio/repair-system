<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <Footer v-if="!$route.meta.admin" />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from './components/footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  },
  mounted(){
    let cancel = this.$loadingToast({title:'正在登陆'})
    let code = location.href.match(/\?code=(.*)/)
    if(code){
      this.$axios({
        url: `/front/oauth/${code[1]}`,
        method: 'get'
      }).then((rep)=>{
        if(rep.code === "0"){
          this.$store.commit({
            type:'setOid',
            oid: rep.data.openid
          })
          localStorage.isAdmin = rep.data.isAdmin
          localStorage.oid = rep.data.openid
          localStorage.limit = (new Date()).valueOf() + 3600000
          if(rep.data.isAdmin){
            this.$router.push("/admin")
          }
        }else{
          this.$alert({
            content: '登录失败'
          })
        }
        // else{
        //   location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe0e9860d811af920&redirect_uri=https%3A%2F%2Fwx-api.wangyuan.info%2Foauth_callback&response_type=code&scope=snsapi_userinfo&state=bz#wechat_redirect"
        // }
        cancel()
      }).catch(()=>{
        this.$alert({
          content: '登录失败'
        })
        cancel()
      })
    }else{
      if((new Date()).valueOf() < (localStorage.limit - 1200000)){//-1200000
        this.$store.commit({
          type:'setOid',
          oid: localStorage.oid
        })
        if(localStorage.isAdmin === "true"){
          this.$router.push("/admin")
        }
        cancel()
      }
      // else{
      //   location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe0e9860d811af920&redirect_uri=https%3A%2F%2Fwx-api.wangyuan.info%2Foauth_callback&response_type=code&scope=snsapi_userinfo&state=bz#wechat_redirect"
      // }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/weui.Scss';
body{
  margin: 0;
  background-color: #fff;
}
a{
  color: #000;
  outline:none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  text-decoration: none;
}
</style>
