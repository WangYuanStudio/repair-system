<template>
  <div class="post page">
    <Header title="报装预约" :right="headerLeft"/>
    <div class="process">
      <div class="item process_1">
        <div class="strip strip_right"></div>
        <div class="round">1</div>
        <p>提交预约申请</p>
      </div>
      <div class="item process_2">
        <div class="strip strip_right"></div>
        <div class="strip strip_left"></div>
        <div class="round">2</div>
        <p>等待预约结果</p>
      </div>
      <div class="item process_3">
        <div class="strip strip_left"></div>
        <div class="round">3</div>
        <p>按时前往工作室</p>
      </div>
    </div>
    <div class="form">
      <div class="item">
        姓名
        <input class="textInput" type="text" v-model="form.name">
      </div>
      <div class="item">
        手机号码
        <input class="textInput" type="number" v-model="form.number">
      </div>
      <div class="item" @click="setTimeIsShow = true">
        预约时间
        <span class="inputText" v-if="form.time">{{form.time}}</span>
        <label v-if="!form.time" class="setTimeText" >请选择<i class="iconfont icon-xia"></i></label>
      </div>
      <router-link to="/selectos">
        <div class="item">
          报装系统类（单选）
          <span class="inputText" v-if="form.os">{{ form.os | OS}}</span>
          <span class="selectSystem"><i class="iconfont icon-you"></i></span>
        </div>
      </router-link>
      <div class="item software">
        <div class="text">
          <span>报装软件类</span><br />
          <span class="annotation">（选填，可多选）</span>
        </div>
        <div class="selectBox">
          <label><input type="checkbox" class="inputFix" value="Photoshop" v-model="form.software">Photoshop</label>
          <label><input type="checkbox" class="inputFix" value="SQL Server 2012" v-model="form.software">SQL Server 2012</label>
          <label><input type="checkbox" class="inputFix" value="Visual Studio 2012" v-model="form.software">Visual Studio 2012</label>
          <label><input type="checkbox" class="inputFix" value="Microsoft Office 2010" v-model="form.software">Microsoft Office 2010</label>
        </div>
        <div class="clear"></div>
      </div>
      <div class="item item-last">
        <label><input type="checkbox" class="inputFix" v-model="agree">我已阅读并同意</label><span class="highlight" @click="infoIsShow = 1">《免责声明》</span>和<span class="highlight" @click="infoIsShow = 2">《时间表》</span>。
      </div>
    </div>
    <div class="weui-skin_android" v-if="setTimeIsShow">
        <div class="weui-mask" @click="setTimeIsShow = false"></div>
        <div class="weui-actionsheet" @click="setTimeIsShow = false">
            <div class="weui-actionsheet__menu">
                <div class="weui-actionsheet__cell" v-for="(time,index) in times" :key="index"  @click="form.time = $options.filters.DateDay(time)">{{time | DateDay}}</div>
            </div>
        </div>
    </div>
    <div class="weui-skin_android" @click="infoIsShow = 0" v-if="infoIsShow">
        <div class="weui-mask"></div>
        <div class="content"  v-if="infoIsShow === 1">
          <h2>免责申明</h2>
          <ul list-style-type="listStyleType">
            <li>1、重新安装新系统前，请用户备份重要资料，安装系统资料丢失，本工作室概不负责。</li>
            <li>2、安装系统后，本工作室会进行简单测试，但不提供保修服务。</li>
            <li>3、本工作室所有windows操作系统和应用软件安装包，均为网上下载，如用户没有购买正版，由此产生的版权纠纷，本工作室概不负责。</li>
            <li>4、安装时间过长，可将电脑暂放网园资讯工作室，次日来取。在此期间发生意外，若非本工作室所造成的损失，本工作室概不负责。</li>
            <li>5、本服务最终解释权由网园资讯工作室所有。</li>
          </ul>
        </div>
        <div class="content" v-if="infoIsShow === 2">
          <h2>时间表</h2>
          <ul class="time">
            <li>星期一：15:00-17:00</li>
            <li>星期二：15:00-17:00</li>
            <li>星期三：15:00-17:00</li>
            <li>星期四：15:00-17:00</li>
            <li>星期五：15:00-17:00</li>
          </ul>
        </div>
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
      headerLeft: {
        text: '提交',
        callback: this.submit
      },
      form: {
        name: '',
        number: '',
        time: '',
        os: '',
        software: []
      },
      agree: false,
      setTimeIsShow: false,
      infoIsShow: 0
    }
  },
  computed: {
    times(){
      let now = (new Date()).getTime()
      let list = []
      let sum = 1
      while(list.length < 6){
        let next = now + sum * 86400000
        let day = (new Date(next)).getDay()
        if(day !== 6 && day !== 0){
          list.push(next)
        }
        sum++
      }
      return list
    }
  },
  methods: {
    verify(){
      if(!this.form.name){
        this.$alert('姓名','姓名不能为空')
        return false
      } else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.form.number) && !/^[0-9]{6}$/.test(this.form.number)){
        this.$alert('手机号','请填写正确的手机长号或短号')
        return false
      } else if(!this.form.time){
        this.$alert('时间','请选择前往工作室的时间')
        return false
      } else if(!this.form.os && !this.form.software.length){
        this.$alert('报装项目','至少选择一个报装项目')
        return false
      } else if(!this.agree){
        this.$alert('免责声明','请阅读并同意免责声明和时间表')
        return false
      } else {
        return true
      }
    },
    submit(){
      if(this.verify()){
        let loadingToast = this.$loadingToast('正在提交')
        setTimeout(()=>{
          loadingToast()
          this.$toast('提交成功')
          console.log('submit')
          console.log(this.form)
        },5000)
      }
    }
  },
  mounted(){
    Ebus.$on('selectos',(info)=>{
      this.form.os = info.os
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/baseCss.Scss';
@import '@/assets/formItem.Scss';
.process{
  height: 190px;
  border-bottom: 2px solid #dcdcdc;
  .item{
    text-align: center;
    position: relative;
    float: left;
    margin: 32px 0;
    width: 33.33%;
    .round{
      width: 70px;
      height: 70px;
      background-color: $mainColor;
      position: relative;
      margin: 0 auto;
      border-radius: 100px;
      text-align: center;
      line-height: 70px;
      color: #fff;
    }
    .strip{
      position: absolute;
      height: 5px;
      width: 50%;
      background-color: $mainColor;
      top: 32.5px;
    }
    .strip_left{
      left: 0;
    }
    .strip_right{
      right: 0;
    }
    p{
      margin: 15px 0 0 0;
      color: #838383;
      font-size: 22px;
      font-weight: 700;
    }
  }
}
.form{
  .item-last{
    border: 0;
  }
  .software{
    padding: 20px 0;
    .text{
      line-height: 50px;
      float: left;
      .annotation{
        font-size: 22px;
      }
    }
    .selectBox{
      float: left;
      label{
        display: block;
        line-height: 70px;
      }
    }
  }
}
.weui-skin_android{
  .content{
    h2{
      text-align: center;
    }
    ul{
      list-style: none;
    }
    .time{
      text-align: center;
    }
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    z-index: 5000;
    width: 80vw;
  }
}
</style>
