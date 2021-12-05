import { observable, action, reaction, computed } from 'mobx'
import { version, AsyncTrunk, ignore } from 'mobx-sync'
import _ from 'lodash'
import axios from 'axios'

@version(3)
class Store {


  @observable server = 'http://127.0.0.1:8000'



  @computed get selectedPalettes() {
    return this.palettes.filter( (item) => {
      if (item.state) return true
    }).map( item => ( item.name ))
  }

  @observable ohlcv = []
  @action setCandles(data) {
    this.ohlcv = data
  }
  @action async fetchCandles() {
    axios.get(`${this.server}/ltrd-api/ohlcv`)
    .then(response => {
      // console.log('fetchCandles success', response.data)
      this.setCandles(response.data)
    })
    .catch(error => {
      console.log('fetchCandles error', error)
    })
  }
  @observable bestBid = 0
  @observable bestAsk = 0

  @action bestPrices(data) {
    this.bestBid = data.bids[0][0]
    this.bestAsk = data.asks[0][0]
  }

  @action setOrderbook(data) {
    this.orderbook = data
  }
  @action async fetchOrderbook() {
    axios.get(`${this.server}/ltrd-api/orderbook`)
    .then(response => {
      // console.log('fetchOrderbook success', response.data)
      this.setOrderbook(response.data)
      this.bestPrices(response.data)
    })
    .catch(error => {
      console.log('fetchOrderbook error', error)
    })
  }
  @observable accounting = []
  @action setAccounting(data) {
    this.accounting = data
  }
  @action fetchAccounting () {
    axios.get(`${this.server}/ltrd-api/accounting`)
    .then(response => {
      // console.log('fetchAccounting success', response.data)
      this.setAccounting(response.data)
    })
    .catch(error => {
      console.log('fetchAccounting error', error)
    })
  }

  @observable journal = {}
  @observable lotParam = 0
  @observable maxLevelParam = 0
  @observable levelStepParam = 0
  @observable targetProfitPercentParam = 0
  @observable pocketParam = 0
  @observable balanceParam = {}

  @action setParams(data) {
    if (data.lot !== this.lotParam) {
      this.lotParam = data.lot
    }
    if (data.maxLevel !== this.maxLevelParam) {
      this.maxLevelParam = data.maxLevel
    }
    if (data.levelStep !== this.levelStepParam) {
      this.levelStepParam = data.levelStep
    }
    if (data.targetProfitPercent !== this.targetProfitPercentParam) {
      this.targetProfitPercentParam = data.targetProfitPercent
    }
    if (data.pocket !== this.pocketParam) {
      this.pocketParam = data.pocket
    }
    for (let [key, value] of Object.entries(data.balance) ) {
      this.balanceParam[key] = value
    }
  }

  @action setJournal(data) {
    this.journal = data
    this.setParams(data)
    this.updateLimits(data)
    this.updateFilledLimits(data)
    this.updateSourseOrders(data)
    this.updateMultiposition(data)
  }

  @observable multiposition = {}
  @action updateMultiposition(data) {
    this.multiposition = data.multipositionInfo
  }
  @observable limits = []
  @action updateLimits(data) {
    this.limits = data.positionLimits
  }
  @observable filledLimits = []
  @action updateFilledLimits(data) {
    this.filledLimits = data.filledLimits
  }
  @observable sourceOrders = []
  @action updateSourseOrders(data) {
    // console.log('Store updateSourseOrders')
    // console.log(data.multipositionSourseOrders)
    this.sourceOrders = data.multipositionSourseOrders
  }

  @action fetchJournal() {
    axios.get(`${this.server}/ltrd-api/journal`)
    .then(response => {
      // console.log('fetchJournal success', response.data)
      this.setJournal(response.data)
    })
    .catch(error => {
      console.log('fetchJournal error', error)
    })
  }
  @action updateJournal(data) {
    // console.log(data)
    axios.post(`${this.server}/ltrd-api/update-journal`, data)
    .then(response => {
      console.log('updateJournal success', response)
    })
    .catch(error => {
      console.log('updateJournal error', error)
    })
  }

  @action placeGrid() {
    console.log('placeGrid store function')
    axios.get(`${this.server}/ltrd-api/place-grid`)
    .then(response => {
      console.log('placeGrid success', response)
      this.setJournal(response.data)
    })
    .catch(error => {
      console.log('placeGrid error', error)
    })
  }

  @action removeGrid() {
    console.log('removeGrid store function')
    axios.get(`${this.server}/ltrd-api/remove-grid`)
    .then(response => {
      console.log('removeGrid success', response)
      this.setJournal(response.data)
    })
    .catch(error => {
      console.log('removeGrid error', error)
    })
  }

  @action placeMultiposition() {
    console.log('place multiposition Store')
    axios.get(`${this.server}/ltrd-api/place-multiposition`)
    .then(response => {
      console.log('placeMultiposition success Store')
      this.setJournal(response.data)
    })
    .catch(error => {
      console.log('placeMultiposition error Store', error)
    })
  }

  @action removeMultiposition() {
    console.log('remove multiposition Store')
    axios.get(`${this.server}/ltrd-api/remove-multiposition`)
    .then(response => {
      console.log('removeMultiposition success Store')
      this.setJournal(response.data)
    })
    .catch(error => {
      console.log('removeMultiposition error Store', error)
    })
  }
}

const store = window.Store = new Store()
export default store
