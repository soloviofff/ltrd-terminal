<template>
  <q-page class="flex flex-center">
    <Instruments />
    <Candles />
    <Balance />
    <Orderbook />
    <CreateOrder />
  </q-page>
</template>

<script>
import Candles from '@/components/Charts/Candles'
import Balance from '@/components/Balance/Balance'
import Orderbook from '@/components/Orderbook/Orderbook'
import CreateOrder from '@/components/CreateOrder/CreateOrder'
import Instruments from '@/components/Panels/Instruments'

export default {
  name: 'Instance',
  components: {
    Candles,
    Balance,
    Orderbook,
    CreateOrder,
    Instruments
  },
  data(){
    return {
    }
  }
}
</script>
