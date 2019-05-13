<template>
  <div class="historyIndex adminPage">
    <Header title="历史记录" :left="true"/>
    <router-link to="/admin/history/triduum">
      <div class="item">
        近三日<i class="iconfont icon-you"></i>
      </div>
    </router-link>
    <router-link to="/admin/history/hebdomad">
      <div class="item">
        近一周<i class="iconfont icon-you"></i>
      </div>
    </router-link>
    <router-link to="/admin/history/onemonth">
      <div class="item">
        近一月<i class="iconfont icon-you"></i>
      </div>
    </router-link>
    <router-link to="/admin/history/oneyear">
      <div class="item">
        近一年<i class="iconfont icon-you"></i>
      </div>
    </router-link>
    <router-link to="/admin/history/all">
      <div class="item">
        全部记录<i class="iconfont icon-you"></i>
      </div>
    </router-link>
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/header.vue'
export default {
  name: 'HistorysIndex',
  components: {
    Header
  },
  data(){
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/baseCss.Scss';
.historyIndex{
  width: 100vw;
  position: absolute;
  top: 0;
  background-color: #fff;
  .item{
    padding: 35px 30px 35px 35px;
    font-size: 38px;
    .iconfont{
      float: right;
      font-size: 40px;
    }
  }
}
</style>
