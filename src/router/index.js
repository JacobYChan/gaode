import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MapTest from '@/components/map'
import Test from '@/components/test'
import Gaode from '@/components/gaode'

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
        },
        {
            path: '/test',
            name: 'Test',
            component:Test
        },
        {
            path: '/gaode',
            name: 'Gaode',
            component:Gaode
        }
    ]
})
