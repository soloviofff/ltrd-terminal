<template>
    <div>
      <apexchart
        type="pie"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
</template>

<style>
</style>

<script>
// https://apexcharts.com/vue-chart-demos/candlestick-charts/

export default {
  name: 'BalancePie',
  components: {
    
  },
  data() {
    return {
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['BTC', 'USDT', 'ETH', 'YOTA', 'ATOM'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    }
  }
}
</script>
