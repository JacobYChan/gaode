<template>
    <div class="amap-page-container">
        <el-amap vid="amapDemo" :center="center" :zoom="zoom">
            <el-amap-marker v-for="(marker,index) in markers" :key="index" :angle="angle" :icon="icon" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
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
        };
    },
    created() {
        this.$http.get('http://localhost:8080/static/data.json').then(res => {
            let result = res.data;
            this.newPosition = [result[this.index].longitude, result[this.index].latitude];
            this.markers[0].position = this.newPosition;
            this.center = this.newPosition;
        })
        const speed = 0.000001;
        setInterval(() => {
            this.index++;
            this.getData(this.index);
            let t = setInterval(() => {
                this.markers[0].position[0] = this.markers[0].position[0] + speed;
                if (this.markers[0].position[0] >= this.newPosition[0]) {
                    clearInterval(t);
                }
            }, 20)
            let t2 = setInterval(() => {
                this.markers[0].position[1] = this.markers[0].position[1] + speed;
                if (this.markers[0].position[1] >= this.newPosition[1]) {
                    clearInterval(t2);
                }
            }, 20)


        }, 2000);
    },
    mounted() {
        // 姑且N为1
        this.markers = [
            {
                position: []
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
            })
        }
    }
};
</script>