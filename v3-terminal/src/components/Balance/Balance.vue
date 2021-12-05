<template>
  <BaseComponentCard>
    <template v-slot:header>
      <q-select
        label="Type"
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
    <template v-slot:default>
      <BalanceHistory v-if="model === 'History'" />
      <BalancePie v-if="model === 'Pie'" />
      <BalanceTable v-if="model === 'Table'" />
    </template>
  </BaseComponentCard>
</template>

<style>
</style>

<script>
// https://apexcharts.com/vue-chart-demos/candlestick-charts/

import BaseComponentCard from '@/components/Elements/BaseComponentCard'

import BalanceHistory from '@/components/Balance/BalanceHistory'
import BalancePie from '@/components/Balance/BalancePie'
import BalanceTable from '@/components/Balance/BalanceTable'

export default {
  name: 'Balance',
  components: {
    BaseComponentCard,
    BalanceHistory,
    BalancePie,
    BalanceTable
  },
  data(){
    return {
      model: 'History',
      options: [
        'Table', 'History', 'Pie'
      ],
    };
  }
}
</script>
