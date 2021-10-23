<template>
  <v-card>
    <v-toolbar color="green" dark >
      <v-toolbar-title>Buy orders list</v-toolbar-title>
      <v-spacer/>
      <span>
        <v-btn color="warning mx-2" dark v-if="limitsComputed.length > 0" @click="removeGrid()">Remove grid</v-btn>
        <v-btn color="warning mx-2" dark v-else @click="placeGrid()">Place grid</v-btn>
      </span>
    </v-toolbar>
    <v-card-text>
      <v-simple-table v-if="limitsComputed.length > 0">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Price</th>
              <th class="text-left">Amount</th>
              <th class="text-left">Total</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in limitsComputed" :key="item.id">
              <td>{{ item.price }}</td>
              <td>{{ item.amount }}</td>
              <td>{{(item.price * item.amount).toFixed(8)}}</td>
              <td><v-icon color="red darken-1" @click="removeLimit(item.id)">mdi-delete-outline</v-icon></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div v-else>Empty List</div>
      <!-- <v-list two-line v-if="buy_positions.length > 0">
        <template v-for="(item, index) in buy_positions" >
          <v-list-item :key="item.id">
            <v-list-item-content>
              <v-list-item-title class="title green--text darken-1--text">{{item.price}}*{{item.amount}}={{item.total}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon @click="removeAction(index)" class="action_action">

            </v-list-item-icon>
          </v-list-item>
          <v-divider
            v-if="index + 1 < buy_positions.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list> -->

    </v-card-text>

  </v-card>
</template>

<script>
  import { toJS } from 'mobx'
  import Store from '@/stores/Store'

  export default {
    data: () => ({
      processing: false
    }),
    fromMobx: {
      limits: {get() { return Store.limits}},
    },
    computed: {
      limitsComputed: function () {
        return this.limits
      },
    },
    methods: {
      placeGrid() {
        console.log('placeGrid route function')
        // if (this.processing === true) {
        //   return
        // }
        // this.processing = true
        Store.placeGrid()
        // this.processing = false
      },
      removeGrid() {
        console.log('removeGrid route function')
        // if (this.processing === true) {
        //   return
        // }
        // this.processing = true
        Store.removeGrid()
        // this.processing = false
      },
      removeLimit(id) {
        console.log(`Remove ${id}`)
      }
    }
  }
</script>
