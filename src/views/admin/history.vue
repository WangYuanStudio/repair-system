<template>
  <div class="history adminPage">
    <Header title="历史记录" :left="true"/>
    history
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
</style>
