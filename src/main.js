// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AMap from 'vue-amap';
import axios from 'axios'

Vue.directive('hljs', el => {
    let blocks = el.querySelectorAll('pre')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
  

// import { lazyAMapApiLoaderInstance } from 'vue-amap';
Vue.prototype.$http = axios

Vue.config.productionTip = false

// Vue.use(AMap);

// AMap.initAMapApiLoader({
//     key: 'b5b1e14a2999124175dd11b972d78d84',
//     plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
// });

// lazyAMapApiLoaderInstance.load().then(() => {
//     // your code ...
//     this.map = new AMap.Map('amapContainer', {
//       center: new AMap.LngLat(121.59996, 31.197646)
//     });
//   });

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
