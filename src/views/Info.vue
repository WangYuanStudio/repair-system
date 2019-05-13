<template>
  <div class="info page">
    <Header title="预约信息" />
    <div class="list" v-if="list.length">
      <div class="item" v-for="(item,index) in list" :key="index" :class="{active:item.active}" @click="item.active = !item.active">
        <div class="centent">
          {{item.os_project?item.os_project:''}}{{item.soft_project&&item.os_project?'、':''}}{{item.soft_project}}<i class="iconfont icon-xia"></i>
          <!-- {{item.project}}<i class="iconfont icon-xia"></i> -->
        </div>
        <div class="line"></div>
        <div class="item-info">
          <p>
            <span class="first"><i class="iconfont icon-time prompt"></i>{{item.time}}</span>
            <span><span class="prompt">预约码：</span>{{item.id}}</span>
            <span class="status" @click.stop="showFailDetail(item)" :class="{todo:item.status<4}">{{item.status | infoStatus}}</span>
          </p>
          <p v-if="item.errMsg" class="errMsg"><span class="prompt">失败理由：</span>{{item.errMsg}}</p>
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
      ],
      ready: true, // 请求信息完成后变为true
    }
  },
  computed: {
    oid(){
      return this.$store.state.oid
    }
  },
  methods: {
    showFailDetail(item){
      if(item.status === "2"){
        this.$alert({
          title: '审核失败',
          content: item.fail_detail
        })
      }
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm=>{
      vm.$axios({
        url: `/front/history/${vm.oid}`,
        method: 'get'
      }).then((rep)=>{
        if(rep.code === "0"){
          rep.data.forEach((item)=>{
            item.active = false
          })
          vm.list = rep.data.reverse()
        }else{
          vm.list = []
        }
      })
    })
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
      .item-info{
        display: none;
        p{
          margin: 0;
          position: relative;
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
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
          }
          .todo{
            color: #bfbfbf;
          }
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
      .item-info{
        display: block;
      }
    }
  }
}
</style>
