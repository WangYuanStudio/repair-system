<template>
  <div class="nodo adminPage">
    <Header title="待完成的安装记录" :left="true"/>
    <div class="table-header">
      <span>姓名</span>
      <span>预约时间</span>
      <span class="last-span">状态</span>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in list" :key="index" :class="{active: !item.active}" @click="item.active = !item.active">
        <div class="info-1">
          <span>{{item.name}}</span>
          <span>{{item.time}}</span>
          <span class="last-span">{{item.status | infoStatus}} <i class="iconfont icon-xia"></i></span>
          <div class="clear"></div>
        </div>
        <div class="info-2">
            <span class="first-span">ID号：{{item.id}}</span>
            <span>联系电话：{{item.phone}}</span>
        </div>
        <div class="info-3">
          报装项目：{{item.software.join('、')}}
        </div>
        <div class="buttons">
          <div class="button" @click.stop="accept">通过</div>
          <div class="button" @click.stop="refused">拒绝</div>
          <div class="button" :class="{ban: item.status === '1'}" @click.stop="success">安装成功</div>
          <div class="button last-child" :class="{ban: item.status === '1'}" @click.stop="fail">安装失败</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
export default {
  name: 'Nodo',
  components: {
    Header
  },
  data(){
    return {
      list: [
        {
          active: true,
          name: '付丹妮',
          time: '2018-09-18',
          status: '1',
          id: '150',
          phone: '13178852579',
          software: ['Microsoft Office 2012','Photoshop','SQL Server 2012','Visual Studio 2012']
        },
        {
          active: false,
          name: '付丹妮',
          time: '2018-09-18',
          status: '1',
          id: '150',
          phone: '13178852579',
          software: ['Microsoft Office 2012','Photoshop','SQL Server 2012','Visual Studio 2012']
        }
      ]
    }
  },
  computed: {

  },
  methods: {
    accept(){

    },
    refused(){

    },
    success(){

    },
    fail(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/baseCss.Scss';
.nodo{
  .table-header{
    border-bottom: 2px solid $mainColor;
    padding: 0 30px 0 36px;
    height: 65px;
    line-height: 65px;
    font-size: 28px;
    span{
      display: block;
      width: 155px;
      text-align: left;
      float: left;
    }
    .last-span{
      float: right;
      width: 240px;
    }
  }
  .list{
    padding: 30px 30px 0 36px;
    .item{
      margin-bottom: 50px;
      height: 40px;
      overflow: hidden;
      .info-1{
        font-size: 33px;
        line-height: 40px;
        span{
          display: block;
          min-width: 155px;
          text-align: left;
          float: left;
        }
        .last-span{
          float: right;
          width: 240px;
          position: relative;
          .iconfont{
            position: absolute;
            float: right;
            font-size: 40px;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .info-2{
        font-size: 28px;
        margin-bottom: 5px;
        .first-span{
          margin-right: 60px;
        }
      }
      .info-3{
        font-size: 28px;
        margin-bottom: 25px;
      }
      .buttons{
        height: 58px;
        .button{
          float: left;
          color: #fff;
          text-align: center;
          height: 58px;
          line-height: 58px;
          border-radius: 10px;
          background-color: $mainColor;
          padding: 0 24px;
          margin-right: 30px;
          font-size: 24px;
        }
        .last-child{
          margin-right: 0;
        }
        .ban{
          background-color: #83bef3;
        }
      }
    }
    .active{
      margin-top: 0px;
      height: auto!important;
      .info-1{
        padding-bottom: 30px;
      }
    }
  }
}
</style>
