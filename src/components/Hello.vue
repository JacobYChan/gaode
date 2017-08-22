<template>
    <div class="amap-page-container">
        <el-amap ref="map" vid="amapDemo" :center="center" :zoom="zoom">
            <el-amap-marker v-for="(marker,index) in markers" autoRotation="true" :key="index" :angle="angle" :icon="icon" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
        </el-amap>
    </div>
</template>
<style>
.amapDemo,
.amap-page-container {
    height: 1000px;
}
</style>

<script>
export default {
    data() {
        return {
            markers: [],
            center: [],
            icon: './../static/car.png',
            angle: "90",
            zoom: 15,
            newPosition: [],
            index: 0,
            dataNum: 0,

        };
    },
    created() {
        this.$http.get('http://localhost:8080/static/data.json').then(res => {
            let result = res.data;
            this.newPosition = [result[this.index].longitude, result[this.index].latitude];
            this.markers[0].position = this.newPosition;
            this.center = this.newPosition;
            this.dataNum = result.length;
        });
        const speed = 0.000001;
        let time = setInterval(() => {
            this.index++;

            this.getData(this.index);
            // console.log(this.index);
            // let t = setInterval(() => {
            // console.log(this.markers[0].position[0])
            // this.markers[0].position = [this.markers[0].position[0] + speed,this.markers[0].position[1] + speed];
            // if (this.markers[0].position[0] >= this.newPosition[0]) {
            //     clearInterval(t);
            // }
            // console.log(this.markers[0].position);
            // }, 20)

            this.angle = this.calAngle(this.markers[0].position, this.newPosition);

            // this.markers[0].position = this.newPosition;

            // this.markers[0].moveTo(this.newPosition,speed);

            

            let t = setInterval(()=>{

            })

            if (this.index >= this.dataNum) {
                clearInterval(time);
            }
        }, 2000);
    },
    mounted() {
        // 姑且N为1
        this.markers = [
            {
                position: [],
                events: {
                    'moveend': () => {
                        console.log(11111)
                    },
                    'zoomchange': () => {
                    },
                    'click': (e) => {
                        alert('map clicked');
                    },
                    'moveTo':(lnglat,speed)=>{
                        console.log("aaaa");
                    }
                },
            }
        ];

        // 模拟实时更新位置
        // 开启一个1s的轮训，每个人的经纬度都自增0.00001

    },
    methods: {
        calAngle(start, end) {
            var diff_x = end[0] - start[0],
                diff_y = end[1] - start[1];
            //返回角度,不是弧度
            return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
        },
        getData(index) {
            this.$http.get('http://localhost:8080/static/data.json').then(res => {
                let result = res.data;

                this.newPosition = [result[index].longitude, result[index].latitude];
                // console.log(result[index].longitude);
            })
        }
    }
};
</script>