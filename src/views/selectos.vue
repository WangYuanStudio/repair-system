<template>
  <div class="selectos page">
    <Header title="报装系统类" :left="true" :right="headerRight"/>
    <div class="statement">
      以下信息用于激活电脑，承诺不会泄露个人信息。
    </div>
    <div class="form">
      <div class="item radio">
        新系统
        <label><input type="radio" class="inputFix" value="1" v-model="info.os">win10</label>
        <label><input type="radio" class="inputFix" value="2" v-model="info.os">win8</label>
        <label><input type="radio" class="inputFix" value="3" v-model="info.os">win7</label>
        <label><input type="radio" class="inputFix" value="" v-model="info.os">不需要重装</label>
      </div>
      <div class="item">
        旧密码
        <input class="textInput" type="password" v-model="info.pwd">
      </div>
      <div class="item">
        新用户名
        <input class="textInput" type="text" v-model="info.name">
      </div>
      <div class="item">
        新密码
        <input class="textInput" type="password" v-model="info.newPwd">
      </div>
    </div>
    <div class="agreement">
      <label><input type="checkbox" class="inputFix" v-model="agree">我已</label><span class="highlight" @click="infoIsShow = 1">备份好C盘内个人的重要文件夹</span>并<span class="highlight" @click="infoIsShow = 2">同意清空C盘驱动器</span>。
    </div>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Ebus from '@/extra/ebus.js'
export default {
  name: 'Post',
  components: {
    Header
  },
  data(){
    return {
      headerRight: {
        text: '完成',
        callback: this.submit
      },
      info: {
        os: 'win10',
        pwd: '',
        name: '',
        newPwd: ''
      },
      agree: false
    }
  },
  computed: {

  },
  methods: {
    submit(){
      if(this.agree || !this.info.os){
        Ebus.$emit('selectos',this.info)
        this.$router.go(-1)
      } else {
        this.$alert('注意事项','请阅读并同意注意事项')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/baseCss.Scss';
@import '@/assets/formItem.Scss';
.selectos{
  .statement{
    font-size: 22px;
    color: #838383;
    padding-left: 36px;
    line-height: 75px;
    height: 69px;
    border-bottom: 2px solid #dcdcdc;
  }
  .form{
    border-bottom: 2px solid #dcdcdc;
    .radio{
      label{
        margin-left: 20px;
      }
    }
    .setTimeText{
      position: relative;
      float: right;
      font-size: 32px;
      color: #bfbfbf;
      padding-right: 60px;
    }
  }
  .agreement{
    font-size: 22px;
    font-weight: 700;
    margin-left: 36px;
    padding-right: 30px;
    line-height: 90px;
    .inputFix{
      position: relative;
      top: 5px;
    }
  }
}
</style>
