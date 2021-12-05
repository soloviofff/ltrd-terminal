<template>
  <BaseComponentCard>
    <template v-slot:header>
      <q-select
        label="Instruments"
        transition-show="jump-up"
        transition-hide="jump-up"
        filled
        v-model="model"
        :options="options"
        style="width: 140px"
        :dense="true"
        :options-dense="true"
      />
    </template>
  </BaseComponentCard>
</template>

<style>
</style>

<script>
// TODO: помимо просто селекта нужен истремент редактирования белого списка инструментов
// https://apexcharts.com/vue-chart-demos/candlestick-charts/

import BaseComponentCard from '@/components/Elements/BaseComponentCard'
export default {
  name: 'Instruments',
  components: {
    BaseComponentCard
  },
  data(){
    return {
      model: null,
      options: [
        'BTC__USDT', 'ETH__BTC', 'YOTA__BTC'
      ],
    }
  },
  computed: {
    
  }
}
</script>
