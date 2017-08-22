<template>
    <div class="m-map">
        <div id="js-container" class="map"></div>
    </div>
</template>

<script>
import remoteLoad from '@/utils/remoteLoad.js'
import { MapKey, MapCityName } from '@/config/config'
export default {
    // props: ['lat', 'lng'],
    data() {
        return {
            dragStatus: false,
            AMapUI: null,
            AMap: null,

            marker: {},
            center: [],
            icon: './../static/car.png',
            angle: "0",
            zoom: 15,
            newPosition: [],
            index: 0,
            dataNum: 0,

            map:{}
        }
    },
    methods: {
        // 实例化地图
        initMap() {
            // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
            let AMapUI = this.AMapUI = window.AMapUI
            let AMap = this.AMap = window.AMap
            const speed = 80;


            this.$http.get('static/data.json').then(res => {
                let result = res.data;
                this.newPosition = [result[this.index].longitude, result[this.index].latitude];
                // console.log(this.newPosition)
                // this.marker.position = this.newPosition;
                this.center = this.newPosition;
                this.dataNum = result.length;

            });

            AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
                let mapConfig = {
                    zoom: 16,
                    cityName: MapCityName,
                    center: this.center
                }

                this.map = new AMap.Map('js-container', mapConfig)

                var icon = new AMap.Icon({
                    image: this.icon,//24px*24px
                    //icon可缺省，缺省时为默认的蓝色水滴图标，
                    size: new AMap.Size(24, 24)
                });
                this.marker = new AMap.Marker({
                    icon: icon,//24px*24px
                    position: this.newPosition,
                    offset: new AMap.Pixel(-12, -12),
                    map: this.map,
                    angle: this.angle,
                    // autoRotation: true
                });

            })

            let time = setInterval(() => {
                this.index++;
                this.getData(this.index);

                var oldPosition = [];
                oldPosition.push(this.marker.getPosition().lng);
                oldPosition.push(this.marker.getPosition().lat);

                this.angle = this.calAngle(oldPosition, this.newPosition);
                // console.log(this.angle + '-------------');
                this.marker.setAngle(this.angle);

                let data = [
                    this.newPosition[0],
                    this.newPosition[1]
                ]

                this.marker.moveTo(data, speed);

                this.marker.position = this.newPosition;

                if (this.index >= this.dataNum) {
                    clearInterval(time);
                }
            }, 10000);
        },
        //计算两点间的角度
        calAngle(start, end) {
            var p_start = this.map.lngLatToContainer(start),
                p_end = this.map.lngLatToContainer(end);
            var diff_x = p_end.x - p_start.x,
                diff_y = p_end.y - p_start.y;
            return 360 * Math.atan2(diff_y, diff_x) / (2 * Math.PI) + 90;
        },

        getData(index) {
            this.$http.get('static/data.json').then(res => {
                let result = res.data;

                this.newPosition = [result[index].longitude, result[index].latitude];
               
            })
        }
    },
    created() {
        // 已载入高德地图API，则直接初始化地图
        if (window.AMap && window.AMapUI) {
            this.initMap()
            // 未载入高德地图API，则先载入API再初始化
        } else {
            // 载入高德地图和UI组件
            Promise.all([
                remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`),
                remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
            ]).then(() => {
                this.initMap()
            })
        }


    }
}
</script>

<style lang="css">
.m-map {
    min-width: 500px;
    min-height: 800px;
    position: relative;
}

.m-map .map {
    width: 100%;
    min-height: 800px;
}

.m-map .search {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 285px;
    z-index: 1;
}

.m-map .search input {
    width: 180px;
    border: 1px solid #ccc;
    line-height: 20px;
    padding: 5px;
    outline: none;
}

.m-map .search button {
    line-height: 26px;
    background: #fff;
    border: 1px solid #ccc;
    width: 50px;
    text-align: center;
}

.m-map .result {
    max-height: 300px;
    overflow: auto;
    margin-top: 10px;
}
</style>