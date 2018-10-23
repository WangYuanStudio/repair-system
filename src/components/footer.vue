<template>
  <div class="footer">
    <router-link to="/post">
      <div class="Post" :class="{active: page }">
        <span>
          <i class="iconfont icon-hekricondingshi"></i>
          报装预约
        </span>
      </div>
    </router-link>
    <router-link to="/info">
      <div class="Info" :class="{active: !page }">
        <span>
          <i class="iconfont icon-xinxi"></i>
          预约信息
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    page () {
      return /post/.test(this.$route.path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/baseCss.Scss';
.footer{
  text-align: center;
  height: 100px;
  width: 100vw;
  box-shadow: 0px 5px 25px #aaa;
  position: fixed;
  bottom: 0;

  div{
      width: 50%;
      height: 100%;
      float: left;
      font-size: 22px;
      font-weight: 600;
      position: relative;

      span{
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        i{
          display: block;
        }
        .icon-hekricondingshi{
          font-size: 45px;
        }
        .icon-xinxi{
          font-size: 40px;
        }
      }
  }

  .active{
    color: $mainColor;
  }

}
</style>
