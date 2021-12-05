<template>
  <!-- :style="{ width: width + 'px', height: height + 'px' }" -->
  <div class="box" >
    <div class="actions">
      <button @click="type = 'both'">
        <img src="/img/orderbook/type_both.png" />
      </button>
      <button @click="type = 'bids'">
        <img src="/img/orderbook/type_bids.png" />
      </button>
      <button @click="type = 'asks'">
        <img src="/img/orderbook/type_asks.png" />
      </button>
    </div>
    <template v-if="type === 'both'">
      <OrderbookSide type="asks" :data="demoData" sort="desc" :thead="true" :maxRows="10"/>
      <div ref="ordersCenter"></div>
      <OrderbookSide type="bids" :data="demoData" sort="desc" :thead="false" :maxRows="10"/>
    </template>
    <OrderbookSide v-if="type === 'asks'" :data="demoData" type="asks" sort="asc" :thead="true" :maxRows="10" />
    <OrderbookSide v-if="type === 'bids'" :data="demoData" type="bids" sort="desc" :thead="true" :maxRows="10"/>
  </div>
</template>

<script>
import OrderbookSide from './OrderbookSide'
// import {fetchData} from '@/mixins/fetchData'
// import Store from '../../stores/Store'
// import axios from 'axios'
// import uuidv1 from 'uuid/v1'
export default {
  name: 'Orderbook',
  props: {
    width: Number,
    height: Number
  },
  data() {
    return {
      center: false,
      demoData: require('./data.js').default,
      type: 'both'
      // template_kupi: '${serverBackend}/api/${stockLowerCase}/orders/${pair}',
      // template_ccxt: '/user-api/ccxt/${stockLowerCase}/orders/${pair}',
      // timer_kupi: 3000,
      // timer_ccxt: 10000,
    }
  },
  components: {OrderbookSide},
  // mixins: [fetchData],
  // fromMobx: {
  //   stock: { get() { return Store.stock } },
  //   pair: { get() { return Store.pair } },
  // },
  computed: {
    dataLength: function() {
      return this.demoData.length
    }
  },
  watch: {
    dataLength: function(val) {
      console.log(val)
      setTimeout(()=>{
        if (this.widget.type === 'both' && !this.center) {
          this.toCenter()
        }
      }, 200)
    }
  },
  methods: {
    toCenter() {
      var widgetHeight = this.$el.parentNode.offsetHeight
      var top = this.$refs.ordersCenter.offsetTop
      this.$el.parentNode.scrollTop = top - widgetHeight / 2
      this.center = true
    }
  }
}

</script>

<style lang="sass" scoped>
.actions
  display: flex
  button
    cursor: pointer
    flex: 1 0 auto
    outline: none
    padding: 5px 10px
    border: 1px solid rgba(0, 0, 0, 0.12)
    &:hover, &.active
      border: 1px solid rgb(245, 188, 0)
</style>
