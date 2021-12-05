<template>
  <v-card>
    <v-toolbar color="green" dark >
      <v-toolbar-title>Filled</v-toolbar-title>
      <v-spacer/>
      <span v-if="filledLimitsComputed.length > 0">
        <span >{{weightedPrice}}</span>
        ||
        <span>{{sumOfShares}}</span>
      </span>
    </v-toolbar>
    <v-card-text>
      <v-simple-table v-if="filledLimitsComputed.length > 0">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Price</th>
              <th class="text-left">Amount</th>
              <th class="text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filledLimitsComputed" :key="item.id">
              <td>{{ item.price }}</td>
              <td>{{ item.amount }}</td>
              <td>{{item.price * item.amount}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div v-else>Empty List</div>
    </v-card-text>

  </v-card>
</template>

<script>
  import { toJS } from 'mobx'
  import Store from '@/stores/Store'

  export default {
    data: () => ({
      sumOfShares: 0,
      weightedPrice: 0
    }),
    fromMobx: {
      filledLimits: {get() { return Store.filledLimits}},
    },
    computed: {
      filledLimitsComputed: function () {
        this.calculeteWeightedPrice(this.filledLimits)
        return this.filledLimits
      },
    },
    methods: {
      calculeteWeightedPrice: function(buyOrders) {
        // console.warn('calculate')
        var sumOfTotals = 0
        this.weightedPrice = 0
        this.sumOfShares = 0
        for (let order of buyOrders ) {
          sumOfTotals = sumOfTotals + (order.price * order.amount)
          this.sumOfShares = this.sumOfShares + order.amount
        }
        this.weightedPrice = parseFloat((sumOfTotals / this.sumOfShares).toFixed(2))
      }
    }
  }
</script>
