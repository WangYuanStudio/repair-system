<template>
  <div class="history">
    <Header :title="`历史记录(${title})`" :left="true"/>
    <div class="table-header">
      <span>姓名</span>
      <span>预约时间</span>
      <span class="last-span">状态</span>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in viewList" :key="index" :class="{active: item.active}" @click="item.active = !item.active">
        <div class="info-1">
          <span>{{item.name}}</span>
          <span>{{item.time}}</span>
          <span class="last-span">{{item.status | infoStatus}} <i class="iconfont icon-xia"></i></span>
          <div class="clear"></div>
        </div>
        <div class="info-2">
            <span class="first-span"><span class="highlight">ID号：</span>{{item.id}}</span>
            <span><span class="highlight">联系电话：</span>{{item.phone}}</span>
        </div>
        <div class="info-3">
          <span class="highlight">报装项目：</span> {{item.os_project?item.os_project:''}}{{item.soft_project&&item.os_project?'、':''}}{{item.soft_project}}
        </div>
      </div>
    </div>
    <div class="noinfo" v-if="ready && !viewList.length">
      Nothing!
    </div>
    <div class="search">
      <input type="text" placeholder="搜索" v-model="searchKey">
      <img src="@/assets/icon/search.png">
    </div>
  </div>
</template>

<script>
import Header from '@/components/header.vue'

export default {
  name: 'History',
  components: {
    Header
  },
  data(){
    return {
      ready: false,
      isMounted: false,
      searchKey: "",
      lock: false, //瀑布流锁
      page:1,
      list: [
        // {
        //   active: true,
        //   name: '付丹妮',
        //   time: '2018-09-18',
        //   status: '3',
        //   id: '150',
        //   phone: '13178852579',
        //   software: ['Microsoft Office 2012','Photoshop','SQL Server 2012','Visual Studio 2012']
        // },
        // {
        //   active: false,
        //   name: '付丹妮',
        //   time: '2018-09-18',
        //   status: '3',
        //   id: '150',
        //   phone: '13178852579',
        //   software: ['Microsoft Office 2012','Photoshop','SQL Server 2012','Visual Studio 2012']
        // }
      ],
      searchList: []
    }
  },
  computed: {
    viewList(){
      if(this.searchKey){
        return this.searchList
      }else{
        return this.list
      }
    },
    title(){
      switch(this.$route.meta.type){
        case 'triduum':
          return '近三天'
        case 'hebdomad':
          return '近一周'
        case 'onemonth':
          return '近一月'
        case 'oneyear':
          return '近一年'
        case 'all':
          return '全部记录'
      }
    },
    intervals(){
      switch(this.$route.meta.type){
        case 'triduum':
          return this.$options.filters.DateDay2((new Date()).valueOf() - (3*24*60*60*1000))
        case 'hebdomad':
          return this.$options.filters.DateDay2((new Date()).valueOf() - (7*24*60*60*1000))
        case 'onemonth':
          return this.$options.filters.DateDay2((new Date()).valueOf() - (30*24*60*60*1000))
        case 'oneyear':
          return this.$options.filters.DateDay2((new Date()).valueOf() - (365*24*60*60*1000))
        case 'all':
          return "all"
      }
    }
  },
  watch: {
    searchKey: function(){
      this.$debounce(this.search,300)
    }
  },
  methods: {
    loadAllList(){
      this.lock = true
      let cancel = this.$loadingToast({title:'加载中'})
      this.$axios({
        url: `/admin/all`,
        method: 'get',
        params: {
          page: this.page
        }
      }).then((rep)=>{
        rep.data.data.forEach((item)=>{
          item.active = false
          this.list.push(item)
        })
        if(rep.data.data.length < 10){
          this.lock = true
        }else{
          this.lock = false
          this.page++
        }
        cancel()
        this.ready = true
        if(this.list.length === 10){
          //首次加载20条
          this.loadAllList()
        }
      }).catch(()=>{
        this.$alert({
          content: "获取失败"
        })
        cancel()
      })
    },
    search(){
      this.searchList = []
      let newList = []
      let cancel = this.$loadingToast({title:'搜索中'})
      this.$axios({
        url: `/admin/search`,
        method: 'post',
        params: {
          info: this.searchKey
        }
      }).then((rep)=>{
        rep.data.forEach((item)=>{
          if(this.intervals === "all"){
            newList.push(item)
            item.active = false
          }else{
            let time = new Date(item.time)
            if(time > new Date(this.intervals) && time < new Date()){
              newList.push(item)
              item.active = false
            }
          }
        })
        this.searchList = newList
        cancel()
        this.ready = true
      }).catch(()=>{
        cancel()
        this.$alert({
          content: "获取失败"
        })
      })
    },
    scrollEvent(){
      if(this.searchKey)return
      let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight
      let scrollTop = document.documentElement.scrollTop||document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      if(scrollTop+windowHeight >= scrollHeight-100){
        if(this.intervals === "all" && !this.lock){
          this.$debounce(this.loadAllList,200)
        }
      }
    },
    load(){
      this.list = []
      if(this.intervals !== "all"){
        let cancel = this.$loadingToast({title:'加载中'})
        this.$axios({
          url: `/admin/history`,
          method: 'post',
          data: {
            intervals: this.intervals
          }
        }).then((rep)=>{
          if(typeof rep.data === "string"){
            this.$toast({title: rep.data})
          }else{
            rep.data.forEach((item)=>{
              item.active = false
            })
          this.list = rep.data.reverse()
          }
          cancel()
          this.ready = true
        }).catch(()=>{
          this.$alert({
            content: "获取失败"
          })
          cancel()
        })
      }else{
        this.loadAllList()
      }
    }
  },
  mounted(){
    this.isMounted = true
    this.load()
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      if(vm.intervals === "all"){
        document.addEventListener("scroll",vm.scrollEvent)
      }
    })
  },
  beforeRouteLeave(to, from, next){
    if(this.intervals === "all"){
      document.removeEventListener("scroll",this.scrollEvent)
    }
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/baseCss.Scss';
.history{
    position: absolute;
    width: 100vw;
    top: 0;
    background-color: #fff;
    min-height: calc(100vh - 94px);
    padding-bottom: 150px;
  .table-header{
    border-bottom: 2px solid $mainColor;
    padding: 0 30px 0 36px;
    height: 65px;
    line-height: 65px;
    font-size: 28px;
    span{
      display: block;
      width: 30%;
      text-align: left;
      float: left;
      margin-right: 10px;
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
          width: 30%;
          text-align: left;
          float: left;
          text-overflow:ellipsis;
          overflow: hidden;
          margin-right: 10px;
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
