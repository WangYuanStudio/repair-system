import Vue from 'vue'
import Router from 'vue-router'
import Post from './views/Post.vue'
import Info from './views/Info.vue'
import Selectos from './views/selectos.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/post'
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },{
      path: '/selectos',
      name: 'Selectos',
      component: Selectos
    }
  ]
})
