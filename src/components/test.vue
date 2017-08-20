<template>
<div class="amap-page-container">
  <el-amap vid="amapDemo">
    <el-amap-marker v-for="marker in markers" :position="marker.position">
    </el-amap-marker>
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
      markers: []
    };
  },
  mounted() {
    // 姑且N为2
    // 为地图添加两个人
    this.markers = [
     {
      position: [121.5273285, 31.21515044]
     }, {
      position: [121.5273286, 31.21515045]
     }
    ];

    // 模拟实时更新位置
    // 开启一个1s的轮训，每个人的经纬度都自增0.00001
    const step = 0.00001;
    setInterval(() => {
      this.markers.forEach((marker) => {
        marker.position = [marker.position[0] + step, marker.position[1] + step];
      });
    }, 1000);
  }
};
</script>