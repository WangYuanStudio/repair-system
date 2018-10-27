<template>
  <div class="info page">
    <Header title="预约信息" />
    <div class="list" v-if="list.length">
      <div class="item" v-for="(item,index) in list" :key="index" :class="{active:item.active}" @click="item.active = !item.active">
        <div class="centent">
          {{item.os?`${item.os}、`:''}}{{item.software.join('、')}}<i class="iconfont icon-xia"></i>
        </div>
        <div class="line"></div>
        <div class="info">
          <span class="first"><i class="iconfont icon-time prompt"></i>{{item.time}}</span>
          <span><span class="prompt">预约码：</span>{{item.id}}</span>
          <span class="status" :class="{todo:item.status<3}">{{item.status | infoStatus}}</span>
        </div>
      </div>
    </div>
    <div class="noinfo" v-if="ready && !list.length">
      Nothing!
    </div>
    <div class="noinfo" v-if="!ready">
      Loading。。
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header.vue'
export default {
  name: 'Info',
  components: {
    Header
  },
  data(){
    return {
      list: [
        {
          active: true,
          status: '1',
          id: '233',
          time: '2018/10/22',
          os: 'Windows 10',
          software: ['Microsoft Office 2012','Photoshop','SQL Server 2012','Visual Studio 2012']
        },
        {
          active: true,
          status: '2',
          id: '234',
          time: '2018/10/18',
          os: '',
          software: ['Microsoft Office 2012']
        },
        {
          active: false,
          status: '3',
          id: '235',
          time: '2018/09/18',
          os: 'Windows 8',
          software: ['Microsoft Office 2012']
        },
        {
          active: false,
          status: '3',
          id: '233',
          time: '2018/08/18',
          os: 'Windows 10',
          software: ['Microsoft Office 2012','Photoshop','SQL Server 2012','Visual Studio 2012']
        }
      ],
      ready: true, // 请求信息完成后变为true
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/baseCss.Scss';
.info{
  .list{
    padding: 40px;
    .item{
      padding: 30px 27px;
      position: relative;
      margin: 0 auto 40px auto;
      border: 2px solid #dcdcdc;
      border-radius: 15px;
      font-size: 24px;
      .centent{
        padding-right: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        position: relative;
        .iconfont{
          position: absolute;
          right: 15px;
          font-size: 40px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .line{
        background-color: #dcdcdc;
        margin: 24px 0 17px 0;
        height: 2px;
        display: none;
      }
      .info{
        display: none;
        .first{
          margin-right: 50px;
          .iconfont{
            font-size: 30px;
          }
        }
        .prompt{
          color: #bfbfbf;
          margin-right: 8px;
        }
        .status{
          float: right;
        }
        .todo{
          color: #bfbfbf;
        }
      }
    }
    .active{
      height: auto!important;
      border-color: $mainColor;
      .centent{
        white-space:normal;
        .iconfont{
          transform:translateY(-50%) rotate(180deg);
          color: $mainColor;
        }
      }
      .line{
        display: block;
      }
      .info{
        display: block;
      }
    }
  }
  .noinfo{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 30px;
    color: #bfbfbf;
  }
}
</style>
