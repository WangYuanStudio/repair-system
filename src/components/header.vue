<template>
  <div class="header">
    {{title}}

  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['title'],
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
.header{
  text-align: center;
  height: 94px;
  width: 100vw;
  line-height: 94px;
  box-shadow: 0px -5px 25px #aaa;
  position: fixed;
  top: 0;
  font-size: 32px;
}
</style>
