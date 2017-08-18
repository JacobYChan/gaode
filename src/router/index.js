import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MapTest from '@/components/map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
      },
      {
        path: '/map',
        name: 'MapTest',
        component: MapTest
      }  
  ]
})
