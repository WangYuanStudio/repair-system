import Vue from 'vue'
import Router from 'vue-router'
import Post from './views/Post.vue'
import Info from './views/Info.vue'
import Selectos from './views/selectos.vue'


const Admin = (resolve) => {
  import('./views/admin/andex.vue').then(module => {
    resolve(module)
  })
}
const Historys = (resolve) => {
  import('./views/admin/history.vue').then(module => {
    resolve(module)
  })
}
const Modify = (resolve) => {
  import('./views/admin/modify.vue').then(module => {
    resolve(module)
  })
}
const Nodo = (resolve) => {
  import('./views/admin/nodo.vue').then(module => {
    resolve(module)
  })
}

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
    },{
      path: '/admin',
      component: Admin,
      meta: { admin: true },
      children: [
        {
          path: 'history',
          component: Historys,
          meta: { admin: true }
        },
        {
          path: 'modify',
          component: Modify,
          meta: { admin: true }
        },
        {
          path: 'nodo',
          component: Nodo,
          meta: { admin: true }
        }
      ]
    }
  ]
})
