<template>
    <div>
      <apexchart
        type="line"
        :options="chartOptions"
        :series="series"
        height="200"
      ></apexchart>
      <apexchart
        type="line"
        :options="chartOptionsLine2"
        :series="seriesLine2"
        height="200"
      ></apexchart>
      <apexchart
        type="area"
        :options="chartOptionsArea"
        :series="seriesArea"
        height="200"
      ></apexchart>
    </div>
</template>

<style>
</style>

<script>
// https://apexcharts.com/vue-chart-demos/candlestick-charts/

/*
  // this function will generate output in this format
  // data = [
      [timestamp, 23],
      [timestamp, 33],
      [timestamp, 12]
      ...
  ]
  */
  function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  
      series.push([baseval, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

export default {
  name: 'BalanceHistory',
  components: {
    
  },
  data() {
    return {
      series: [{
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 60
        })
      }],
      chartOptions: {
        chart: {
          id: 'fb',
          group: 'social',
          type: 'line',
          height: 160
        },
        colors: ['#008FFB'],
        yaxis: {
          labels: {
            minWidth: 40
          }
        }
      },
      
      seriesLine2: [{
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 30
        })
      }],
      chartOptionsLine2: {
        chart: {
          id: 'tw',
          group: 'social',
          type: 'line',
          height: 160
        },
        colors: ['#546E7A'],
        yaxis: {
          labels: {
            minWidth: 40
          }
        }
      },
      
      seriesArea: [{
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 60
        })
      }],
      chartOptionsArea: {
        chart: {
          id: 'yt',
          group: 'social',
          type: 'area',
          height: 160
        },
        colors: ['#00E396'],
        yaxis: {
          labels: {
            minWidth: 40
          }
        }
      },
    }
  }
}
</script>
