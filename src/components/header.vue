<template>
  <div class="header">
    <p>{{title}}</p>
    <span v-if="left" @click="$router.go(-1)" class="left"><i class="iconfont icon-houtui"></i></span>
    <span v-if="right" @click="right.callback" class="right">{{right.text}}</span>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['title','right','left'],
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/baseCss.Scss';
.header{
  text-align: center;
  height: 94px;
  width: 100vw;
  line-height: 94px;
  box-shadow: 0px -5px 25px #aaa;
  position: fixed;
  top: 0;
  font-size: 32px;
  background-color: #fff;
  z-index: 1000;
  p{
    position: absolute;
    margin: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .left{
    float: left;
    i{
      font-size: 50px;
    }
  }

  .right{
    float: right;
    color: $mainColor;
    padding: 0 30px;
  }
}
</style>
