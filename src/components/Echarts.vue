<template>
  <div class="echarts">
    <h1>{{ title }}</h1>
    <div id="chart" ref="chart" :style="{ width: '100%', height: '40vh' }"></div>
  </div>
</template>

<script>
export default {
  name: 'Echarts',
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
      dataArea: [],
      dataGw: [],
      dataRs: []
    };
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    showChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('chart'));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          show: true
        },
        xAxis: {
          data: this.dataArea
        },
        legend: {
          data: ['招聘人数', '岗位总数']
        },
        yAxis: {},
        dataZoom: [
          {
            type: 'slider', // 滑动轴
            xAxisIndex: [0],
            start: 1, // 距离左侧0刻度的距离，1%
            end: 10 // 距离左侧0刻度的距离，35%，相当于规定了滑动的范围
          }
        ],
        series: [
          {
            name: '招聘人数',
            type: 'bar',
            data: this.dataRs
          },
          {
            name: '岗位总数',
            type: 'bar',
            data: this.dataGw
          }
        ]
      });
    },
    // eslint-disable-next-line space-before-function-paren
    async loadData() {
      await this.$http.get('/api/ksh?' + Math.random()).then(resp => {
        const { data: res } = resp;
        console.log(res.data);
        res.data.forEach(element => {
          if (element.name === '地区列表') {
            this.dataArea = element.data;
          } else if (element.name === '总招聘人数') {
            this.dataRs = element.data;
          } else if (element.name === '总岗位数量') {
            this.dataGw = element.data;
          }

          this.showChart();
        });
      });
    }
  },
  // eslint-disable-next-line space-before-function-paren
  created() {
    this.loadData();
  },
  // eslint-disable-next-line space-before-function-paren
  mounted() {
    this.showChart();
  }
};
</script>
<style lang="less" scoped>
.echarts {
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 0 0 10px #e3e4e4;
  margin-top: 2vh;
  height: 45vh;
  width: 1170px;
  margin: 0 auto;
  box-sizing: border-box;
  // background-color: lightcoral;
}
</style>
