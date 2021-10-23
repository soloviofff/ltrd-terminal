<template>
  <v-card>
    <v-toolbar color="green" dark >
      <v-toolbar-title>Accounting</v-toolbar-title>
      <v-spacer/>
      <span>
        Total income: {{calculateIncomesComputed}}
      </span>
    </v-toolbar>
    <v-card-text>
      <!-- {{accountingComputed}} -->
      <v-simple-table v-if="accountingComputed.length > 0">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">buy amount</th>
              <th class="text-left">sell amount</th>
              <th class="text-left">income</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in accountingComputed" :key="item._id">
              <td>{{ parseFloat((item.sell.weighetInfo.weightedPrice * item.sell.weighetInfo.sumOfShares).toFixed(2))}}</td>
              <td>{{ parseFloat((item.sell.order.price * item.sell.order.filled).toFixed(2))}}</td>
              <td>{{ parseFloat((item.sell.order.price * item.sell.order.filled - item.sell.weighetInfo.weightedPrice * item.sell.weighetInfo.sumOfShares).toFixed(2))}}</td>
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
    }),
    fromMobx: {
      accounting: {get() { return toJS(Store.accounting)}},
    },
    computed: {
      accountingComputed: function () {
        return this.accounting
      },
      calculateIncomesComputed() {
        let data = this.accounting
        let income = 0
        for (let item of data) {
          let buy = item.sell.weighetInfo.weightedPrice * item.sell.weighetInfo.sumOfShares
          let sell = item.sell.order.price * item.sell.order.filled
          income = income + (sell - buy)
          // console.log(item)
        }
        return parseFloat(income.toFixed(2))
      }
    }
  }
</script>
