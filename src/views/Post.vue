<template>
  <div class="post page">
    <Header title="报装预约" :right="headerLeft"/>
    <div class="process">
      <div class="item process_1">
        <div class="strip strip_right"></div>
        <div class="round">
          1
        </div>
        <p>提交预约申请</p>
      </div>
      <div class="item process_2">
        <div class="strip strip_right"></div>
        <div class="strip strip_left"></div>
        <div class="round">
          2
        </div>
        <p>等待预约结果</p>
      </div>
      <div class="item process_3">
        <div class="strip strip_left"></div>
        <div class="round">
          3
        </div>
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
      <div class="item">
        预约时间
        <input class="weui-input" type="datetime-local" v-model="form.time" />
        <label class="setTime" >请选择<i class="iconfont icon-xia"></i></label>
      </div>
      <div class="item">
        报装系统类（单选）
        <span class="selectSystem"><i class="iconfont icon-you"></i></span>
      </div>
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
      <div class="item">
        <label><input type="checkbox" class="inputFix" v-model="form.agree">我已阅读并同意</label><span class="highlight">《免责声明》</span>和<span class="highlight">《时间表》</span>。
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
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
        software: [],
        agree: false
      },
      setTimeIsShow: false
    }
  },
  methods: {
    submit(){
      console.log('submit')
      console.log(this.form)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/baseCss.Scss';
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
  .item{
    margin-left: 36px;
    padding-right: 30px;
    border-bottom: 2px solid #dcdcdc;
    min-height: 90px;
    line-height: 90px;
    color: #050505;
    font-size: 30px;
    font-weight: 700;
    position: relative;
    .textInput{
      outline: none;
      border: 0;
      width: calc(100% - 200px);
      height: 80px;
      font-size: 32px;
      line-height: 80px;
    }
    .setTime{
      position: relative;
      float: right;
      font-size: 32px;
      color: #bfbfbf;
      background-color: #fff;
      padding-right: 60px;
      pointer-events: none;
      i{
        position: absolute;
        top: 55%;
        transform: translateY(-50%);
        right: 0px;
        font-size: 60px;
        font-weight: 200;
      }
    }
    .weui-input{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 130px;
      border: 0;
      outline: none;
      width: calc(100% - 160px);
    }
    .selectSystem{
      color: #bfbfbf;
      float: right;
      i{
        font-size: 40px;
      }
    }
    .inputFix{
      position: relative;
      top: 3px;
    }
  }
  .item:last-child{
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
</style>
