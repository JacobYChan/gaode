<template>
    <div class="amap-page-container">
        <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
        </el-amap>
    
       
    </div>
</template>

  <style>
.amap-demo,.amap-page-container {
    height: 800px;
}
</style>

  <script>
// NPM 方式
import { AMapManager } from 'vue-amap';

// CDN 方式
// let amapManager = new VueAMap.AMapManager();
export default {
    components: {
        AMapManager
    },
      data () {
        return {
            amapManager: '',
            zoom: 12,
            center: [121.59996, 31.197646],
            events: {
                init: (o) => {
                    console.log(o.getCenter())
                    console.log(this.$refs.map.$$getInstance())
                    o.getCity(result => {
                        console.log(result)
                    })
                },
                'moveend': () => {
                    // console.log(11111)
                },
                'zoomchange': () => {
                },
                'click': (e) => {
                    alert('map clicked');
                }
            },
            plugin: ['ToolBar', {
                pName: 'MapType',
                defaultType: 0,
                events: {
                    init(o) {
                        console.log(o);
                    }
                }
            }]
        };
    },

    methods: {
       
    }
};
</script>