<template>
  <div id="app">
    <Nav />
    <router-view />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from './components/nav.vue'
import Footer from './components/footer.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  }
}
</script>

<style lang="scss">

</style>
