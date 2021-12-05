<template>
  <BaseComponentCard>
    <template v-slot:header>
      <q-tabs
        v-model="tab"
        dense
        align="justify"
        class="shadow-2"
        :breakpoint="0"
        :class="tabsColorComputed"
      >
        <q-tab name="buy" label="Buy"/>
        <q-tab name="sell" label="Sell"/>
      </q-tabs>
    </template>
    <template v-slot:default>

      <q-input outlined bottom-slots v-model="text" label="Price" :dense="true">
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
        </template>
        <template v-slot:after>
          <span color="red">USDT</span>
        </template>
      </q-input>

      <q-input outlined bottom-slots v-model="text" label="Amount" :dense="true">
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
        </template>
        <template v-slot:after>
          <span color="red">BTC</span>
        </template>
      </q-input>

      <q-input outlined bottom-slots v-model="text" label="Total" :dense="true">
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
        </template>
        <template v-slot:after>
          <span color="red">USDT</span>
        </template>
      </q-input>

    </template>

    <template v-slot:actions>
      <q-btn flat style="color: #FF0080" label="Create Order" />
    </template>
  </BaseComponentCard>
</template>

<style>
</style>

<script>
// https://apexcharts.com/vue-chart-demos/candlestick-charts/

import BaseComponentCard from '@/components/Elements/BaseComponentCard'
export default {
  name: 'CreateOrder',
  components: {
    BaseComponentCard
  },
  data(){
    return {
      tab: 'buy',
      text: ''
    }
  },
  computed: {
    tabsColorComputed() {
      return this.tab === 'buy' ? 'bg-primary text-white' : 'bg-teal text-yellow'
    }
  }
}
</script>
