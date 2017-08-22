// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'

Vue.directive('hljs', el => {
    let blocks = el.querySelectorAll('pre')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
  
Vue.prototype.$http = axios

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
