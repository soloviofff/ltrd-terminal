<template>
  <v-card max-width="800px" >
    <v-toolbar color="green" dark >
      <v-toolbar-title>Sell</v-toolbar-title>
    </v-toolbar>

    <!-- {{multiposition.weighetInfo}}
    {{multiposition.multiSellPosition}} -->
    <v-card-text v-if="multiposition.order">
      <div>Buy params</div>
      <div>weighted price: {{multiposition.weighetInfo.weightedPrice}}</div>
      <div>total amount: {{multiposition.weighetInfo.sumOfShares}}</div>
      <div>buy cost: {{multiposition.weighetInfo.weightedPrice * multiposition.weighetInfo.sumOfShares}}</div>
      <div>Sell params</div>
      <div>order.price: {{multiposition.order.price}}</div>
      <div>order.amount: {{multiposition.order.amount}}</div>
      <div>order.total: {{multiposition.order.price * multiposition.order.amount}}</div>
      <div>order.filled: {{multiposition.order.filled}}</div>
      <div>planned profit: {{multiposition.order.price * multiposition.order.amount - multiposition.weighetInfo.weightedPrice * multiposition.weighetInfo.sumOfShares}}</div>
    </v-card-text>
    <v-card-actions>
        <v-btn v-if="multiposition.order" text color="error" block @click="removeMultiPosition()">
          Remove multiposition sell
        </v-btn>
        <v-btn v-else text color="success" block @click="placeMultiPosition()">
          Place multiposition sell
        </v-btn>
      </v-card-actions>
    <v-toolbar color="green" dark>
      <v-toolbar-title>Source for sell</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-simple-table v-if="sourceOrdersComputed && sourceOrdersComputed.length > 0">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Price</th>
              <th class="text-left">Amount</th>
              <th class="text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sourceOrdersComputed" :key="item.id">
              <td>{{ item.price }}</td>
              <td>{{ item.amount }}</td>
              <td>{{item.cost}}</td>
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
      percent_value: 0,
      maker_fee: 0.1,
      sumOfShares: 0,
      weightedPrice: 0,
      new_buy_order: {
        price: 0,
        amount: 0
      },
      buy_positions: [],

    }),
    fromMobx: {
      multiposition: {get() { return Store.multiposition}},
      sourceOrders: {get() { return Store.sourceOrders}},
    },
    computed: {
      multipositionComputed: function () {
        return this.multiposition
      },
      sourceOrdersComputed: function () {
        return this.sourceOrders
      },
    },
    methods: {

      placeMultiPosition() {
        console.log('place multiposition component')
        Store.placeMultiposition()
      },
      removeMultiPosition() {
        console.log('remove multiposition component')
        Store.removeMultiposition()
      }
      // caclulateMultiPosition() {
      //   console.warn('calculate')
      //   var sumOfTotals = 0
      //   this.weightedPrice = 0
      //   this.sumOfShares = 0
      //   for (let order of this.buy_positions ) {
      //     sumOfTotals = sumOfTotals + (order.price * order.amount)
      //     this.sumOfShares = this.sumOfShares + order.amount
      //   }
      //   this.weightedPrice = sumOfTotals / this.sumOfShares

      //   this.calculateFeesAndRemainings()
      // },
      // calculateFeesAndRemainings(){
      //   var C = this.maker_fee
      //   var buyCost = this.weightedPrice * this.sumOfShares // buyCost стоимость ордера на покупку,
      //   var calculatedFee = this.sumOfShares * C / 100 // комиссия биржи за сделку
      //   var recievedGoods = this.sumOfShares - calculatedFee // сколько можем продать с учетом вычета комиссии
      //   var sellCost = buyCost * (1 + this.percent_value / 100) * (1 + C / 100) // какой должна быть итоговоя сумма сделки, чтобы получить желаемую прибыль
      //   var calculatedSellPrice = sellCost / recievedGoods // итоговая цена продажи

      //   var result = {
      //     fee: calculatedFee,
      //     newAmount: recievedGoods,
      //     sellCost: sellCost,
      //     targetPrice: parseFloat(calculatedSellPrice.toFixed(2))
      //   }

      //   this.multipositionOrder = result
      // }
    },
  }
</script>
