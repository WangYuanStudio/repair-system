<template>
  <div class="admin">
    <router-link to="/admin/nodo">
      <div class="item">
        待完成的安装记录<i class="iconfont icon-you"></i>
      </div>
    </router-link>
    <router-link to="/admin/history">
      <div class="item">
        历史记录<i class="iconfont icon-you"></i>
      </div>
    </router-link>
    <router-link to="/admin/modify">
      <div class="item">
        修改报装时间<i class="iconfont icon-you"></i>
      </div>
    </router-link>
    <router-link to="/">
      <div class="item">
        返回前台
      </div>
    </router-link>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'Andex',
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
.admin{
  width: 100vw;
  min-height: calc(100vh - 13px);
  position: absolute;
  top: 0;
  background-color: #fff;
  padding-top: 13px;
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
