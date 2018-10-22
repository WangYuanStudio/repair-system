import Vue from 'vue'
import Router from 'vue-router'
import Post from './views/Post.vue'
import Info from './views/Info.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Post',
      component: Post
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    }
  ]
})
