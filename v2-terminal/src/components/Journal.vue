<template>
  <v-card max-width="800px" >
    <v-toolbar color="green" dark >
      <v-toolbar-title>Journal</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row class="balanceList">
        <v-col v-for="[key, value] of Object.entries(balanceComputed)" :key="'balance'+key">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{key}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="[ikey, ivalue] of Object.entries(value)" :key="'balance'+ikey">
            <v-list-item-content>
              <v-list-item-title>{{ikey}}: {{ivalue}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-col>
      </v-row>
      
      <v-list two-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title green--text darken-1--text">Pocket: </v-list-item-title>
          </v-list-item-content>
          <v-text-field
            sigle-line
            dence
            v-model="pocket"
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title green--text darken-1--text">Lot: </v-list-item-title>
          </v-list-item-content>
          <v-text-field
            sigle-line
            dence
            v-model="lot"
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title green--text darken-1--text">levelStep: </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-text-field
              sigle-line
              dence
              v-model="levelStep"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title green--text darken-1--text">maxLevel: </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-text-field
              sigle-line
              dence
              v-model="maxLevel"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title green--text darken-1--text">targetProfitPercent: </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-text-field
              sigle-line
              dence
              v-model="targetProfitPercent"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="success" block @click="updateJournal()">
        Update Journal params
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { toJS } from 'mobx'
  import Store from '@/stores/Store'

  export default {
    data: () => ({
      lot: 0,
      maxLevel: 0,
      levelStep: 0,
      targetProfitPercent: 0,
      pocket: 0
    }),
    
    fromMobx: {
      pocketParam: {get() { return Store.pocketParam}},
      lotParam: {get() { return Store.lotParam}},
      maxLevelParam: {get() { return Store.maxLevelParam}},
      levelStepParam: {get() { return Store.levelStepParam}},
      targetProfitPercentParam: {get() { return Store.targetProfitPercentParam}},
      balanceParam: {get() {return toJS(Store.balanceParam)}}
    },
    computed: {
      balanceComputed: function () {
        return this.balanceParam
      },
    },
    watch: {
      lotParam(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.lot = newVal
        }
      },
      maxLevelParam(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.maxLevel = newVal
        }
      },
      levelStepParam(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.levelStep = newVal
        }
      },
      targetProfitPercentParam(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.targetProfitPercent = newVal
        }
      },
      pocketParam(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.pocket = newVal
        }
      },
    },
    methods: {
      updateJournal() {
        var data = {
          lot: parseFloat(this.lot),
          levelStep: parseFloat(this.levelStep),
          maxLevel: parseFloat(this.maxLevel),
          targetProfitPercent: parseFloat(this.targetProfitPercent),
          pocket: parseFloat(this.pocket)
        }
        // console.log(data)

        Store.updateJournal(data)
      }
    }
  }
</script>

<style lang="sass" scoped>
.balanceList
  .v-list-item
    min-height: 24px !important
  .v-list-item__content
    padding: 0 !important
</style>