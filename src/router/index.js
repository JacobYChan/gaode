import Vue from 'vue'
import Router from 'vue-router'
import Gaode from '@/components/gaode'

Vue.use(Router)

export default new Router({
    routes: [
       
        {
            path: '/',
            name: 'Gaode',
            component:Gaode
        }
    ]
})
