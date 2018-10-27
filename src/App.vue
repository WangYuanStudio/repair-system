<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <Footer v-if="!$route.meta.admin" />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from './components/footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style lang="scss">
@import '@/assets/weui.Scss';
body{
  margin: 0;
  background-color: #fff;
}
a{
  color: #000;
  outline:none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>
