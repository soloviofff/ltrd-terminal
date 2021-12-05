<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn color="warning mx-2" dark @click="toggleJournal()">Journal</v-btn>
      <span v-if="journal.symbol">{{journal.symbol}} | </span>
      <span v-if="bestBid"> Market Price: {{bestBid}} | </span>
      <span v-if="journal.positionLimits"> Limits: {{journal.positionLimits.length}} | </span>
      <span v-if="journal.filledLimits"> Filled limits: {{journal.filledLimits.length}} | </span>
      <span v-if="journal.multipositionSourseOrders"> Sourse orders: {{journal.multipositionSourseOrders.length}}</span>
      <v-spacer/>
      <v-btn color="warning mx-2" dark @click="toggleChart()">Chart</v-btn>

    </v-app-bar>

    <v-main>
      <!-- {{journal}} -->
      <Chart :class="['chart', { 'chart-active' : isChartActive }]"/>
      <Journal :class="['journal', { 'journal-active' : isJournalActive }]"/>
      <v-row>
        <v-col cols="3">
          <Limits/>
        </v-col>
        <v-col cols="9">
          <v-row no-gutters>
            <v-col cols="4" class="px-2">
              <FilledLimits/>
            </v-col>
            <v-col cols="4" class="px-2">
              <Multiposition/>
            </v-col>
            <v-col cols="4" class="px-2">
              <Accounting />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Multiposition from './components/Multiposition';
import Journal from './components/Journal';
import Orders from './components/Orders';
import Chart from './components/Chart'
import Limits from './components/Limits'
import FilledLimits from './components/FilledLimits'
import Accounting from './components/Accounting'
import fetchMixin from '@/assets/fetchMixin'

import { toJS } from 'mobx'
import Store from '@/stores/Store'

export default {
  name: 'App',

  components: {
    Multiposition,
    Journal,
    Orders,
    Chart,
    Limits,
    FilledLimits,
    Accounting
  },

  data: () => ({
    isChartActive: false,
    isJournalActive: false,
  }),
  fromMobx: {
    orderbook: {get() { return toJS(Store.orderbook)}},
    journal: {get() { return toJS(Store.journal)}},
    bestBid: {get() { return Store.bestBid}},
    bestAsk: {get() { return Store.bestAsk}},
  },
  mounted: {

  },
  mixins: [fetchMixin],
  methods: {
    toggleChart() {
      this.isChartActive = !this.isChartActive
    },
    toggleJournal() {
      this.isJournalActive = !this.isJournalActive
    }
  },
  // watch: {
  //   orderbook(val) {

  //     if (val.bids[0][0]) {
  //       this.bestBid = val.bids[0][0]
  //     }
  //     if (val.asks[0][0]) {
  //       this.bestAsk = val.bestAsk[0][0]
  //     }
  //   }
  // }
};
</script>

<style lang="sass">
.chart
  position: fixed
  top: 75px
  right: -850px
  z-index: 100
  transition: all .5s
  &.chart-active
    right: 0

.journal
  position: fixed
  top: 75px
  left: -850px
  z-index: 101
  transition: all .5s
  &.journal-active
    left: 0
</style>
