<template>
  <div class="nodo adminPage">
    <Header title="待完成的安装记录" :left="true"/>
    <div class="table-header">
      <span>姓名</span>
      <span>预约时间</span>
      <span class="last-span">状态</span>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in list" :key="index" :class="{active: item.active}" @click="item.active = !item.active">
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
          报装项目：{{item.os_project?item.os_project:''}}{{item.soft_project&&item.os_project?'、':''}}{{item.soft_project}}
        </div>
        <div class="buttons">
          <div class="button" :class="{allow: item.status === '0'}" @click.stop="accept(item)">通过</div>
          <div class="button" :class="{allow: item.status === '0'}" @click.stop="refused(item)">拒绝</div>
          <div class="button" :class="{allow: item.status === '1'}" @click.stop="success(item)">安装成功</div>
          <div class="button last-child" :class="{allow: item.status === '1'}" @click.stop="fail(item)">安装失败</div>
        </div>
      </div>
    </div>
    <!-- <div class="search">
      <input type="text" placeholder="搜索ID号" v-model="searchKey">
      <img src="@/assets/icon/search.png">
    </div> -->
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
      list: [],
      isMounted:false,
      searchKey: ""
    }
  },
  computed: {
    oid(){
      return this.$store.state.oid
    }
  },
  methods: {
    load(){
      this.list = []
      let cancel = this.$loadingToast({title:'加载中'})
      this.$axios({
        url: `/admin/checkList`,
        method: 'get'
      }).then((rep)=>{
        rep.data.forEach((item)=>{
          item.active = false
        })
        this.list = rep.data.reverse()
        cancel()
      })
    },
    accept(item){
      if(item.status !== '0') return
      this.setStatus(item,'1')
    },
    refused(item){
      if(item.status !== '0') return
      this.$input({
        title: '审核失败',
        callback: (confirm,info)=>{
          if(confirm){
            this.setStatus(item,'2',info)
          }
        }
      })
    },
    success(item){
      if(item.status !== '1') return
      this.setStatus(item,'3')
    },
    fail(item){
      if(item.status !== '1') return
      this.$input({
        title: '安装失败',
        callback: (confirm,info)=>{
          if(confirm){
            this.setStatus(item,'4',info)
          }
        }
      })
    },
    setStatus(item,status,info){
      this.$confirm({
        content: `确定要${this.$options.filters.infoStatus(status)}吗`,
        callback: (confirm)=>{
          if(confirm){
            let cancel = this.$loadingToast({title:'正在提交'})
            this.$axios({
              url: '/admin/status',
              method: 'put',
              data: {
                status,
                oid: this.oid,
                id: item.id,
                fail_detail: info
              }
            }).then((res)=>{
              cancel()
              if(res.code === '0'){
                this.$toast({title:'提交成功'})
                item.status = status
              }else{
                this.$alert({
                  content: res.data
                })
              }
            })
          }
        }
      })
    }
  },
  watcher(){

  },
  mounted(){
    this.isMounted = true
    this.load()
  },
  beforeRouteEnter(to, from, next){
    next(vm=>{
      if(vm.isMounted){
        vm.load()
      }
    })
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
          background-color: #83bef3;
          padding: 0 24px;
          margin-right: 30px;
          font-size: 24px;
        }
        .last-child{
          margin-right: 0;
        }
        .allow{
          background-color: $mainColor;
        }
      }
    }
    .active{
      margin-top: 0px;
      height: auto!important;
      .info-1{
        padding-bottom: 30px;
      }
      .iconfont{
        transform:translateY(-50%) rotate(180deg)!important;
        color: $mainColor;
      }
    }
  }
  .search{
    position: fixed;
    bottom: 0;
    background-color: #eeeeee;
    height: 98px;
    padding: 12px 36px;
    width: calc(100% - 72px);
    input{
      position:absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 74px;
      width: calc(100% - 150px);
      border: 0;
      background-color: #eeeeee;
      outline: none;
    }
    img{
      position:absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      right: 36px;
    }
  }
}
</style>
