<template>
  <div class="modify adminPage">
    <Header title="修改报装时间" :left="true"/>
    <div class="info">
      <p class="text">*原默认时间每周一到周五下午3:00~5:00</p>
      <div class="add">+</div>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) of list" :key="index">
        <p>{{item.time}}<span>{{item.status}}</span></p>
      </div>
    </div>
    <div class="switch">
      <p>一键开启或关闭报装系统</p>
      <div class="switch_btn weui-cell__ft">
          <input class="weui-switch" type="checkbox" v-model="openSystem">
      </div>
    </div>
    <div class="create" v-if="showCreate">
      <div class="weui-mask"></div>
      <div class="weui-dialog" :class="{'weui-skin_android':isAndroid}">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">新增日期</strong></div>
        <div class="date">
          <div>

          </div>
        </div>
        <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="showCreate = false">取消</a>
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">完成</a>
        </div>
      </div>
    </div>
    <div class="weui-skin_android" v-if="setTimeIsShow">
        <div class="weui-mask" @click="setTimeIsShow = false"></div>
        <div class="weui-actionsheet" @click="setTimeIsShow = false">
            <div class="weui-actionsheet__menu">
                <div class="weui-actionsheet__cell" v-for="(time,index) in times" :key="index">time</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header.vue'

export default {
  name: 'Modify',
  components: {
    Header
  },
  data(){
    return {
      openSystem: false,
      showCreate: false,
      mons: (Array.from({length:13}, (v,k) => k)).shift(),
      mon: (new Date()).getMonth(),
      day: (new Date()).getDate(),
      selectTime: "mon",
      setTimeIsShow: false,
      list: [
        {
          time: '12月18日（周三）',
          status: '不可选'
        },
        {
          time: '12月18日（周三）',
          status: '不可选'
        }
      ]
    }
  },
  computed: {
    isAndroid(){
      return /Android/.test(window.navigator.userAgent)
    },
    times(){
      if(this.selectTime === 'mon'){
        return this.mons
      }else if(this.selectTime === "day"){
        return this.days
      }
    },
    days(){
      if([1,3,5,7,8,10,12].includes(this.mon)){
        return (Array.from({length:32}, (v,k) => k)).shift()
      }else if([4,6,9,11].includes(this.mon)){
        return (Array.from({length:31}, (v,k) => k)).shift()
      }else if(this.mon === 2){
        return (Array.from({length:29}, (v,k) => k)).shift()
      }
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/baseCss.Scss';
.modify{
  .info{
    position: relative;
    .text{
    margin: 0 35px;
    height: 107px;
    line-height: 107px;
    color: #bfbfbf;
    font-size: 24px;
    }
    .add{
      background-color: #4ea3ee;
      border-radius: 10px;
      height: 60px;
      width: 60px;
      color: #fff;
      font-size: 60px;
      position:absolute;
      right: 35px;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
      line-height: 60px;
    }
  }
  .list{
    margin: 0 35px 150px 35px;
    .item{
      font-size: 33px;
      color: #000;
      height: 77px;
      line-height: 77px;
      border: #4ea3ee solid 2px;
      border-radius: 10px;
      padding: 0 38px;
      margin-bottom: 25px;
      span{
        float: right;
      }
    }
  }
  .switch{
    width: 100vw;
    height: 100px;
    line-height: 100px;
    background-color: #eeeeee;
    padding: 0 35px;
    position: fixed;
    bottom: 0;
    .switch_btn{
      input{
        position: absolute;
        right: 80px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .create{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
}
</style>
