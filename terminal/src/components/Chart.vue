<template>
  <v-card>
    <v-card-text>
      <trading-vue :data="this.$data"></trading-vue>
    </v-card-text>
  </v-card>
</template>


<script>
import Store from '@/stores/Store'
import { toJS } from 'mobx'
import TradingVue from 'trading-vue-js'

export default {
    name: 'app',
    components: { TradingVue },
    data: () => ({
      ohlcv: []
    }),
    fromMobx: {
      get_ohlcv: {get() { return toJS(Store.ohlcv)}}
    },
    watch: {
      get_ohlcv(val) {
        this.ohlcv = val
      }
    }
}

</script>

<style lang="sass">
// .trading-vue
//   width: 100% !important
//   height: 100% !important
</style>