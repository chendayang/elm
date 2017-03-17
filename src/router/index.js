import Vue from 'vue'
import Router from 'vue-router'
import vheader from '@/components/header/header'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'vheader',
      component: vheader
    }
  ]
})
