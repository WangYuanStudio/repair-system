<template>
  <div id="app">
    <router-view />
    <Footer />
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
body{
  margin: 0;
}
a{
  color: #000;
  outline:none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>
