<template>
  <div class="kupi-pseudoTable">
    <!-- {{percentInverseToFixed}} -->
    <!-- {{computedData}} -->
    <div class="pseudotable">
      <div v-if="thead" class="pseudotable-header">
        <div class="pseudotable-row">
          <div :style="`flex: 0 0 25%`" >price <span className="muted">{{coinTo}}</span></div>
          <div :style="`flex: 0 0 25%`">amount <span className="muted">{{coinFrom}}</span></div>
          <div :style="`flex: 0 0 25%`">total <span className="muted">{{coinTo}}</span></div>
          <div :style="`flex: 0 0 25%`">sum <span className="muted">{{coinTo}}</span></div>
        </div>
      </div>
      <div class="pseudotable-body">
        <div class="pseudotable-row" v-for="order in computedData" :key="order.id"
          :style="`background: linear-gradient(to right, #ffffff 0%, #ffffff ${order.percentInverseToFixed}%, ${computedBackground} ${order.percentInverseToFixed}%, ${computedBackground} 100%)`"
        >
          <div :style="`color: ${computedColor}; flex: 0 0 25%;`">{{order.price.toFixed(8)}}</div>
          <div :style="`flex: 0 0 25%`" >{{order.amount.toFixed(8)}}</div>
          <div :style="`flex: 0 0 25%`" >{{order.total.toFixed(8)}}</div>
          <div :style="`flex: 0 0 25%`" >{{order.sum.toFixed(8)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CoinsStore from '../../stores/CoinsStore'
// import axios from 'axios'
// import moment from 'moment'
import _ from 'lodash'
import uuidv1 from 'uuid/v1'

export default {
  name: 'OrderbookSide',
  data() {
    return {
      visualMode: "walls",
      visualModeMax: "fixed",
      visualModeCrocodileMax: 10000,
      visualModeWallsMax: 1000,
      pair: 'ETH_BTC',
      color: '',
      background: '',
      // percentInverseToFixed: '',
      // dataComputed: [],
    }
  },
  props: ['maxRows', 'data', 'type', 'sort', 'thead'],
  // watch: {
  //   data() {
  //     this.computeData()
  //   }
  // },
  computed: {
    coinFrom() {
      return this.pair.split('_')[0]
    },
    coinTo() {
      return this.pair.split('_')[1]
    },
    computedColor() {
      return this.type === 'asks' ? 'rgb(234, 0, 112)' : 'rgb(112, 168, 0)'
    },
    computedBackground() {
      return this.type === 'asks' ? '#faeaf1' : '#f1fae8'
    },
    computedData() {
      let data = _.cloneDeep(this.data)
      data = data[this.type].slice(0, this.maxRows)
      let sum = {asks: 0, bids: 0}
      for( let [key, order] of Object.entries(data) ) {
        let price = order[0]
        let amount = order[1]
        let total = price * amount
        sum[this.type] = total + sum[this.type]
        data[key] = {
          id: uuidv1(),
          price: price,
          amount: amount,
          total: total,
          sum: sum[this.type]
        }
      }
      let result_data = _.forEach(data, (order)=>{
        order.totalPercent = order.total / sum[this.type] * 100
        order.sumPercent = order.sum / sum[this.type] * 100
        order.totalPercentInverse = 100 - order.totalPercent
        order.sumPercentInverse = 100 - order.sumPercent
      })
      // let [coinFrom, coinTo] = this.pair.split('_')
      // this.color = this.type === 'asks' ? 'rgb(234, 0, 112)' : 'rgb(112, 168, 0)'
      // this.background = this.type === 'asks' ? '#faeaf1' : '#f1fae8'
      let percent = 0
      data = _.map(data, (order)=>{
        if (this.visualMode !== 'none') {
          if (this.visualModeMax === 'total sum') {
            percent = this.visualMode === 'crocodile' ? order.sumPercent : order.totalPercent
          } else { // fixed
            if (this.visualMode === 'crocodile') {
              let visualModeCrocodileMaxInQuote = this.visualModeCrocodileMax / 30
              // var visualModeCrocodileMaxInQuote = (CoinsStore.coins[coinTo] && CoinsStore.coins[coinTo].price_usd) ? (this.visualModeCrocodileMax / CoinsStore.coins[coinTo].price_usd) : 30
              if (visualModeCrocodileMaxInQuote >= order.total) percent = 100
              percent = order.sum / visualModeCrocodileMaxInQuote * 100
            } else { // wall
              let visualModeWallsMaxInQuote = this.visualModeWallsMax / 30
              // var visualModeWallsMaxInQuote = (CoinsStore.coins[coinTo] && CoinsStore.coins[coinTo].price_usd) ? (this.visualModeWallsMax / CoinsStore.coins[coinTo].price_usd) : 1
              if (visualModeWallsMaxInQuote >= order.total) percent = 100
              percent = order.total / visualModeWallsMaxInQuote * 100
            }
          }
        }
        let percentInverse = 100 - percent
        order.percentInverseToFixed = percentInverse.toFixed(2)
        return order
      })
      data = _.orderBy(data, ['price'], [this.sort])
      // this.dataComputed = data
      return result_data
    }
  },
  mounted() {
    // console.log(this.type)
    // console.log(this.data)
  },
  methods: {
    // computedData() {
    //   let data = _.cloneDeep(this.data)
    //   data = data[this.type].slice(0, 40)
    //   let sum = {asks: 0, bids: 0}
    //   for( let [key, order] of Object.entries(data) ) {
    //     let price = order[0]
    //     let amount = order[1]
    //     let total = price * amount
    //     sum[this.type] = total + sum[this.type]
    //     data[key] = {
    //       id: uuidv1(),
    //       price: price,
    //       amount: amount,
    //       total: total,
    //       sum: sum[this.type]
    //     }
    //   }
    //   let result_data = _.forEach(data, (order)=>{
    //     order.totalPercent = order.total / sum[this.type] * 100
    //     order.sumPercent = order.sum / sum[this.type] * 100
    //     order.totalPercentInverse = 100 - order.totalPercent
    //     order.sumPercentInverse = 100 - order.sumPercent
    //   })
    //   // let [coinFrom, coinTo] = this.pair.split('_')
    //   this.color = this.type === 'asks' ? 'rgb(234, 0, 112)' : 'rgb(112, 168, 0)'
    //   this.background = this.type === 'asks' ? '#faeaf1' : '#f1fae8'
    //   // let percent = 0
    //   // data = _.map(data, (order)=>{
    //   //   if (this.visualMode !== 'none') {
    //   //     if (this.visualModeMax === 'total sum') {
    //   //       percent = this.visualMode === 'crocodile' ? order.sumPercent : order.totalPercent
    //   //     } else { // fixed
    //   //       if (this.visualMode === 'crocodile') {
    //   //         let visualModeCrocodileMaxInQuote = this.visualModeCrocodileMax / 30
    //   //         // var visualModeCrocodileMaxInQuote = (CoinsStore.coins[coinTo] && CoinsStore.coins[coinTo].price_usd) ? (this.visualModeCrocodileMax / CoinsStore.coins[coinTo].price_usd) : 30
    //   //         if (visualModeCrocodileMaxInQuote >= order.total) percent = 100
    //   //         percent = order.sum / visualModeCrocodileMaxInQuote * 100
    //   //       } else { // wall
    //   //         let visualModeWallsMaxInQuote = this.visualModeWallsMax / 30
    //   //         // var visualModeWallsMaxInQuote = (CoinsStore.coins[coinTo] && CoinsStore.coins[coinTo].price_usd) ? (this.visualModeWallsMax / CoinsStore.coins[coinTo].price_usd) : 1
    //   //         if (visualModeWallsMaxInQuote >= order.total) percent = 100
    //   //         percent = order.total / visualModeWallsMaxInQuote * 100
    //   //       }
    //   //     }
    //   //   }
    //     // let percentInverse = 100 - percent
    //     // order.percentInverseToFixed = percentInverse.toFixed(2)
    //   //   return order
    //   // })
    //   data = _.orderBy(data, ['price'], [this.sort])
    //   // this.dataComputed = data
    //   return result_data
    // }
  }
}
</script>

<style lang="sass">
.kupi-pseudoTable
  .pseudotable
    border-bottom: 1px solid rgba(0, 0, 0, 0.12)
    max-width: 100%
    .pseudotable-header
      .pseudotable-row
        display: flex
        flex-wrap: nowrap
        border-top: 1px solid rgba(0, 0, 0, 0.12)
        border-bottom: 1px solid rgba(0, 0, 0, 0.12)
        div
          border-left: 1px solid rgba(0, 0, 0, 0.12)
          padding: 2px
          font-size: 10px
          text-align: center
          font-weight: 700
    .pseudotable-body
      .pseudotable-row
        display: flex
        flex-wrap: nowrap
        // border-top: 1px solid rgba(0, 0, 0, 0.12)
        border-bottom: 1px solid rgba(0, 0, 0, 0.12)
        // &+.pseudotable-row
          // border-top: none
        div
          display: flex
          flex-wrap: nowrap
          border-left: 1px solid rgba(0, 0, 0, 0.12)
          padding: 2px
          font-size: 10px
          overflow: hidden
          white-space: nowrap
          text-overflow: clip

.kupi-table
  width: 100%
  min-height: 44px
  table
    border-collapse: collapse
    width: 100%
    tbody
      tr:hover
        cursor: pointer
        background: rgba(0,0,0,0.08)
      tr.died
        opacity: 0.5
    td, th
      border: 1px solid rgba(0,0,0,0.12)
      padding: 5px

</style>
